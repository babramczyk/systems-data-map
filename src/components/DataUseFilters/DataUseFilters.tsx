import { DATA_USES as DATA_USES_COMPLETE } from "../../constants/data-uses";

export const dataUses = DATA_USES_COMPLETE.map(
  ({ privacy_key }) => privacy_key
);
export type DataUse = typeof dataUses[number];

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
        // TODO: See if there's a way where can avoid this type casting -- we know it'll be a `DataUse` based on the <option>s we render below, but TypeScript's JSX compiler isn't smart enough to piece that together
        onChange={(e) => onChange([e.target.value as DataUse])}
      >
        <option value="">Select one...</option>
        {dataUses.map((dataUse) => (
          <option key={dataUse} value={dataUse}>
            {dataUse}
          </option>
        ))}
      </select>
    </>
  );
}
