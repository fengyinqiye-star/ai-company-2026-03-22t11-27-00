import React from "react";
import { render, screen } from "@testing-library/react";
import AreaCardList from "@/components/search/AreaCardList";
import type { Area } from "@/types";

jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

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

const mockSpotCounts: Record<string, number> = {
  tokyo: 7,
  kyoto: 6,
};

describe("AreaCardList", () => {
  it("should render all area cards", () => {
    render(<AreaCardList areas={mockAreas} spotCounts={mockSpotCounts} />);
    // Each area name appears twice (gradient + card body)
    expect(screen.getAllByText("東京").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("京都").length).toBeGreaterThanOrEqual(1);
  });

  it("should render correct spot counts", () => {
    render(<AreaCardList areas={mockAreas} spotCounts={mockSpotCounts} />);
    expect(screen.getByText("7 スポット")).toBeInTheDocument();
    expect(screen.getByText("6 スポット")).toBeInTheDocument();
  });

  it("should render 0 spots for missing area in spotCounts", () => {
    render(
      <AreaCardList areas={mockAreas} spotCounts={{ tokyo: 7 }} />
    );
    expect(screen.getByText("0 スポット")).toBeInTheDocument();
  });

  it("should render correct number of links", () => {
    render(<AreaCardList areas={mockAreas} spotCounts={mockSpotCounts} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });
});
