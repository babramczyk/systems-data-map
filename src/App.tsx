import "./App.css";
import SAMPLE_DATA from "./sample-data.json";

// TODO: Move these to a separate file?
type System = typeof SAMPLE_DATA[number];
// TODO: Make this more explicit, with this assumption?
type SystemType = System["system_type"];

// TODO: This is here for now, so we don't do this calculation on every render. If we want the app to be dynamic (i.e. you can add systems after the app has loaded), we would have to put this inside the `App` component itself, with an eye on performance implications
// TODO: Refactor this. It's extremely ugly and I hate it
const systemsByType: Record<SystemType, System[]> = SAMPLE_DATA.reduce<
  Record<SystemType, System[]>
>((systemsByType, system) => {
  const existingSystemsForType: System[] =
    systemsByType[system.system_type] ?? [];

  // TODO: Consider a more performant way of removing dupes?
  const isDupe = existingSystemsForType.some(
    (currSystem) =>
      // TODO: I need to clarify this, but I'm not actually sure what the `fides_key` is, and if we can use it as a defacto primary key. For now, we're just playing it safe and comparing that and the `name` for uniqueness
      currSystem.fides_key === system.fides_key &&
      currSystem.name === system.name
  );
  if (isDupe) {
    return systemsByType;
  }

  return {
    ...systemsByType,
    [system.system_type]: [...existingSystemsForType, system],
  };
}, {});

function App() {
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
