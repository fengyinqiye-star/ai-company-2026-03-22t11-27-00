import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "@/components/area/BackButton";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("BackButton", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("should render the back button text", () => {
    render(<BackButton />);
    expect(screen.getByText("エリア選択に戻る")).toBeInTheDocument();
  });

  it("should navigate to home when clicked", () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
