import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders without error", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays the correct text", () => {
    render(<Footer />);
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});
