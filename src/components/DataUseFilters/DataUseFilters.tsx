import { DATA_USES as DATA_USES_COMPLETE } from "../../constants/data-uses";
import "./DataUseFilters.css"

export type DataUse = typeof DATA_USES_COMPLETE[number]["privacy_key"];

export function DataUseFilters({
  onChange,
}: {
  onChange: (dataUses: DataUse[]) => void;
}) {
  // TODO: Consider doing something more sophisicated here. i.e. being able to select multiple, being able to select a parent and have all children show up as well, etc.
  return (
    <>
      <label htmlFor="data-use-filter">Filter by data use</label>
      <select
        id="data-use-filter"
        multiple
        onChange={(e) =>
          onChange(
            // TODO: See if there's a way where can avoid this type casting -- we know it'll be a `DataUse` based on the <option>s we render below, but TypeScript's JSX compiler isn't smart enough to piece that together
            Array.from(e.target.selectedOptions).map(
              ({ value }) => value
            ) as DataUse[]
          )
        }
      >
        {/* TODO: Add instructions / tooltip instructing how to select multiple on the user's OS. Or, change this to be more useful and visually meaningful (probably by using checkboxes) */}
        <option value="" className="empty-filter-option">
          Select one or more options...
        </option>
        {/* TODO: If we stick with a <select>, consider using <optgroup>s to visually separate / group options together, i.e. based on their oldest ancestor */}
        {DATA_USES_COMPLETE.map((dataUse) => (
          <option
            key={dataUse.privacy_key}
            value={dataUse.privacy_key}
            // TODO: Consider pulling in something like Reach UI's tooltip, for more responsive and visually appealing tooltips here
            title={dataUse.description}
          >
            {dataUse.name}
          </option>
        ))}
      </select>
    </>
  );
}
