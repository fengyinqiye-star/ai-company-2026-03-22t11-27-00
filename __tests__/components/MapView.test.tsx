import React from "react";
import { render, screen } from "@testing-library/react";
import MapView from "@/components/map/MapView";
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

describe("MapView", () => {
  const defaultProps = {
    center: { lat: 35.6812, lng: 139.7671 },
    zoom: 12,
    spots: [createSpot("s1", "浅草寺"), createSpot("s2", "スカイツリー")],
    selectedSpots: [] as Spot[],
    onSpotClick: jest.fn(),
  };

  it("should render map container", () => {
    render(<MapView {...defaultProps} />);
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });

  it("should render tile layer", () => {
    render(<MapView {...defaultProps} />);
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
  });

  it("should render markers for unselected spots", () => {
    render(<MapView {...defaultProps} />);
    const markers = screen.getAllByTestId("marker");
    expect(markers.length).toBe(2);
  });

  it("should render numbered markers for selected spots", () => {
    const selected = [createSpot("s1", "浅草寺")];
    render(
      <MapView
        {...defaultProps}
        selectedSpots={selected}
      />
    );
    // s1 is selected (numbered marker), s2 is unselected (regular marker)
    const markers = screen.getAllByTestId("marker");
    expect(markers.length).toBe(2); // 1 regular + 1 numbered
  });

  it("should render polyline when 2+ spots are selected", () => {
    const selected = [
      createSpot("s1", "浅草寺"),
      createSpot("s2", "スカイツリー"),
    ];
    render(
      <MapView
        {...defaultProps}
        selectedSpots={selected}
      />
    );
    expect(screen.getByTestId("polyline")).toBeInTheDocument();
  });

  it("should not render polyline when less than 2 spots are selected", () => {
    const selected = [createSpot("s1", "浅草寺")];
    render(
      <MapView
        {...defaultProps}
        selectedSpots={selected}
      />
    );
    expect(screen.queryByTestId("polyline")).not.toBeInTheDocument();
  });
});
