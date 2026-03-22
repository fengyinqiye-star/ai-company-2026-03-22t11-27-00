import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SpotList from "@/components/spot/SpotList";
import type { Spot } from "@/types";

const mockSpots: Spot[] = [
  {
    id: "tokyo-001",
    areaId: "tokyo",
    name: "浅草寺",
    category: "shrine_temple",
    description: "東京最古の寺院",
    duration: "約60分",
    position: { lat: 35.7148, lng: 139.7967 },
  },
  {
    id: "tokyo-002",
    areaId: "tokyo",
    name: "東京スカイツリー",
    category: "scenery",
    description: "高さ634mの電波塔",
    duration: "約90分",
    position: { lat: 35.7101, lng: 139.8107 },
  },
];

describe("SpotList", () => {
  const mockToggle = jest.fn();
  const mockGetOrder = jest.fn((id: string) =>
    id === "tokyo-001" ? 1 : undefined
  );

  beforeEach(() => {
    mockToggle.mockClear();
    mockGetOrder.mockClear();
  });

  it("should render all spots", () => {
    render(
      <SpotList
        spots={mockSpots}
        selectedSpotIds={[]}
        onToggleSpot={mockToggle}
        getOrderNumber={mockGetOrder}
      />
    );
    expect(screen.getByText("浅草寺")).toBeInTheDocument();
    expect(screen.getByText("東京スカイツリー")).toBeInTheDocument();
  });

  it("should pass correct isSelected to SpotCard", () => {
    render(
      <SpotList
        spots={mockSpots}
        selectedSpotIds={["tokyo-001"]}
        onToggleSpot={mockToggle}
        getOrderNumber={mockGetOrder}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
  });

  it("should call onToggleSpot when a spot card is clicked", () => {
    render(
      <SpotList
        spots={mockSpots}
        selectedSpotIds={[]}
        onToggleSpot={mockToggle}
        getOrderNumber={mockGetOrder}
      />
    );
    fireEvent.click(screen.getByText("浅草寺"));
    expect(mockToggle).toHaveBeenCalledWith(mockSpots[0]);
  });
});
