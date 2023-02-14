import CacheModule from "./CacheModule";

describe("CacheModule", () => {
  it("should create an instance of CacheModule with a Map as modules and module name", () => {
    const modules = new Map();
    const module = new CacheModule(modules, "module1");

    expect(module.modules).toEqual(modules);
    expect(module.module).toBe("module1");
  });

  it("should throw an error if modules is not an instance of Map", () => {
    expect(() => new CacheModule({} as any)).toThrowError(
      "modules should be an instance of Map"
    );
  });

  it("should return an error if no modules are found when trying to get a key", () => {
    const module = new CacheModule(new Map(), "module1");

    expect(module.getKey("key1")).toEqual(null);
  });

  it("should return data for a key if it exists", () => {
    const modules = new Map();
    modules.set("key1", "data1");
    const module = new CacheModule(modules, "module1");

    expect(module.getKey("key1")).toBe("data1");
  });

  it("should return an error if data is not provided when setting a key", () => {
    const modules = new Map();
    const module = new CacheModule(modules, "module1");

    expect(module.setKey("key1", undefined)).toEqual(
      new Error("Data is required")
    );
  });

  it("should return the existing data if new data is equal to existing data", () => {
    const modules = new Map();
    modules.set("key1", "data1");
    const module = new CacheModule(modules, "module1");

    expect(module.setKey("key1", "data1")).toBe("data1");
  });

  it("should set a key and its data if new data is not equal to existing data", () => {
    const modules = new Map();
    modules.set("key1", "data1");
    const module = new CacheModule(modules, "module1");

    expect(module.setKey("key1", "data2")).toBe("data2");
    expect(module.getKey("key1")).toBe("data2");
  });

  it("should clear a timer for a key if it exists when setting a new key", () => {
    const modules = new Map();
    modules.set("key1", "data1");
    const module = new CacheModule(modules, "module1");

    module.setExpirationTimer("key1");
    expect(module.timers.size).toBe(1);

    module.setKey("key1", "data2");
    expect(module.timers.size).toBe(0);
  });

  it("should set an expiration timer", () => {
    const modules = new Map();
    const module = new CacheModule(modules, "module1");
    const spy = jest.spyOn(global, "setTimeout");
    module.setExpirationTimer("testKey", 1000);
    expect(spy).toHaveBeenCalled();
  });

  it("should set a timer for a key if expiration time is provided when setting a new key", () => {
    jest.useFakeTimers();

    const key = "testKey";
    const data = "testData";
    const expirationTime = 1000;
    const cb = jest.fn();
    const cacheModule = new CacheModule(new Map(), "testModule");

    cacheModule.setKey(key, data, expirationTime, cb);

    jest.advanceTimersByTime(expirationTime + 1);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cacheModule.getKey(key)).toBe(null);
  });

  it("should remove a key if it exists", () => {
    const key = "testKey";
    const data = "testData";
    const cacheModule = new CacheModule(new Map(), "testModule");
    cacheModule.setKey(key, data);
    expect(cacheModule.getKey(key)).toBe("testData");

    cacheModule.removeKey(key);
    expect(cacheModule.getKey(key)).toBe(null);
  });

  it("should return null if the key doesn't exist", () => {
    const key = "testKey";
    const cacheModule = new CacheModule(new Map(), "testModule");
    expect(cacheModule.removeKey(key)).toBe(null);
  });

  it("should clear all keys and timers", () => {
    const key1 = "testKey1";
    const data1 = "testData1";
    const key2 = "testKey2";
    const data2 = "testData2";
    const cacheModule = new CacheModule(new Map(), "testModule");
    cacheModule.setKey(key1, data1);
    cacheModule.setKey(key2, data2);
    expect(cacheModule.getKey(key1)).toBe("testData1");
    expect(cacheModule.getKey(key2)).toBe("testData2");

    cacheModule.clear();
    expect(cacheModule.getKey(key1)).toBe(null);
    expect(cacheModule.getKey(key2)).toBe(null);
  });

  it("should clear all timers", () => {
    const cacheModule = new CacheModule(new Map(), "testModule");

    // set a fake timer using setTimeout
    const timer = setTimeout(() => {});
    cacheModule.timers.set("testTimer", timer);

    // spy on clearTimeout
    const spy = jest.spyOn(global, "clearTimeout");

    cacheModule.clear();

    // check if clearTimeout was called
    expect(spy).toHaveBeenCalledWith(timer);

    // restore the original clearTimeout
    spy.mockRestore();
  });

  it("should return an error if no modules are found", () => {
    const cacheModule = new CacheModule(new Map(), "testModule");
    cacheModule.clear();
    expect(cacheModule.clear()).toEqual(new Error("No modules found"));
  });

  it("should set a timer for a key if expiration time is provided when setting a new key", () => {
    jest.useFakeTimers();
    const key = "testKey";
    const data = "testData";
    const expirationTime = 1000;
    const cb = jest.fn();
    const cacheModule = new CacheModule(new Map(), "testModule");

    cacheModule.setKey(key, data, expirationTime, cb);
    jest.advanceTimersByTime(expirationTime);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cacheModule.getKey(key)).toBe(null);
  });

  it("should not set a timer if the data has not changed", () => {
    jest.useFakeTimers();
    const key = "testKey";
    const data = "testData";
    const expirationTime = 1000;
    const cb = jest.fn();
    const cacheModule = new CacheModule(new Map(), "testModule");

    cacheModule.setKey(key, data, expirationTime);
    cacheModule.setKey(key, data, expirationTime, cb);

    jest.advanceTimersByTime(expirationTime + 1);

    expect(cb).not.toHaveBeenCalled();
    expect(cacheModule.getKey(key)).toBe(null);
  });
});
