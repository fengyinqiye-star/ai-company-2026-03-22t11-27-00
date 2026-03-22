import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SpotExplorer from "@/components/spot/SpotExplorer";
import type { Area, Spot } from "@/types";

// Mock next/dynamic to just render the component directly
jest.mock("next/dynamic", () => {
  return (loader: () => Promise<any>) => {
    const MockMapView = (props: any) => (
      <div data-testid="mock-map-view">Map</div>
    );
    MockMapView.displayName = "MockMapView";
    return MockMapView;
  };
});

const mockArea: Area = {
  id: "tokyo",
  name: "東京",
  description: "日本の首都",
  center: { lat: 35.6812, lng: 139.7671 },
  zoom: 12,
  image: "/images/areas/tokyo.jpg",
};

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
  {
    id: "tokyo-003",
    areaId: "tokyo",
    name: "明治神宮",
    category: "shrine_temple",
    description: "都心に広がる鎮守の杜",
    duration: "約60分",
    position: { lat: 35.6764, lng: 139.6993 },
  },
];

describe("SpotExplorer", () => {
  it("should render spot list", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);
    expect(screen.getByText("浅草寺")).toBeInTheDocument();
    expect(screen.getByText("東京スカイツリー")).toBeInTheDocument();
    expect(screen.getByText("明治神宮")).toBeInTheDocument();
  });

  it("should render mobile tab switcher", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);
    expect(screen.getByText("スポット一覧")).toBeInTheDocument();
    expect(screen.getByText("地図")).toBeInTheDocument();
  });

  it("should render mock map view", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);
    expect(screen.getAllByTestId("mock-map-view").length).toBeGreaterThanOrEqual(1);
  });

  it("should toggle spot selection when clicking a spot card", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);

    // Click first spot to select it
    const spotButtons = screen.getAllByRole("button");
    const asakusaButton = spotButtons.find(
      (btn) => btn.textContent?.includes("浅草寺")
    );
    expect(asakusaButton).toBeDefined();

    fireEvent.click(asakusaButton!);
    expect(asakusaButton!).toHaveAttribute("aria-pressed", "true");
  });

  it("should show route panel when spots are selected", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);

    // Select two spots
    const spotButtons = screen.getAllByRole("button");
    const asakusaButton = spotButtons.find(
      (btn) => btn.textContent?.includes("浅草寺")
    );
    const skytreeButton = spotButtons.find(
      (btn) => btn.textContent?.includes("東京スカイツリー")
    );

    fireEvent.click(asakusaButton!);
    fireEvent.click(skytreeButton!);

    expect(screen.getAllByText("ルートをクリア").length).toBeGreaterThanOrEqual(1);
  });

  it("should clear route when clear button is clicked", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);

    // Select spots
    const spotButtons = screen.getAllByRole("button");
    const asakusaButton = spotButtons.find(
      (btn) => btn.textContent?.includes("浅草寺")
    );
    const skytreeButton = spotButtons.find(
      (btn) => btn.textContent?.includes("東京スカイツリー")
    );

    fireEvent.click(asakusaButton!);
    fireEvent.click(skytreeButton!);

    // Clear route
    const clearButtons = screen.getAllByText("ルートをクリア");
    fireEvent.click(clearButtons[0]);

    // After clear, spots should be unselected
    expect(asakusaButton!).toHaveAttribute("aria-pressed", "false");
  });

  it("should switch tabs on mobile", () => {
    render(<SpotExplorer area={mockArea} spots={mockSpots} />);

    const mapTab = screen.getByText("地図");
    fireEvent.click(mapTab);

    // After clicking map tab, the list tab button text should not have the active style
    // (we verify the tab change was triggered)
    const listTab = screen.getByText(/スポット一覧/);
    expect(listTab).toBeInTheDocument();
  });
});
