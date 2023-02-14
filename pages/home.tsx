import type { NextPage } from "next";

import { useCache } from "../providers/CacheProvider";
import { CACHE_STORAGES_ENUM } from "../providers/storage/constants";
import { useState } from "react";
import MemoryModuleCard from "../components/organism/MemoryModuleCard/MemoryModuleCard";

const Home: NextPage = () => {
  const memory = useCache(CACHE_STORAGES_ENUM.context);
  const [newModuleKey, setNewModuleKey] = useState("");
  return (
    <>
      <main className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]"> Storage Modules</span>
        </h1>
        <div className="flex-rows container flex items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <input
              type="text"
              value={newModuleKey}
              onChange={(e) => setNewModuleKey(e.target.value)}
              placeholder="Module Key"
              className="mr-4 w-full rounded-lg bg-gray-200 px-4 py-2"
            />
          </div>
          <button
            className="rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 text-lg font-semibold text-white shadow-lg hover:bg-[hsl(280,100%,60%)]"
            onClick={() => {
              if (newModuleKey.length > 1) {
                memory.createCacheModule(newModuleKey);
              }
            }}
          >
            Add Module To Context
          </button>
          <button
            className="rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 text-lg font-semibold text-white shadow-lg hover:bg-[hsl(280,100%,60%)]"
            onClick={() => memory.clearCacheModules()}
          >
            Clear Modules
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from(memory.getModules().entries()).map(([key, module]) => (
            <MemoryModuleCard
              key={key}
              module={module}
              onRemove={() => memory.deleteCacheModule(key)}
            />
          ))}
        </div>
      </main>
    </>
  );
};

Home.getInitialProps = ({ query }: { query: unknown }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query
    )}`,
  };
};

export default Home;
