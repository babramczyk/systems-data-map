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
      <ul className="system-card__category-list">
        {Object.keys(dataCategories).length ? (
          Object.keys(dataCategories)
            // Sort "unhighlighted" data uses to the bottom
            .sort((catA) => (dataCategories[catA] ? -1 : 1))
            .map((category) => {
              const isHighlighted = dataCategories[category];
              // TODO: This highlighted prop and logic was for when I used to show the unhighlighted cards. But that needed more work, and this was an easy way to make the "Data Use" layout mode more useful. This highlighting styling should either be iterated on, or removed in the code
              if (!isHighlighted) return null;
              return (
                <li
                  key={category}
                  // TODO: At a certain point, bring in the classnames npm package?
                  className={`system-card__data-category ${
                    isHighlighted
                      ? "system-card__data-category--highlighted"
                      : ""
                  }`}
                >
                  <p>
                    {dataCategoriesByPrivacyKey[category].name}
                    <code
                      className="system-card__category-code"
                      // TODO: Use a better tooltip than `title` here, i.e. a Reach UI tooltip
                      title={category}
                    >
                      {category.split(".").slice(-1)[0]}
                    </code>
                  </p>
                  {/* TODO: Show this in some way. i.e. a tooltip that shows it on hover, or show this `code` block and make it a bit more subtle */}
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
