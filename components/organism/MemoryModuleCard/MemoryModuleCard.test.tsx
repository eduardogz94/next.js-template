import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CacheProvider from "providers/CacheProvider";
import MemoryModuleCard from "./MemoryModuleCard";

describe("MemoryModuleCard", () => {
  const mockModule = {
    module: "Test",
    clear: jest.fn(),
    setKey: jest.fn(),
    getKey: jest.fn().mockReturnValue("testValue"),
    removeKey: jest.fn(),
  };

  const onRemove = jest.fn();

  it("renders the correct heading", () => {
    render(
      <CacheProvider>
        <MemoryModuleCard module={mockModule} onRemove={onRemove} />
      </CacheProvider>
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Module");
  });

  it("calls onRemove when delete button is clicked", () => {
    render(
      <CacheProvider>
        <MemoryModuleCard module={mockModule} onRemove={onRemove} />
      </CacheProvider>
    );
    const deleteButton = screen.getByRole("button", { name: "Delete Module" });
    userEvent.click(deleteButton);
    expect(onRemove).toHaveBeenCalled();
  });

  it("calls module.clear when clear button is clicked", () => {
    render(
      <CacheProvider>
        <MemoryModuleCard module={mockModule} onRemove={onRemove} />
      </CacheProvider>
    );
    const clearButton = screen.getByRole("button", {
      name: "Clear Module Cache",
    });
    userEvent.click(clearButton);
    expect(mockModule.clear).toHaveBeenCalled();
  });

  it("calls module.setKey when Add Inputs to Cache button is clicked", () => {
    render(
      <CacheProvider>
        <MemoryModuleCard module={mockModule} onRemove={onRemove} />
      </CacheProvider>
    );
    const addInputsButton = screen.getByRole("button", {
      name: "Add Inputs to Cache",
    });
    const keyInput = screen.getByPlaceholderText("Cache Key");
    const valueInput = screen.getByPlaceholderText("Cache value");

    userEvent.type(keyInput, "testKey");
    userEvent.type(valueInput, "testValue");
    userEvent.click(addInputsButton);

    expect(mockModule.setKey).toHaveBeenCalledWith(
      "testKey",
      "testValue",
      10000
    );
  });

  it("calls module.getKey and sets the input value when Get Input Key Cache button is clicked", () => {
    render(
      <CacheProvider>
        <MemoryModuleCard module={mockModule} onRemove={onRemove} />
      </CacheProvider>
    );
    const getKeyButton = screen.getByRole("button", {
      name: "Get Input Key Cache",
    });
    const keyInput = screen.getByPlaceholderText("Cache Key");
    const valueInput = screen.getByPlaceholderText("Cache value");

    userEvent.type(keyInput, "testKey");
    userEvent.click(getKeyButton);

    expect(mockModule.getKey).toHaveBeenCalledWith("testKey");
    expect(valueInput).toHaveValue("testValue");
  });

  it("calls module.removeKey when Remove Input Key Cache button is clicked", () => {
    render(
      <CacheProvider>
        <MemoryModuleCard module={mockModule} onRemove={onRemove} />
      </CacheProvider>
    );
    const removeKeyButton = screen.getByRole("button", {
      name: "Remove Input Key Cache",
    });
    const keyInput = screen.getByPlaceholderText("Cache Key");

    userEvent.type(keyInput, "testKey");
    userEvent.click(removeKeyButton);

    expect(mockModule.removeKey).toHaveBeenCalledWith("testKey");
  });
});
