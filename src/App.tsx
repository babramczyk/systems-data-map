import "./App.css";
import SAMPLE_DATA from "./sample-data.json";

// TODO: Move these to a separate file?
type System = typeof SAMPLE_DATA[number];
// TODO: Make this more explicit, with this assumption?
type SystemType = System["system_type"];

function App() {
  // TODO: Refactor this. It's extremely ugly and I hate it
  const systemsByType: Record<SystemType, System[]> = SAMPLE_DATA.reduce<
    Record<SystemType, System[]>
  >((systemsByType, system) => {
    const existingSystemsForType = systemsByType[system.system_type] ?? [];
    return {
      ...systemsByType,
      [system.system_type]: [...existingSystemsForType, system],
    };
  }, {});

  return (
    <div className="App">
      {Object.keys(systemsByType).map((systemType) => {
        return (
          <>
            <h2>{systemType}</h2>
            {systemsByType[systemType].map((system) => {
              return <div>{system.name}</div>;
            })}
          </>
        );
      })}
    </div>
  );
}

export default App;
