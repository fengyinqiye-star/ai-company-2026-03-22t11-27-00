import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoutePanel from "@/components/route/RoutePanel";
import type { Spot } from "@/types";

const createSpot = (id: string, name: string): Spot => ({
  id,
  areaId: "tokyo",
  name,
  category: "shrine_temple",
  description: "テスト",
  duration: "約60分",
  position: { lat: 35.0, lng: 139.0 },
});

describe("RoutePanel", () => {
  const mockReorder = jest.fn();
  const mockClear = jest.fn();

  beforeEach(() => {
    mockReorder.mockClear();
    mockClear.mockClear();
  });

  it("should return null when no spots are selected", () => {
    const { container } = render(
      <RoutePanel
        selectedSpots={[]}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render selected spots", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    expect(screen.getByText("浅草寺")).toBeInTheDocument();
    expect(screen.getByText("スカイツリー")).toBeInTheDocument();
  });

  it("should render order numbers", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    // Order numbers appear in orange circles, spot count badge is in blue circle
    // "1" appears once as order number, "2" appears twice (order + count badge)
    expect(screen.getByText("1")).toBeInTheDocument();
    const twos = screen.getAllByText("2");
    expect(twos.length).toBe(2); // order number + spot count
  });

  it("should display spot count badge", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
      createSpot("s3", "明治神宮"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    // The spot count badge (3) also matches the order number of the 3rd spot
    const threes = screen.getAllByText("3");
    expect(threes.length).toBe(2); // count badge + order number
  });

  it("should call onClear when clear button is clicked", () => {
    const spots = [createSpot("s1", "浅草寺")];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    fireEvent.click(screen.getByText("ルートをクリア"));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  it("should call onReorder when move up button is clicked", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    const moveUpButtons = screen.getAllByLabelText("上に移動");
    // Click the second spot's move up button
    fireEvent.click(moveUpButtons[1]);
    expect(mockReorder).toHaveBeenCalledWith(1, 0);
  });

  it("should call onReorder when move down button is clicked", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    const moveDownButtons = screen.getAllByLabelText("下に移動");
    // Click the first spot's move down button
    fireEvent.click(moveDownButtons[0]);
    expect(mockReorder).toHaveBeenCalledWith(0, 1);
  });

  it("should disable move up button for first item", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    const moveUpButtons = screen.getAllByLabelText("上に移動");
    expect(moveUpButtons[0]).toBeDisabled();
  });

  it("should disable move down button for last item", () => {
    const spots = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];

    render(
      <RoutePanel
        selectedSpots={spots}
        onReorder={mockReorder}
        onClear={mockClear}
      />
    );

    const moveDownButtons = screen.getAllByLabelText("下に移動");
    expect(moveDownButtons[moveDownButtons.length - 1]).toBeDisabled();
  });
});
