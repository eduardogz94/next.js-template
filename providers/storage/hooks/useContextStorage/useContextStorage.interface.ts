import { ICacheData } from "providers/storage/interfaces";
import { CACHE_STORAGES_ENUM } from "providers/storage/constants";
import CacheModule from "providers/storage/components/CacheModule";

export type useContextStorageType = {
  type: typeof CACHE_STORAGES_ENUM.context;
  getCacheModule: (_key: keyof ICacheData) => {
    error: Error | null;
    module: Map<keyof ICacheData, CacheModule> | null;
  };
  getModules: () => Map<keyof ICacheData, CacheModule>;
  getModuleValue(
    _key: keyof ICacheData
  ): Map<keyof ICacheData, CacheModule> | Error;
  createCacheModule(
    _key: keyof ICacheData
  ): Map<keyof ICacheData, CacheModule> | Error;
  updateModule: (_key: keyof ICacheData, _cb: any) => CacheModule | Error;
  getModuleSize: (_key: keyof ICacheData) => number;
  clearCacheModules(): void;
  deleteCacheModule(
    _key: keyof ICacheData
  ): Map<keyof ICacheData, CacheModule> | Error;
};
