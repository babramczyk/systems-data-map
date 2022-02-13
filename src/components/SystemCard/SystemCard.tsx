import {
  dataCategoriesByPrivacyKey,
  DataCategoryKey,
} from "../../constants/data-categories";
import { DataUseKey } from "../../constants/data-uses";
import { System } from "../../constants/systems";
import "./SystemCard.css";

export function SystemCard({
  system,
  highlightedDataUse,
  deemphasized,
}: {
  system: System;
  highlightedDataUse?: DataUseKey;
  deemphasized?: boolean;
}) {
  const dataCategories = system.privacy_declarations.reduce<
    Record<DataCategoryKey, boolean>
  >((dataCategories, declaration) => {
    declaration.data_categories.forEach((category) => {
      dataCategories[category] ||= highlightedDataUse
        ? declaration.data_use === highlightedDataUse
        : true;
    });
    return dataCategories;
  }, {});

  return (
    <div
      className={`system-card ${
        deemphasized ? "system-card__deemphasized" : ""
      }`}
      key={system.fides_key}
    >
      <header className="system-card__header">
        <h3 className="system-card__heading">{system.name}</h3>
      </header>
      <ul>
        {Object.keys(dataCategories).length ? (
          Object.keys(dataCategories)
            // Sort "unhighlighted" data uses to the bottom
            .sort((catA) => (dataCategories[catA] ? -1 : 1))
            .map((category) => {
              const isHighlighted = dataCategories[category];
              return (
                <li
                  key={category}
                  // TODO: At a certain point, bring in the classnames npm package?
                  className={
                    isHighlighted
                      ? "system-card__data-category--highlighted"
                      : "system-card__data-category"
                  }
                >
                  <p>{dataCategoriesByPrivacyKey[category].name}</p>
                  {/* TODO: Show this in some way. i.e. a tooltip that shows it on hover, or show this `code` block and make it a bit more subtle */}
                  {/* <code>{category.split(".").slice(-1)[0]}</code> */}
                </li>
              );
            })
        ) : (
          <p>
            <em>No data collected</em>
          </p>
        )}
      </ul>
    </div>
  );
}
