import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/search/SearchBar";
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
];

describe("SearchBar", () => {
  it("should render the input field", () => {
    render(<SearchBar areas={mockAreas} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should have the correct placeholder", () => {
    render(<SearchBar areas={mockAreas} />);
    expect(
      screen.getByPlaceholderText("エリア名を入力（例: 東京）")
    ).toBeInTheDocument();
  });

  it("should have aria-label for accessibility", () => {
    render(<SearchBar areas={mockAreas} />);
    expect(screen.getByLabelText("エリア検索")).toBeInTheDocument();
  });

  it("should show suggestions when typing a matching query", () => {
    render(<SearchBar areas={mockAreas} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "東" } });
    expect(screen.getByText("東京")).toBeInTheDocument();
  });

  it("should show no-results message for non-matching query", () => {
    render(<SearchBar areas={mockAreas} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "福岡" } });
    expect(screen.getByText("対応エリアが見つかりません")).toBeInTheDocument();
  });

  it("should show clear button when query is not empty", () => {
    render(<SearchBar areas={mockAreas} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "東" } });
    expect(screen.getByLabelText("検索をクリア")).toBeInTheDocument();
  });

  it("should clear the input when clear button is clicked", () => {
    render(<SearchBar areas={mockAreas} />);
    const input = screen.getByRole("combobox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "東" } });
    fireEvent.click(screen.getByLabelText("検索をクリア"));
    expect(input.value).toBe("");
  });

  it("should not show clear button when query is empty", () => {
    render(<SearchBar areas={mockAreas} />);
    expect(screen.queryByLabelText("検索をクリア")).not.toBeInTheDocument();
  });
});
