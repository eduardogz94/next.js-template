import { CACHE_STORAGES_ENUM } from "../../constants";
import { ICacheData } from "../../interfaces";

// TODO {WIP} also should handle cookies and session storage
export const useLocalStorage = (): any => {
  return {
    type: CACHE_STORAGES_ENUM.local,
    storage: global.localStorage,
    get(key: keyof ICacheData) {
      const data = this.storage.getItem(key);
      try {
        return {
          data: JSON.parse(data as string),
          type: "object",
        };
      } catch (error) {
        // do nothing, data will remain as a string
        return {
          data,
          type: "string",
        };
      }
    },
    set(key: keyof ICacheData, data: any) {
      if (typeof data === "object") {
        const dataToSave = JSON.stringify(data);
        this.storage.setItem(key, dataToSave);
        return {
          data: this.get(key).data,
          type: "object",
        };
      } else {
        this.storage.setItem(key, data);
        return {
          data: this.get(key).data,
          type: "string",
        };
      }
    },
    remove(key: keyof ICacheData) {
      if (!this.get(key).data)
        return {
          removed: false,
          data: undefined,
        };

      this.storage.removeItem(key);
      return {
        removed: true,
        data: this.get(key).data,
      };
    },
    clear() {
      if (this.length() === 0) return { cleared: false, storage: this.storage };
      this.storage.clear();
      return { cleared: true, storage: this.storage };
    },
    key(index: number) {
      return this.storage.key(index);
    },
    length() {
      return this.storage.length;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setExpirationTimer(key: keyof ICacheData, time = 1000, cb = () => {}) {
      return setTimeout(() => {
        if (this.get(key).data !== null) {
          this.remove(key);
          cb();
        }
      }, time);
    },
  };
};
