import { useState } from "react";
import "./App.css";
import { MultiSelect } from "./components/MultiSelect/MultiSelect";
import { SystemCard } from "./components/SystemCard/SystemCard";
import { DATA_CATEGORIES } from "./constants/data-categories";
import { DATA_USES } from "./constants/data-uses";
import { SAMPLE_DATA } from "./constants/sample-data";
import {
  DataCategoryKey,
  DataUseKey,
  System,
  SystemIdentifier,
  SystemType,
} from "./constants/typings";

// TODO: These are here for now, so we don't do this calculation on every render. If we want the app to be dynamic (i.e. you can add systems after the app has loaded), we would have to put this inside the `App` component itself, with an eye on performance implications
// TODO: Do we need / want to sort our systems in each list in any special or more useful way?

const systemsByType = SAMPLE_DATA.reduce<
  Record<SystemType, Record<SystemIdentifier, System>>
>((systemsByType, system) => {
  return {
    ...systemsByType,
    [system.system_type]: {
      ...systemsByType[system.system_type],
      [system.fides_key]: system,
    },
  };
}, {});

const systemsByDataUse = SAMPLE_DATA.reduce<
  Record<SystemType, Record<SystemIdentifier, System>>
>((systemsByDataUse, system) => {
  // TODO: Consider not making an extra variable for this. If we do this inline, would probably be more performant. But maybe at the cost of readability
  const dataUses = system.privacy_declarations.map(({ data_use }) => data_use);

  dataUses.forEach((dataUse) => {
    systemsByDataUse[dataUse] = {
      ...systemsByDataUse[dataUse],
      [system.fides_key]: system,
    };
  });

  return systemsByDataUse;
}, {});

console.dir(systemsByDataUse, `systemsByDataUse`);

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
        {layoutMode === "bySystemType"
          ? /* TODO: Clarify if the types should be shown in any particular order */
            Object.keys(systemsByType).map((systemType) => {
              return (
                <div className="systems-list" key={systemType}>
                  <h2>{systemType}</h2>
                  {Object.values(systemsByType[systemType]).map((system) => {
                    // TODO: See if we can combine some of the filtering logic here into something more abstract

                    if (dataUseFilters.length) {
                      // TODO: This logic is duplicated. We might want to make a util for it. Or, if this happens with other logic, maybe we even make a class for a System
                      const dataUses = system.privacy_declarations.map(
                        ({ data_use }) => data_use
                      );
                      // TODO: Highlight the data categories that match the filtered data uses, and "gray out" the ones that don't. Maybe find a way to show which data use(s) the highlighted data categories match
                      // TODO: Consider a more efficient way of accomplishing this (currently it's O(mn)). e.g. maybe we can do some of this work up front / in the background when the app originally loads, so that by the time the user is interacting, this filtering is more seamless
                      // TODO: Consider using the `parent` fields in our data uses to determine if a filter matches (instead of cruedly comparing the start of strings)
                      const matchesDataUsesFilters = dataUses.some(
                        (dataUse) => {
                          return dataUseFilters.some((filter) =>
                            dataUse.startsWith(filter)
                          );
                        }
                      );
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
                      <SystemCard system={system} key={system.fides_key} />
                    );
                  })}
                </div>
              );
            })
          : Object.keys(systemsByDataUse).map((dataUse) => {
              return (
                <div>
                  <h2>{dataUse}</h2>
                  {Object.values(systemsByDataUse[dataUse]).map((system) => {
                    return (
                      <SystemCard system={system} key={system.fides_key} />
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
