import { renderHook, act } from "@testing-library/react-hooks";
import useContextStorage from "./useContextStorage";
import { CACHE_STORAGES_ENUM } from "../../constants";

describe("useContextStorage", () => {
  it("should return the correct type", () => {
    const { result } = renderHook(() => useContextStorage());
    expect(result.current.type).toBe(CACHE_STORAGES_ENUM.context);
  });

  it("should return the expected module for a given key", () => {
    const { result } = renderHook(() => useContextStorage());
    let module;
    act(() => {
      module = result.current.createCacheModule("test");
    });
    expect(result.current.getModuleValue("test")).toEqual(module);
  });

  it("should return the expected size for a given key", () => {
    const { result } = renderHook(() => useContextStorage());
    expect(() => result.current.getModuleSize("test")).toThrowError(
      "Module with key 'test' not found."
    );

    act(() => {
      result.current.createCacheModule("test");
    });
    expect(result.current.getModuleSize("test")).toBe(0);
  });

  it("should return the expected modules map", () => {
    const { result } = renderHook(() => useContextStorage());

    act(() => {
      result.current.createCacheModule("test1");
      result.current.createCacheModule("test2");
    });

    const modules = result.current.getModules();
    expect(modules.has("test1")).toBe(true);
    expect(modules.has("test2")).toBe(true);
  });

  it("should return the existing cache module if it already exists", () => {
    const { result } = renderHook(() => useContextStorage());
    act(() => {
      const cacheModule = result.current.createCacheModule("test");
      const existingCacheModule = result.current.createCacheModule("test");
      expect(existingCacheModule).toBe(cacheModule);
    });
  });

  it("should update the cache module correctly", () => {
    const { result } = renderHook(() => useContextStorage());

    let module: any;

    act(() => {
      module = result.current.createCacheModule("test");
    });

    act(() => {
      result.current.updateModule("test", () => {
        module.modules.set("foo", "bar");
      });

      module = result.current.getModuleValue("test");
    });

    expect(module.modules.get("foo")).toBe("bar");
  });

  it("throws an error if the callback provided to updateModule is not a function", () => {
    const { result } = renderHook(() => useContextStorage());

    expect(() => result.current.updateModule("test", {})).toThrowError(
      "Module with key 'test' not found."
    );

    act(() => {
      result.current.createCacheModule("test");
    });

    expect(() => result.current.updateModule("test", {})).toThrowError(
      "Invalid callback type. Expected function, got object."
    );
  });

  it("should delete the cache module correctly", () => {
    const { result } = renderHook(() => useContextStorage());

    expect(() => result.current.deleteCacheModule("test")).toThrowError(
      "Module with key 'test' not found."
    );

    act(() => {
      result.current.createCacheModule("test");
    });

    act(() => {
      result.current.deleteCacheModule("test");
    });

    expect(result.current.getCacheModule("test").module).toBe(null);
  });

  it("should clear all cache modules correctly", () => {
    const { result } = renderHook(() => useContextStorage());
    act(() => {
      result.current.createCacheModule("test1");
      result.current.createCacheModule("test2");
      result.current.clearCacheModules();
    });
    expect(result.current.getModules().size).toBe(0);
  });

  it("should throw an error for an invalid key when trying to retrieve a module", () => {
    const { result } = renderHook(() => useContextStorage());
    expect(() => result.current.getModuleValue("test")).toThrowError(
      `Module with key 'test' not found.`
    );
  });
});
