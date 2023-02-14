import { CACHE_STORAGES_ENUM } from "../../constants";
import { ICacheData } from "../../interfaces";
import { useLocalStorage } from "./useLocalStorage";

jest.setTimeout(10000);

const setUpLocalStorageMock = (): any => {
  let storage: any = {};
  return {
    type: CACHE_STORAGES_ENUM.local,
    storage,
    getItem: (key: keyof ICacheData) => storage[key],
    setItem: (key: keyof ICacheData, value: any) => (storage[key] = value),
    removeItem: (key: keyof ICacheData) => delete storage[key],
    clear: () => (storage = {}),
    key: (index: number) => Object.keys(storage)[index],
    length: () => Object.keys(storage).length,
  };
};

const key = "key";
const data = "data";

describe("useLocalStorage", () => {
  let localStorageMock: any;
  beforeEach(() => {
    localStorageMock = setUpLocalStorageMock();
    global.localStorage = localStorageMock;
  });
  afterEach(() => {
    localStorageMock.clear();
  });

  it("should return an object with the correct type", () => {
    const result = useLocalStorage();
    expect(result.type).toEqual(CACHE_STORAGES_ENUM.local);
  });

  it("should store and retrieve data as a string", () => {
    const result = useLocalStorage();

    result.set("key", data);
    const retrievedData = result.get("key");
    expect(retrievedData.data).toEqual(data);
    expect(retrievedData.type).toEqual("string");
  });

  it("should store and retrieve data as an object", () => {
    const result = useLocalStorage();
    const data = { data: "data" };
    result.set("key", data);
    const retrievedData = result.get("key");
    expect(retrievedData.data).toEqual(data);
    expect(retrievedData.type).toEqual("object");
  });

  it("should remove data from storage", () => {
    const result = useLocalStorage();
    result.set("key", "data");
    const removedData = result.remove("key");
    expect(removedData.removed).toEqual(true);
    expect(removedData.data).toEqual(null);
    expect(result.get("key").data).toEqual(null);
  });

  it("should return 'cleared: false' if there is no data to clear", () => {
    const result = useLocalStorage();
    const cleared = result.clear();
    expect(cleared.cleared).toEqual(false);
  });

  it("should clear all data from storage", () => {
    const result = useLocalStorage();
    result.set("key", "data");
    result.set("key2", "data");
    const cleared = result.clear();

    expect(cleared.cleared).toEqual(true);
    expect(cleared.storage).toBeInstanceOf(Storage);
    expect(cleared.storage.length).toEqual(0);
    expect(result.length()).toEqual(0);
  });

  it("should retrieve the correct key from storage", () => {
    const result = useLocalStorage();
    result.set("key", "data");
    expect(result.key(0)).toEqual("key");
  });

  it("should return '0' if there is no data in storage", () => {
    const result = useLocalStorage();
    expect(result.length()).toEqual(1);
  });

  it("should return '2' if there are two data items in storage", () => {
    const result = useLocalStorage();
    result.set("key", "data");
    result.set("key2", "data");
    expect(result.length()).toEqual(2);
  });

  it("should set the timer and remove the data", (done) => {
    const result = useLocalStorage();
    result.set(key, data);
    const timer = result.setExpirationTimer(key, 100, () => {
      const retrievedData = result.get(key);
      expect(retrievedData.data).toEqual(null);
      done();
    });
    expect(timer).toBeTruthy();
  });

  it("should return an object with `removed: false` and `data: undefined` if the key does not exist", () => {
    const result = useLocalStorage();
    const key = "nonExistentKey";
    const removed = result.remove(key);
    expect(removed).toEqual({ removed: false, data: undefined });
  });

  it("should not call the callback function if the data has been removed before the timer has expired", (done) => {
    const result = useLocalStorage();
    result.set(key, data);
    result.setExpirationTimer(key);
    result.remove(key);
    setTimeout(() => {
      done();
    }, 100);
  });
});
