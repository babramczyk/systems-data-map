import { useState } from "react";
import "./App.css";
import { MultiSelect } from "./components/MultiSelect/MultiSelect";
import { DATA_CATEGORIES } from "./constants/data-categories";
import { DATA_USES } from "./constants/data-uses";
import { SAMPLE_DATA } from "./constants/sample-data";
import {
  DataCategoryKey,
  DataUseKey,
  System,
  SystemType,
} from "./constants/typings";

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
  const [dataUseFilters, setDataUseFilters] = useState<DataUseKey[]>([]);
  const [dataCategoryFilters, setDataCategoryFilters] = useState<
    DataCategoryKey[]
  >([]);

  return (
    <div className="App">
      <header className="filters-and-layout">
        <MultiSelect
          options={DATA_USES}
          onChange={(dataUses) => setDataUseFilters(dataUses)}
          getOptionValue={({ privacy_key }) => privacy_key}
          getOptionDisplayValue={({ name }) => name}
          getOptionDescription={({ description }) => description}
          id="data-use-filter"
          label="Filter by data uses"
        />
        {/* TODO: You're better than this... */}
        <br />
        <MultiSelect
          options={DATA_CATEGORIES}
          onChange={(dataCategories) => setDataCategoryFilters(dataCategories)}
          getOptionValue={({ privacy_key }) => privacy_key}
          getOptionDisplayValue={({ name }) => name}
          getOptionDescription={({ description }) => description}
          id="data-category-filter"
          label="Filter by data categories"
        />

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
                // TODO: See if we can combine some of the filtering logic here into something more abstract

                if (dataUseFilters.length) {
                  const dataUses = system.privacy_declarations.map(
                    ({ data_use }) => data_use
                  );
                  // TODO: Highlight the data categories that match the filtered data uses, and "gray out" the ones that don't. Maybe find a way to show which data use(s) the highlighted data categories match
                  // TODO: Consider a more efficient way of accomplishing this (currently it's O(mn)). e.g. maybe we can do some of this work up front / in the background when the app originally loads, so that by the time the user is interacting, this filtering is more seamless
                  // TODO: Consider using the `parent` fields in our data uses to determine if a filter matches (instead of cruedly comparing the start of strings)
                  const matchesDataUsesFilters = dataUses.some((dataUse) => {
                    return dataUseFilters.some((filter) =>
                      dataUse.startsWith(filter)
                    );
                  });
                  if (!matchesDataUsesFilters) {
                    return null;
                  }
                }

                const dataCategories = new Set(
                  system.privacy_declarations.flatMap(
                    (declaration) => declaration.data_categories
                  )
                );
                if (dataCategoryFilters.length) {
                  // TODO: Highlight the data categories that match the filters, and "gray out" the ones that don't
                  // TODO: Consider a more efficient way of accomplishing this (currently it's O(mn)). e.g. maybe we can do some of this work up front / in the background when the app originally loads, so that by the time the user is interacting, this filtering is more seamless
                  // TODO: Consider using the `parent` fields in our data uses to determine if a filter matches (instead of cruedly comparing the start of strings)
                  const matchesDataCategoryFilters = Array.from(
                    dataCategories
                  ).some((dataCategory) => {
                    return dataCategoryFilters.some((filter) =>
                      dataCategory.startsWith(filter)
                    );
                  });
                  if (!matchesDataCategoryFilters) {
                    return null;
                  }
                }

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
