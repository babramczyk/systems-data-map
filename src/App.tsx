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

  // TODO: Does it make sense to group together Applications and Services?

  return {
    ...systemsByType,
    [system.system_type]: [...existingSystemsForType, system],
  };
}, {});

function App() {
  return (
    <div className="App">
      <div className="systems-grid">
        {/* TODO: Clarify if the types should be shown in any particular order */}
        {Object.keys(systemsByType).map((systemType) => {
          return (
            <div className="systems-list">
              <h2>{systemType}</h2>
              {systemsByType[systemType].map((system) => {
                const dataCategories = new Set(
                  system.privacy_declarations.flatMap(
                    (declaration) => declaration.data_categories
                  )
                );
                return (
                  <div className="system-card">
                    <header className="system-card__header">
                      {system.name}
                    </header>
                    <ul>
                      {/* // TODO: See if we need to handle having two different nested category names, that have different hierarchies / ancestors? In that case, it's going to look here like we have a duplicate */}
                      {Array.from(dataCategories).map((category) => {
                        return <li>{category.split(".").slice(-1)[0]}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
