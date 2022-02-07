import { dataCategoriesByPrivacyKey } from "../../constants/data-categories";
import { DataCategoryKey, DataUseKey, System } from "../../constants/typings";
import "./SystemCard.css";

export function SystemCard({
  system,
  highlightedDataUse,
}: {
  system: System;
  highlightedDataUse?: DataUseKey;
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
    <div className="system-card" key={system.fides_key}>
      <header className="system-card__header">{system.name}</header>
      <ul>
        {Object.keys(dataCategories)
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
                {/* TODO: Clean this up visually */}
                <p>{dataCategoriesByPrivacyKey[category].name}</p>
                <p>{category.split(".").slice(-1)[0]}</p>
              </li>
            );
          })}
      </ul>
      {/* TODO: Show more data here, intelligently (maybe hidden at first) */}
    </div>
  );
}
