import { useState } from "react";
import "./App.css";
import { MultiSelect } from "./components/MultiSelect/MultiSelect";
import { SystemCard } from "./components/SystemCard/SystemCard";
import { DATA_CATEGORIES } from "./constants/data-categories";
import { dataUsesByPrivacyKey, DATA_USES } from "./constants/data-uses";
import { SAMPLE_DATA } from "./constants/sample-data";
import {
  DataCategoryKey,
  DataUseKey,
  System,
  SystemKey,
  SystemType,
} from "./constants/typings";
import { ArcherContainer, ArcherElement } from "react-archer";
import { stringToHexColor } from "./utils/stringToHexColor";

// TODO: These are here for now, so we don't do this calculation on every render. If we want the app to be dynamic (i.e. you can add systems after the app has loaded), we would have to put this inside the `App` component itself, with an eye on performance implications
// TODO: Do we need / want to sort our systems in each list in any special or more useful way?

const systemsByType = SAMPLE_DATA.reduce<
  Record<SystemType, Record<SystemKey, System>>
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
  Record<SystemType, Record<SystemKey, System>>
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
      </header>

      {/* TODO: Do we need to consider dependencies not perfectly matching up right to left? At the very least, we probably want to make sure that we're not relying on the order in which our data is listed / the given system types are listed */}
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

                      // TODO: Handle when a system has no privacy declarations? It looks a bit weird to have an empty card. Maybe good enough to just put some "No privacy declarations" text in there...
                      // TODO: Devise a system in which the end point of arrows don't overlap all at the same place. i.e. carve out a spot for each dependencies on the target box/system, so that arrow heads show up at different points on the box
                      return (
                        <ArcherElement
                          key={system.fides_key}
                          id={system.fides_key}
                          relations={system.system_dependencies.map((dep) => ({
                            targetId: dep,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: {
                              strokeColor: stringToHexColor(dep),
                            },
                            // TODO: Remove (for debugging purposes)
                            // label: (
                            //   <div style={{ color: "limegreen" }}>
                            //     {`Source: ${system.fides_key}; Dep: ${dep}`}
                            //   </div>
                            // ),
                          }))}
                        >
                          <div>
                            <SystemCard system={system} />
                          </div>
                        </ArcherElement>
                      );
                    })}
                  </div>
                );
              })
            : Object.keys(systemsByDataUse).map((dataUse) => {
                return (
                  <div key={dataUse}>
                    <header className="system-list__header">
                      <h2 className="system-list__heading">
                        {dataUsesByPrivacyKey[dataUse].name}
                      </h2>
                      <p className="system-list__subheading">{dataUse}</p>
                    </header>
                    {Object.values(systemsByDataUse[dataUse]).map((system) => {
                      return (
                        // {
                        //   targetId: string,
                        //   targetAnchor: 'top' | 'bottom' | 'left' | 'right' | 'middle',
                        //   sourceAnchor: 'top' | 'bottom' | 'left' | 'right' | 'middle',
                        //   label: React.Node,
                        //   order?: number, // higher order means arrow will be drawn on top of the others
                        //   style: ArcherStyle,
                        // }

                        // TODO: Fix a problem here where we're not showing some because they have no usages. *Maybe we don't even show relationships in this case?*
                        // <ArcherElement
                        //   id={system.fides_key}
                        //   relations={system.system_dependencies.map((dep) => ({
                        //     targetId: dep,
                        //     targetAnchor: "middle",
                        //     sourceAnchor: "middle",
                        //     label: (
                        //       <div style={{ color: "limegreen" }}>
                        //         {`Source: ${system.fides_key}; Dep: ${dep}`}
                        //       </div>
                        //     ),
                        //   }))}
                        // >
                        <div>
                          <SystemCard
                            system={system}
                            highlightedDataUse={dataUse}
                            key={system.fides_key}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
        </div>
      </ArcherContainer>
    </div>
  );
}

export default App;
