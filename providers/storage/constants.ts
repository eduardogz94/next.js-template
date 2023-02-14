/* eslint-disable no-unused-vars */
export enum CACHE_STORAGES_ENUM {
  local = "local",
  context = "memory",
}

export const CACHE_STORAGES = {
  localStorage: {
    type: CACHE_STORAGES_ENUM.local,
    enabled: false,
  },
  context: {
    type: CACHE_STORAGES_ENUM.context,
    enabled: true,
  },
};

export const CACHE_PROVIDERS_ENABLED = Object.values(CACHE_STORAGES)
  .filter((cache) => cache.enabled)
  .map((cache) => cache.type);
