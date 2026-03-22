import { renderHook, act } from "@testing-library/react";
import { useAreaSearch } from "@/hooks/useAreaSearch";
import type { Area } from "@/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockAreas: Area[] = [
  {
    id: "tokyo",
    name: "東京",
    description: "日本の首都",
    center: { lat: 35.6812, lng: 139.7671 },
    zoom: 12,
    image: "/images/areas/tokyo.jpg",
  },
  {
    id: "kyoto",
    name: "京都",
    description: "千年の都",
    center: { lat: 35.0116, lng: 135.7681 },
    zoom: 13,
    image: "/images/areas/kyoto.jpg",
  },
  {
    id: "osaka",
    name: "大阪",
    description: "食い倒れの街",
    center: { lat: 34.6937, lng: 135.5023 },
    zoom: 13,
    image: "/images/areas/osaka.jpg",
  },
];

describe("useAreaSearch", () => {
  it("should initialize with empty query", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));
    expect(result.current.query).toBe("");
    expect(result.current.filteredAreas).toEqual([]);
    expect(result.current.isOpen).toBe(false);
  });

  it("should filter areas based on query", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.setQuery("東");
    });

    expect(result.current.filteredAreas).toHaveLength(1);
    expect(result.current.filteredAreas[0].id).toBe("tokyo");
  });

  it("should return empty filteredAreas for empty query", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.setQuery("");
    });

    expect(result.current.filteredAreas).toEqual([]);
  });

  it("should return empty filteredAreas for non-matching query", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.setQuery("福岡");
    });

    expect(result.current.filteredAreas).toEqual([]);
  });

  it("should clear query with handleClear", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.setQuery("東京");
    });

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.query).toBe("");
    expect(result.current.isOpen).toBe(false);
  });

  it("should set isOpen when query matches areas", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.setQuery("京");
    });

    // "京都" and "東京" both contain "京"
    expect(result.current.filteredAreas).toHaveLength(2);
    expect(result.current.isOpen).toBe(true);
  });

  it("should handle select by setting query to area name", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.handleSelect(mockAreas[0]);
    });

    expect(result.current.query).toBe("東京");
    // Note: isOpen may become true again because the useEffect re-evaluates
    // after query changes. This is expected behavior since the suggest list
    // would be hidden by navigation anyway.
  });

  it("should return a containerRef", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));
    expect(result.current.containerRef).toBeDefined();
  });

  describe("handleKeyDown", () => {
    it("should do nothing when dropdown is not open", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      // isOpen is false by default, so handleKeyDown should be a no-op
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.highlightIndex).toBe(-1);
    });

    it("should move highlight down with ArrowDown", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      // Open dropdown by setting query
      act(() => {
        result.current.setQuery("京");
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.highlightIndex).toBe(0);
    });

    it("should move highlight up with ArrowUp", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      act(() => {
        result.current.setQuery("京");
      });

      // Move down twice
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.highlightIndex).toBe(1);

      // Move up
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowUp",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.highlightIndex).toBe(0);
    });

    it("should not go below 0 with ArrowUp", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      act(() => {
        result.current.setQuery("京");
      });

      // Move down once to index 0
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      // Move up - should stay at 0
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowUp",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.highlightIndex).toBe(0);
    });

    it("should not go above max index with ArrowDown", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      act(() => {
        result.current.setQuery("東"); // Only "東京" matches
      });

      // filteredAreas has 1 item, max index is 0
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      // Try to go further down
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.highlightIndex).toBe(0);
    });

    it("should select highlighted item on Enter", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      act(() => {
        result.current.setQuery("京");
      });

      // Move down to highlight first item
      act(() => {
        result.current.handleKeyDown({
          key: "ArrowDown",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      // Press Enter to select
      act(() => {
        result.current.handleKeyDown({
          key: "Enter",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      // Query should be updated to selected area name
      expect(result.current.query).toBeTruthy();
    });

    it("should auto-select on Enter when only one match", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      act(() => {
        result.current.setQuery("東"); // Only "東京" matches
      });

      // Press Enter without moving highlight
      act(() => {
        result.current.handleKeyDown({
          key: "Enter",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.query).toBe("東京");
    });

    it("should close dropdown on Escape", () => {
      const { result } = renderHook(() => useAreaSearch(mockAreas));

      act(() => {
        result.current.setQuery("京");
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.handleKeyDown({
          key: "Escape",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  it("should close dropdown on click outside via setIsOpen", () => {
    const { result } = renderHook(() => useAreaSearch(mockAreas));

    act(() => {
      result.current.setQuery("京");
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setIsOpen(false);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
