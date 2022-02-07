import { System } from "../../constants/typings";

export function SystemCard({ system }: { system: System }) {
  const dataCategories = new Set(
    system.privacy_declarations.flatMap(
      (declaration) => declaration.data_categories
    )
  );

  return (
    // TODO: See if we can actually use `fides_key` as a unique identifier
    <div className="system-card" key={system.fides_key}>
      <header className="system-card__header">{system.name}</header>
      <ul>
        {Array.from(dataCategories).map((category) => {
          return <li key={category}>{category.split(".").slice(-1)[0]}</li>;
        })}
      </ul>
      {/* TODO: Show more data here, intelligently (maybe hidden at first) */}
    </div>
  );
}
