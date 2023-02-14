import { useMemo, useCallback, useState } from "react";

import { ICacheData } from "../../interfaces";
import { CACHE_STORAGES_ENUM } from "../../constants";
import CacheModule from "../../components/CacheModule";

import { useContextStorageType } from "./";

const useContextStorage = (): useContextStorageType => {
  const [cacheData, setCacheData] = useState(new Map());

  const cache = useMemo(
    () => new CacheModule(cacheData, CACHE_STORAGES_ENUM.context),
    [cacheData]
  );

  const getCacheModule = useCallback(
    (key: keyof ICacheData) => {
      const module = cache.modules.get(key);
      if (!module) {
        return {
          error: new Error(`Module with key '${key}' not found.`),
          module: null,
        };
      }
      return { error: null, module };
    },
    [cache]
  );

  const getModuleValue = useCallback(
    (key: keyof ICacheData) => {
      const { error, module } = getCacheModule(key);
      if (error) {
        throw error;
      }

      return module;
    },
    [getCacheModule]
  );

  const getModuleSize = useCallback(
    (key: keyof ICacheData) => {
      const { error, module } = getCacheModule(key);
      if (error) {
        throw error;
      }
      return module.modules.size;
    },
    [getCacheModule]
  );

  const getModules = useCallback(() => cache.modules, [cache]);

  const createCacheModule = useCallback(
    (key: keyof ICacheData) => {
      if (!cache.modules.has(key)) {
        const module = new CacheModule(new Map(), key);
        setCacheData((prevCacheData) => {
          prevCacheData.set(key, module);
          return new Map(prevCacheData);
        });

        return module;
      }

      return getCacheModule(key).module;
    },
    [cache, getCacheModule]
  );

  const updateModule = useCallback(
    (key: keyof ICacheData, cb: () => void) => {
      const { error, module } = getCacheModule(key);
      if (error) {
        throw error;
      }

      if (typeof cb !== "function") {
        throw new Error(
          `Invalid callback type. Expected function, got ${typeof cb}.`
        );
      }

      setCacheData((prevCacheData) => {
        prevCacheData.set(key, module);
        return new Map(prevCacheData);
      });

      cb();
      return module;
    },
    [getCacheModule, setCacheData]
  );

  const deleteCacheModule = useCallback(
    (key: keyof ICacheData) => {
      const { error, module } = getCacheModule(key);
      if (error) {
        throw error;
      }

      setCacheData((prevCacheData) => {
        prevCacheData.delete(key);
        return new Map(prevCacheData);
      });

      return module;
    },
    [getCacheModule]
  );

  const clearCacheModules = useCallback(() => {
    if (cache.modules.size >= 1) {
      setCacheData(new Map());
    }
  }, [cache]);

  return useMemo(() => {
    return {
      type: CACHE_STORAGES_ENUM.context,
      getCacheModule,
      getModuleValue,
      getModules,
      getModuleSize,
      createCacheModule,
      deleteCacheModule,
      clearCacheModules,
      updateModule,
    };
  }, [
    getModuleValue,
    getCacheModule,
    getModules,
    getModuleSize,
    createCacheModule,
    deleteCacheModule,
    clearCacheModules,
    updateModule,
  ]);
};

export default useContextStorage;
