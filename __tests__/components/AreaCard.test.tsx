import React from "react";
import { render, screen } from "@testing-library/react";
import AreaCard from "@/components/area/AreaCard";
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

const mockArea: Area = {
  id: "tokyo",
  name: "東京",
  description: "日本の首都。伝統と最先端が融合する世界有数の大都市",
  center: { lat: 35.6812, lng: 139.7671 },
  zoom: 12,
  image: "/images/areas/tokyo.jpg",
};

describe("AreaCard", () => {
  it("should render the area name", () => {
    render(<AreaCard area={mockArea} spotCount={7} />);
    // area.name appears twice (in the gradient overlay and in the card body)
    const elements = screen.getAllByText("東京");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("should render the spot count", () => {
    render(<AreaCard area={mockArea} spotCount={7} />);
    expect(screen.getByText("7 スポット")).toBeInTheDocument();
  });

  it("should render the area description", () => {
    render(<AreaCard area={mockArea} spotCount={7} />);
    expect(screen.getByText(mockArea.description)).toBeInTheDocument();
  });

  it("should link to the correct area page", () => {
    render(<AreaCard area={mockArea} spotCount={7} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/area/tokyo");
  });

  it("should render spot count as 0 when no spots", () => {
    render(<AreaCard area={mockArea} spotCount={0} />);
    expect(screen.getByText("0 スポット")).toBeInTheDocument();
  });
});
