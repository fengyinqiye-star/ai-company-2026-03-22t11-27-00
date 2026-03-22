import React from "react";
import { render, screen } from "@testing-library/react";
import type { Spot } from "@/types";

// These components use react-leaflet which is mocked
import RoutePolyline from "@/components/map/RoutePolyline";

const createSpot = (id: string, lat: number, lng: number): Spot => ({
  id,
  areaId: "tokyo",
  name: `Spot ${id}`,
  category: "scenery",
  description: "Test",
  duration: "60min",
  position: { lat, lng },
});

describe("RoutePolyline", () => {
  it("should return null when less than 2 spots", () => {
    const { container } = render(
      <RoutePolyline selectedSpots={[createSpot("s1", 35.0, 139.0)]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render polyline when 2 or more spots", () => {
    render(
      <RoutePolyline
        selectedSpots={[
          createSpot("s1", 35.0, 139.0),
          createSpot("s2", 35.1, 139.1),
        ]}
      />
    );
    expect(screen.getByTestId("polyline")).toBeInTheDocument();
  });
});
