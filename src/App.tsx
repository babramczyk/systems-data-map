import { useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import "./App.css";
import { MultiSelect } from "./components/MultiSelect/MultiSelect";
import { SystemCard } from "./components/SystemCard/SystemCard";
import { DataCategoryKey, DATA_CATEGORIES } from "./constants/data-categories";
import {
  DataUseKey,
  dataUsesByPrivacyKey,
  DATA_USES,
} from "./constants/data-uses";
import {
  SAMPLE_DATA,
  System,
  SystemKey,
  SYSTEMS,
  SystemType,
} from "./constants/systems";
import Logo from "./logo.svg";
import { stringToHexColor } from "./utils/stringToHexColor";

// NOTE: These are here for now, so we don't do this calculation on every render. If we want the app to be dynamic (i.e. you can add systems after the app has loaded), we would have to put this inside the `App` component itself, with an eye on performance implications
// TODO: Do we need / want to sort our systems in each list in any special or more useful way?

const systemsByType = SAMPLE_DATA.reduce<
  Record<SystemType, Record<SystemKey, System>>
>(
  (systemsByType, system) => ({
    // Preserve everything that's in the map to begin with...
    ...systemsByType,
    [system.system_type]: {
      ...systemsByType[system.system_type],
      // ...and then add this current system where we want it
      [system.fides_key]: system,
    },
  }),
  {}
);

const systemsByDataUse = SAMPLE_DATA.reduce<
  Record<SystemType, Record<SystemKey, System>>
>((systemsByDataUse, system) => {
  system.privacy_declarations.forEach(({ data_use }) => {
    systemsByDataUse[data_use] = {
      ...systemsByDataUse[data_use],
      [system.fides_key]: system,
    };
  });

  return systemsByDataUse;
}, {});

function App() {
  const [layoutMode, setLayoutMode] = useState<"bySystemType" | "byDataUse">(
    "bySystemType"
  );
  const [dataUseFilters, setDataUseFilters] = useState<DataUseKey[]>([]);
  const [dataCategoryFilters, setDataCategoryFilters] = useState<
    DataCategoryKey[]
  >([]);

  // Track systems that match the filters in a map, so we can efficiently check if we're showing a system currently (useful / necessary when drawing our arrows)
  const [filteredSystems, setFilteredSystems] =
    useState<Record<System["fides_key"], System>>(SYSTEMS);
  useEffect(() => {
    // TODO: Refactor this. It's ugly in a lot of ways
    const filteredSystems = Object.values(SYSTEMS).reduce((systems, system) => {
      if (dataUseFilters.length) {
        // TODO: This logic is duplicated. We might want to make a util for it. Or, if this happens with other logic, maybe we even make a class for a System
        // TODO: Consider a more efficient way of accomplishing this (currently it's O(mn)). e.g. maybe we can do some of this work up front / in the background when the app originally loads, so that by the time the user is interacting, this filtering is more seamless
        const dataUses = system.privacy_declarations.map(
          ({ data_use }) => data_use
        );
        const matchesDataUsesFilters = dataUses.some((dataUse) =>
          dataUseFilters.some((filter) => dataUse.startsWith(filter))
        );
        if (!matchesDataUsesFilters) {
          return systems;
        }
      }

      const dataCategories = new Set(
        system.privacy_declarations.flatMap(
          (declaration) => declaration.data_categories
        )
      );
      if (dataCategoryFilters.length) {
        const matchesDataCategoryFilters = Array.from(dataCategories).some(
          (dataCategory) => {
            return dataCategoryFilters.some((filter) =>
              dataCategory.startsWith(filter)
            );
          }
        );
        if (!matchesDataCategoryFilters) {
          return systems;
        }
      }
      return { ...systems, [system.fides_key]: system };
    }, {});

    setFilteredSystems(filteredSystems);
  }, [dataUseFilters, dataCategoryFilters]);

  return (
    <div className="App">
      <header className="filters-and-layout">
        <img src={Logo} alt="" className="logo" />
        <fieldset>
          <legend>Layout mode</legend>
          <label>
            <input
              type="radio"
              name="layout-mode"
              id="by-system-type"
              defaultChecked
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
        <MultiSelect
          options={DATA_USES}
          onChange={(dataUses) => setDataUseFilters(dataUses)}
          getOptionValue={({ privacy_key }) => privacy_key}
          getOptionDisplayValue={({ name }) => name}
          getOptionDescription={({ description }) => description}
          id="data-use-filter"
          label="Filter by data uses"
        />
        <MultiSelect
          options={DATA_CATEGORIES}
          onChange={(dataCategories) => setDataCategoryFilters(dataCategories)}
          getOptionValue={({ privacy_key }) => privacy_key}
          getOptionDisplayValue={({ name }) => name}
          getOptionDescription={({ description }) => description}
          id="data-category-filter"
          label="Filter by data categories"
        />
      </header>

      <ArcherContainer
        lineStyle="curve"
        strokeWidth={3}
        startMarker
        endMarker={false}
        // TODO: Brief investigation into if we can do this better. And/or consider moving the cards up. They might move up on their own if we ever add in some elevation that adds shadows _and_ z-indexes
        svgContainerStyle={{ zIndex: -1 }}
      >
        <div className="systems-grid">
          {layoutMode === "bySystemType"
            ? /* TODO: Clarify if the types should be shown in any particular order */
              Object.keys(systemsByType).map((systemType) => (
                <div className="system-list" key={systemType}>
                  <h2>{systemType}</h2>
                  {Object.values(systemsByType[systemType])
                    .filter((system) => filteredSystems[system.fides_key])
                    .map((system) => (
                      <ArcherElement
                        key={system.fides_key}
                        id={system.fides_key}
                        relations={system.system_dependencies
                          .filter((system) => filteredSystems[system])
                          .map((dep) => ({
                            targetId: dep,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: {
                              strokeColor: stringToHexColor(dep),
                            },
                          }))}
                      >
                        <div>
                          <SystemCard system={system} />
                        </div>
                      </ArcherElement>
                    ))}
                </div>
              ))
            : Object.keys(systemsByDataUse).map((dataUse) => (
                <div key={dataUse}>
                  <header className="system-list__header">
                    <h2 className="system-list__heading">
                      {dataUsesByPrivacyKey[dataUse].name}
                    </h2>
                    <p className="system-list__subheading">{dataUse}</p>
                  </header>
                  {Object.values(systemsByDataUse[dataUse])
                    .filter((system) => filteredSystems[system.fides_key])
                    .map((system) => (
                      <div>
                        <SystemCard
                          system={system}
                          highlightedDataUse={dataUse}
                          key={system.fides_key}
                        />
                      </div>
                    ))}
                </div>
              ))}
        </div>
      </ArcherContainer>
    </div>
  );
}

export default App;
