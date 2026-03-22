import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SpotMarker from "@/components/map/SpotMarker";
import NumberedMarker from "@/components/map/NumberedMarker";
import type { Spot } from "@/types";

const mockSpot: Spot = {
  id: "tokyo-001",
  areaId: "tokyo",
  name: "浅草寺",
  category: "shrine_temple",
  description: "東京最古の寺院",
  duration: "約60分",
  position: { lat: 35.7148, lng: 139.7967 },
};

describe("SpotMarker", () => {
  it("should render a marker", () => {
    const onClick = jest.fn();
    render(<SpotMarker spot={mockSpot} onClick={onClick} />);
    expect(screen.getByTestId("marker")).toBeInTheDocument();
  });

  it("should render spot name in popup", () => {
    const onClick = jest.fn();
    render(<SpotMarker spot={mockSpot} onClick={onClick} />);
    expect(screen.getByText("浅草寺")).toBeInTheDocument();
  });

  it("should render description in popup", () => {
    const onClick = jest.fn();
    render(<SpotMarker spot={mockSpot} onClick={onClick} />);
    expect(screen.getByText("東京最古の寺院")).toBeInTheDocument();
  });

  it("should call onClick when marker is clicked", () => {
    const onClick = jest.fn();
    render(<SpotMarker spot={mockSpot} onClick={onClick} />);
    fireEvent.click(screen.getByTestId("marker"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("NumberedMarker", () => {
  it("should render a marker", () => {
    const onClick = jest.fn();
    render(
      <NumberedMarker spot={mockSpot} orderNumber={1} onClick={onClick} />
    );
    expect(screen.getByTestId("marker")).toBeInTheDocument();
  });

  it("should render order number with spot name in popup", () => {
    const onClick = jest.fn();
    render(
      <NumberedMarker spot={mockSpot} orderNumber={3} onClick={onClick} />
    );
    expect(screen.getByText(/3\. 浅草寺/)).toBeInTheDocument();
  });

  it("should call onClick when marker is clicked", () => {
    const onClick = jest.fn();
    render(
      <NumberedMarker spot={mockSpot} orderNumber={1} onClick={onClick} />
    );
    fireEvent.click(screen.getByTestId("marker"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
