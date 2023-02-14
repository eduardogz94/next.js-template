import { useContextStorageType } from "./hooks/useContextStorage";

export type ICacheData = Record<string, unknown>;

export type ICacheContext = {
  [key: string]: useContextStorageType;
};

export type ICacheProviderProps = {
  children: React.ReactNode;
};
