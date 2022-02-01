import { useState } from "react";
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
  const [layoutMode, setLayoutMode] = useState<"bySystemType" | "byDataUse">(
    "bySystemType"
  );
  return (
    <div className="App">
      <header className="filters-and-layout">
        <fieldset>
          <legend>Layout mode</legend>
          <label>
            <input
              type="radio"
              name="layout-mode"
              id="by-system-type"
              onChange={(e) => {
                if (e.target.checked) {
                  setLayoutMode("bySystemType");
                }
              }}
            />
            Group by system type
          </label>
          <label>
            <input
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setLayoutMode("byDataUse");
                }
              }}
              name="layout-mode"
              id="by-data-use"
            />
            Group by data use
          </label>
        </fieldset>
      </header>

      <div className="systems-grid">
        {/* TODO: Clarify if the types should be shown in any particular order */}
        {Object.keys(systemsByType).map((systemType) => {
          return (
            <div className="systems-list" key={systemType}>
              <h2>{systemType}</h2>
              {systemsByType[systemType].map((system) => {
                const dataCategories = new Set(
                  system.privacy_declarations.flatMap(
                    (declaration) => declaration.data_categories
                  )
                );
                return (
                  // TODO: See if we can actually use `fides_key` as a unique identifier
                  <div className="system-card" key={system.fides_key}>
                    <header className="system-card__header">
                      {system.name}
                    </header>
                    <ul>
                      {Array.from(dataCategories).map((category) => {
                        return (
                          <li key={category}>
                            {category.split(".").slice(-1)[0]}
                          </li>
                        );
                      })}
                    </ul>
                    {/* TODO: Show more data here, intelligently (maybe hidden at first) */}
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
