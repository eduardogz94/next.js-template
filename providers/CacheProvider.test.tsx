import React from "react";
import { render, screen } from "@testing-library/react";

import CacheProvider, { useCache } from "./CacheProvider";
import { CACHE_STORAGES, CACHE_STORAGES_ENUM } from "./storage/constants";

describe("CacheProvider", () => {
  beforeEach(() => {
    CACHE_STORAGES.localStorage.enabled = false;
    CACHE_STORAGES.context.enabled = false;
  });

  it("should render the children", () => {
    const Child = () => <div>Child</div>;
    render(
      <CacheProvider>
        <Child />
      </CacheProvider>
    );
  });

  it("should provide the cache context", () => {
    const Child = () => {
      const cache = useCache(CACHE_STORAGES_ENUM.context);
      return <div>{JSON.stringify(cache)}</div>;
    };

    render(
      <CacheProvider>
        <Child />
      </CacheProvider>
    );
  });

  it("should provide the cache local", () => {
    const Child = () => {
      const cache = useCache(CACHE_STORAGES_ENUM.local);
      return <div>{JSON.stringify(cache)}</div>;
    };

    render(
      <CacheProvider>
        <Child />
      </CacheProvider>
    );

    expect(screen.queryByText(/{}/)).toBeNull();
  });
});
