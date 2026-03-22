import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileTabSwitcher from "@/components/spot/MobileTabSwitcher";

describe("MobileTabSwitcher", () => {
  const mockTabChange = jest.fn();

  beforeEach(() => {
    mockTabChange.mockClear();
  });

  it("should render two tab buttons", () => {
    render(
      <MobileTabSwitcher
        activeTab="list"
        onTabChange={mockTabChange}
        selectedCount={0}
      />
    );
    expect(screen.getByText("スポット一覧")).toBeInTheDocument();
    expect(screen.getByText("地図")).toBeInTheDocument();
  });

  it("should call onTabChange with 'map' when map tab is clicked", () => {
    render(
      <MobileTabSwitcher
        activeTab="list"
        onTabChange={mockTabChange}
        selectedCount={0}
      />
    );
    fireEvent.click(screen.getByText("地図"));
    expect(mockTabChange).toHaveBeenCalledWith("map");
  });

  it("should call onTabChange with 'list' when list tab is clicked", () => {
    render(
      <MobileTabSwitcher
        activeTab="map"
        onTabChange={mockTabChange}
        selectedCount={0}
      />
    );
    fireEvent.click(screen.getByText(/スポット一覧/));
    expect(mockTabChange).toHaveBeenCalledWith("list");
  });

  it("should display selected count badge when selectedCount > 0", () => {
    render(
      <MobileTabSwitcher
        activeTab="list"
        onTabChange={mockTabChange}
        selectedCount={3}
      />
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should not display badge when selectedCount is 0", () => {
    render(
      <MobileTabSwitcher
        activeTab="list"
        onTabChange={mockTabChange}
        selectedCount={0}
      />
    );
    // There should be no number badge
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
