import { useState, useEffect } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { LayoutMode } from "../../App";
import { DataCategoryKey } from "../../constants/data-categories";
import { DataUseKey, dataUsesByPrivacyKey } from "../../constants/data-uses";
import {
  SAMPLE_DATA,
  System,
  SystemKey,
  SYSTEMS,
  SystemType,
} from "../../constants/systems";
import { stringToHexColor } from "../../utils/stringToHexColor";
import { SystemCard } from "../SystemCard/SystemCard";
import "./SystemGrid.css";

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

export function SystemGrid({
  layoutMode,
  dataUseFilters,
  dataCategoryFilters,
}: {
  layoutMode: LayoutMode;
  dataUseFilters: DataUseKey[];
  dataCategoryFilters: DataCategoryKey[];
}) {
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

  const [highlightedSystem, setHighlightedSystem] = useState<SystemKey | null>(
    null
  );

  return (
    <ArcherContainer
      lineStyle="curve"
      strokeWidth={3}
      startMarker
      endMarker={false}
      // TODO: Brief investigation into if we can do this better. And/or consider moving the cards up. They might move up on their own if we ever add in some elevation that adds shadows _and_ z-indexes
      // svgContainerStyle={{ zIndex: -1 }}
    >
      <div className="systems-grid">
        {layoutMode === "bySystemType"
          ? Object.keys(systemsByType).map((systemType) => (
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
                            strokeColor:
                              system.fides_key === highlightedSystem ||
                              dep === highlightedSystem
                                ? // If it's highlighted, show the "full" color
                                  stringToHexColor(dep)
                                : // Else, show a very muted one (i.e. with very low opacity)
                                  `${stringToHexColor(dep)}22`,
                          },
                        }))}
                    >
                      <div
                        onMouseOver={() =>
                          setHighlightedSystem(system.fides_key)
                        }
                        onMouseLeave={() => setHighlightedSystem(null)}
                      >
                        <SystemCard
                          system={system}
                          deemphasized={Boolean(
                            highlightedSystem
                              ? system.fides_key !== highlightedSystem &&
                                  !SYSTEMS[
                                    highlightedSystem
                                  ].system_dependencies.includes(
                                    system.fides_key
                                  ) &&
                                  !system.system_dependencies.includes(
                                    SYSTEMS[highlightedSystem].fides_key
                                  )
                              : false
                          )}
                        />
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
  );
}
