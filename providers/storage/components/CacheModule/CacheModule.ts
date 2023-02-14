import { isEqual } from "lodash";

import { ICacheData } from "../../interfaces";

const DEFAULT_TIMER = 3600000; // 1 hour

export interface ICacheModule {
  modules: Map<keyof ICacheData, Map<keyof ICacheData, CacheModule> | any>;
  module: keyof ICacheData;
  timers: Map<keyof ICacheData, ReturnType<typeof setTimeout>>;
}

export default class CacheModule implements ICacheModule {
  modules: ICacheModule["modules"];
  module: ICacheModule["module"] = "";
  timers: ICacheModule["timers"];

  constructor(
    modules: ICacheModule["modules"],
    module: ICacheModule["module"] = ""
  ) {
    if (!(modules instanceof Map)) {
      throw new Error("modules should be an instance of Map");
    }

    this.modules = modules;
    this.module = module;
    this.timers = new Map();
  }

  getKey(key: keyof ICacheData) {
    if (this.modules.size < 1) {
      return null;
    }
    return this.modules.get(key);
  }

  setKey(
    key: keyof ICacheData,
    data: any,
    expirationTime?: number,
    expirationCb?: () => void
  ) {
    if (!data) {
      return new Error("Data is required");
    }

    const existingData = this.getKey(key);
    if (isEqual(existingData, data)) {
      return existingData;
    }

    const timerKey = this.timers.get(key);
    if (timerKey) {
      clearTimeout(timerKey);
      this.timers.delete(key);
    }

    this.modules.set(key, data);

    if (expirationTime) {
      this.setExpirationTimer(key, expirationTime, expirationCb);
    }

    return this.getKey(key);
  }

  removeKey(key: keyof ICacheData) {
    if (!this.getKey(key)) {
      return null;
    }

    const timerKey = this.timers.get(key);
    if (timerKey) {
      clearTimeout(timerKey);
      this.timers.delete(key);
    }

    this.modules.delete(key);
    return this.getKey(key);
  }

  clear() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();

    if (this.modules.size < 1) {
      return new Error("No modules found");
    }

    this.modules.clear();
    return this.modules;
  }

  setExpirationTimer(
    key: keyof ICacheData,
    time = DEFAULT_TIMER,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cb = () => {}
  ) {
    const timer = setTimeout(() => {
      if (this.getKey(key) !== null) {
        this.removeKey(key);
        cb();
      }
    }, time);

    this.timers.set(key, timer);
  }
}
