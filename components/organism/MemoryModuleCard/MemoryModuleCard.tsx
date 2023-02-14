import CacheModule from "../../../providers/storage/components/CacheModule";
import { useState } from "react";

export interface IMemoryCard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  module: CacheModule | any;
  onRemove: () => void;
}

const DisplayModuleData: React.FC<IMemoryCard["module"]> = ({ module }) => {
  return (
    <table className="mt-4 w-full text-gray-700">
      <tbody>
        {Object.entries(module).map(([key, value]) => (
          <tr key={key}>
            <td className="pr-2 font-bold">{key}:</td>
            <td>
              {typeof value === "string" || typeof value === "number" ? (
                value
              ) : Array.isArray(value) || value instanceof Map ? (
                <ul>
                  {Array.from(value).map(([mapKey, mapValue]) => (
                    <li key={mapKey}>
                      {mapKey}: {mapValue}
                    </li>
                  ))}
                </ul>
              ) : (
                JSON.stringify(value)
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MemoryModuleCard: React.FC<IMemoryCard> = ({ module, onRemove }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputKey, setInputKey] = useState("");

  return (
    <div className="mt-2 mb-2 ml-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 w-full text-center align-middle text-2xl font-bold">
        {module.module} Module
      </h2>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex w-full">
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => onRemove()}
          >
            Delete Module
          </button>
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => {
              module?.clear();
            }}
          >
            Clear Module Cache
          </button>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex w-full">
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => {
              if (inputValue.length > 1) {
                module?.setKey(inputKey, inputValue, 10000);
                setInputValue("");
              }
            }}
          >
            Add Inputs to Cache
          </button>
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => {
              const data = module?.getKey(inputKey);
              if (data) {
                setInputValue(data);
              }
            }}
          >
            Get Input Key Cache
          </button>
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => module?.removeKey(inputKey)}
          >
            Remove Input Key Cache
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={inputKey}
          onChange={(e) => {
            setInputKey(e.target.value);
            setInputValue("");
          }}
          className="mr-2 w-full rounded-lg bg-gray-200 px-4 py-2"
          placeholder="Cache Key"
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mr-2 w-full rounded-lg bg-gray-200 px-4 py-2"
          placeholder="Cache value"
        />
      </div>
      <DisplayModuleData module={module} />
    </div>
  );
};

export default MemoryModuleCard;
