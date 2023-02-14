import React, { createContext, useContext, useMemo } from "react";

import { CACHE_PROVIDERS_ENABLED } from "./storage/constants";
import { useContextStorage, useLocalStorage } from "./storage/hooks";
import { ICacheContext, ICacheProviderProps } from "./storage/interfaces";

const CacheContext = createContext<ICacheContext>(
  CACHE_PROVIDERS_ENABLED.reduce(
    (prev, current) => ({ ...prev, [current]: {} }),
    {}
  )
);

export const useCache = (type: string) => useContext(CacheContext)[type];

const CacheProvider = ({ children }: ICacheProviderProps) => {
  // This should also be dynamic, in case we want to add more storages in the future (e.g. sessionStorage)
  const contextStorage = useContextStorage();
  const localStorage = useLocalStorage();

  const storages = useMemo(
    () =>
      [contextStorage, localStorage].filter((storage) => {
        return CACHE_PROVIDERS_ENABLED.includes(storage.type);
      }),
    [contextStorage, localStorage]
  );

  // Returning value dynamically based on "enabled" property in the storages
  const cache: ICacheContext = useMemo(() => {
    return storages.reduce((prev, current) => {
      const { type, ...rest } = current;
      return {
        ...prev,
        [type]: rest,
      };
    }, {});
  }, [storages]);

  return (
    <CacheContext.Provider value={cache}>{children}</CacheContext.Provider>
  );
};

export default CacheProvider;
