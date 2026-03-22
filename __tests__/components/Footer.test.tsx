import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("should render the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/2026 おすすめ観光スポット/)).toBeInTheDocument();
  });

  it("should render the OpenStreetMap attribution", () => {
    render(<Footer />);
    expect(screen.getByText("OpenStreetMap")).toBeInTheDocument();
  });

  it("should have a link to OpenStreetMap", () => {
    render(<Footer />);
    const link = screen.getByText("OpenStreetMap");
    expect(link).toHaveAttribute(
      "href",
      "https://www.openstreetmap.org/copyright"
    );
  });
});
