import { renderHook, act } from "@testing-library/react";
import { useRouteManager } from "@/hooks/useRouteManager";
import type { Spot } from "@/types";

const createSpot = (id: string, name: string): Spot => ({
  id,
  areaId: "tokyo",
  name,
  category: "shrine_temple",
  description: "テスト説明",
  duration: "約60分",
  position: { lat: 35.0, lng: 139.0 },
});

describe("useRouteManager", () => {
  it("should initialize with empty selectedSpots", () => {
    const { result } = renderHook(() => useRouteManager());
    expect(result.current.selectedSpots).toEqual([]);
  });

  it("should add a spot with toggleSpot", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot = createSpot("s1", "浅草寺");

    act(() => {
      result.current.toggleSpot(spot);
    });

    expect(result.current.selectedSpots).toHaveLength(1);
    expect(result.current.selectedSpots[0].id).toBe("s1");
  });

  it("should remove a spot when toggled again", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot = createSpot("s1", "浅草寺");

    act(() => {
      result.current.toggleSpot(spot);
    });
    act(() => {
      result.current.toggleSpot(spot);
    });

    expect(result.current.selectedSpots).toHaveLength(0);
  });

  it("should add multiple spots", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot1 = createSpot("s1", "浅草寺");
    const spot2 = createSpot("s2", "スカイツリー");

    act(() => {
      result.current.toggleSpot(spot1);
    });
    act(() => {
      result.current.toggleSpot(spot2);
    });

    expect(result.current.selectedSpots).toHaveLength(2);
  });

  it("should reorder spots correctly", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot1 = createSpot("s1", "浅草寺");
    const spot2 = createSpot("s2", "スカイツリー");
    const spot3 = createSpot("s3", "明治神宮");

    act(() => {
      result.current.toggleSpot(spot1);
    });
    act(() => {
      result.current.toggleSpot(spot2);
    });
    act(() => {
      result.current.toggleSpot(spot3);
    });

    act(() => {
      result.current.reorderSpots(0, 2);
    });

    expect(result.current.selectedSpots[0].id).toBe("s2");
    expect(result.current.selectedSpots[1].id).toBe("s3");
    expect(result.current.selectedSpots[2].id).toBe("s1");
  });

  it("should not reorder with invalid indices", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot1 = createSpot("s1", "浅草寺");

    act(() => {
      result.current.toggleSpot(spot1);
    });

    act(() => {
      result.current.reorderSpots(-1, 0);
    });
    expect(result.current.selectedSpots).toHaveLength(1);

    act(() => {
      result.current.reorderSpots(0, 5);
    });
    expect(result.current.selectedSpots).toHaveLength(1);
    expect(result.current.selectedSpots[0].id).toBe("s1");
  });

  it("should clear all spots with clearRoute", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot1 = createSpot("s1", "浅草寺");
    const spot2 = createSpot("s2", "スカイツリー");

    act(() => {
      result.current.toggleSpot(spot1);
    });
    act(() => {
      result.current.toggleSpot(spot2);
    });
    act(() => {
      result.current.clearRoute();
    });

    expect(result.current.selectedSpots).toEqual([]);
  });

  it("should return correct isSelected status", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot = createSpot("s1", "浅草寺");

    expect(result.current.isSelected("s1")).toBe(false);

    act(() => {
      result.current.toggleSpot(spot);
    });

    expect(result.current.isSelected("s1")).toBe(true);
    expect(result.current.isSelected("s2")).toBe(false);
  });

  it("should return correct order number", () => {
    const { result } = renderHook(() => useRouteManager());
    const spot1 = createSpot("s1", "浅草寺");
    const spot2 = createSpot("s2", "スカイツリー");

    act(() => {
      result.current.toggleSpot(spot1);
    });
    act(() => {
      result.current.toggleSpot(spot2);
    });

    expect(result.current.getOrderNumber("s1")).toBe(1);
    expect(result.current.getOrderNumber("s2")).toBe(2);
    expect(result.current.getOrderNumber("s3")).toBeUndefined();
  });
});
