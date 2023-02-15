import { render, fireEvent, screen } from "@testing-library/react";
import { useCache } from "providers/CacheProvider";
import Modules from "./modules";

jest.mock("providers/CacheProvider");

describe("Modules page", () => {
  const mockCreateCacheModule = jest.fn();
  const mockDeleteCacheModule = jest.fn();
  const mockClearCacheModules = jest.fn();

  beforeEach(() => {
    // Mock the `useCache` hook to return the expected values
    (useCache as jest.Mock).mockReturnValue({
      createCacheModule: mockCreateCacheModule,
      deleteCacheModule: mockDeleteCacheModule,
      clearCacheModules: mockClearCacheModules,
      getModules: () => new Map(),
    });
  });

  afterEach(() => {
    // Clear all mock functions after each test
    jest.resetAllMocks();
  });

  test("renders the 'Storage Modules' heading", () => {
    render(<Modules />);
    const headingElement = screen.getByText("Storage Modules");
    expect(headingElement).toBeInTheDocument();
  });

  test("calls the 'createCacheModule' function when the 'Add Module To Context' button is clicked", () => {
    render(<Modules />);
    const inputElement = screen.getByPlaceholderText("Module Key");
    const buttonElement = screen.getByText("Add Module To Context");

    fireEvent.change(inputElement, { target: { value: "test-key" } });
    fireEvent.click(buttonElement);

    expect(mockCreateCacheModule).toHaveBeenCalledWith("test-key");
  });

  test("does not call the 'createCacheModule' function when the 'Add Module To Context' button is clicked with an empty input", () => {
    render(<Modules />);
    const buttonElement = screen.getByText("Add Module To Context");

    fireEvent.click(buttonElement);

    expect(mockCreateCacheModule).not.toHaveBeenCalled();
  });

  test("calls the 'clearCacheModules' function when the 'Clear Modules' button is clicked", () => {
    render(<Modules />);
    const buttonElement = screen.getByText("Clear Modules");

    fireEvent.click(buttonElement);

    expect(mockClearCacheModules).toHaveBeenCalled();
  });

  test("renders the list of memory module cards", () => {
    // Create two modules
    const module1 = { key: "module1", data: "module1 data" };
    const module2 = { key: "module2", data: "module2 data" };
    const modules = new Map();
    modules.set(module1.key, module1);
    modules.set(module2.key, module2);

    // Mock the `useCache` hook to return the created modules
    (useCache as jest.Mock).mockReturnValue({
      createCacheModule: mockCreateCacheModule,
      deleteCacheModule: mockDeleteCacheModule,
      clearCacheModules: mockClearCacheModules,
      getModules: () => modules,
    });

    render(<Modules />);
    const moduleCardElements = Array.from(modules.entries()).map(
      ([key, _module]) => screen.getByText(key)
    );
    expect(moduleCardElements).toHaveLength(2);
  });

  test("calls the 'deleteCacheModule' function when a 'Delete Module' button is clicked", () => {
    // Create a module to render
    const module = { key: "test-module", data: "test data" };

    // Mock the `useCache` hook to return the created module
    (useCache as jest.Mock).mockReturnValue({
      createCacheModule: mockCreateCacheModule,
      deleteCacheModule: mockDeleteCacheModule,
      clearCacheModules: mockClearCacheModules,
      getModules: () => new Map([[module.key, module]]),
    });

    render(<Modules />);
    const removeButton = screen.getByText("Delete Module");
    fireEvent.click(removeButton);

    expect(mockDeleteCacheModule).toHaveBeenCalledWith(module.key);
  });
});
