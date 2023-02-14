import { render, screen } from "@testing-library/react";
import BaseTemplate from "./BaseTemplate";

describe("BaseTemplate", () => {
  it("should render the sample prop", () => {
    const sample = "Hello, World!";
    render(<BaseTemplate sample={sample} />);
    expect(screen.getByText(sample)).toBeInTheDocument();
  });

  it("should render the children", () => {
    render(<BaseTemplate sample="Hello, World!" />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});
