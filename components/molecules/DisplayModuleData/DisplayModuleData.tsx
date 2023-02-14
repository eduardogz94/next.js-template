import { IMemoryCard } from "components/organism/MemoryModuleCard";

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

export default DisplayModuleData;
