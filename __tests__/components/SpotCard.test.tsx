import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SpotCard from "@/components/spot/SpotCard";
import type { Spot } from "@/types";

const mockSpot: Spot = {
  id: "tokyo-001",
  areaId: "tokyo",
  name: "浅草寺",
  category: "shrine_temple",
  description: "東京最古の寺院。雷門の巨大提灯と仲見世通りの賑わいが有名",
  duration: "約60分",
  position: { lat: 35.7148, lng: 139.7967 },
};

describe("SpotCard", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it("should render the spot name", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    expect(screen.getByText("浅草寺")).toBeInTheDocument();
  });

  it("should render the category label", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    expect(screen.getByText(/神社仏閣/)).toBeInTheDocument();
  });

  it("should render the description", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    expect(screen.getByText(mockSpot.description)).toBeInTheDocument();
  });

  it("should render the duration", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    expect(screen.getByText("約60分")).toBeInTheDocument();
  });

  it("should have aria-pressed=false when not selected", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("should have aria-pressed=true when selected", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={true} onToggle={mockToggle} />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("should call onToggle when clicked", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("should call onToggle on Enter key", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("should call onToggle on Space key", () => {
    render(
      <SpotCard spot={mockSpot} isSelected={false} onToggle={mockToggle} />
    );
    fireEvent.keyDown(screen.getByRole("button"), { key: " " });
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("should display order number when selected", () => {
    render(
      <SpotCard
        spot={mockSpot}
        isSelected={true}
        orderNumber={3}
        onToggle={mockToggle}
      />
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should not display order number when not selected", () => {
    render(
      <SpotCard
        spot={mockSpot}
        isSelected={false}
        orderNumber={undefined}
        onToggle={mockToggle}
      />
    );
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
