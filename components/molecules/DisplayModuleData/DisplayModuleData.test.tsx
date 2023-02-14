import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayModuleData from "./DisplayModuleData";

const mockModule = {
  name: "Test module",
  description: "This is a test module",
  data: new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]),
};

describe("DisplayModuleData component", () => {
  it("should render all module data", () => {
    render(<DisplayModuleData module={mockModule} />);

    expect(screen.getByText(/name:/i)).toBeInTheDocument();
    expect(screen.getByText(mockModule.name)).toBeInTheDocument();
    expect(screen.getByText(/description:/i)).toBeInTheDocument();
    expect(screen.getByText(mockModule.description)).toBeInTheDocument();
    expect(screen.getByText(/data:/i)).toBeInTheDocument();
    expect(screen.getByText(/key1:/i)).toBeInTheDocument();
    // expect(screen.getByText("value1")).toBeInTheDocument();
    expect(screen.getByText(/key2:/i)).toBeInTheDocument();
    // expect(screen.getByText("value2")).toBeInTheDocument();
  });
  it("renders an object with nested values as expected", () => {
    const module = {
      key1: "value1",
      key2: { nestedKey: "nestedValue" },
      key3: ["1", "2", "3"],
    };
    render(<DisplayModuleData module={module} />);
    expect(screen.getByText(/key2/i)).toBeInTheDocument();
    expect(
      screen.getByText(JSON.stringify({ nestedKey: "nestedValue" }))
    ).toBeInTheDocument();
  });
});
