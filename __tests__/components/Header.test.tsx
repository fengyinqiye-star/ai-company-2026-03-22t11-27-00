import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

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

describe("Header", () => {
  it("should render the app title", () => {
    render(<Header />);
    expect(screen.getByText("おすすめ観光スポット")).toBeInTheDocument();
  });

  it("should link to the home page", () => {
    render(<Header />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
