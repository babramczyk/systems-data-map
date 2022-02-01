import "./MultiSelect.css";

export function MultiSelect<Option>({
  options,
  onChange,
  getOptionValue,
  getOptionDisplayValue,
  getOptionDescription,
  id,
  label,
}: {
  options: Option[];
  onChange: (selectedOptions: string[]) => void;
  getOptionValue: (option: Option) => string;
  getOptionDisplayValue: (option: Option) => string;
  getOptionDescription: (option: Option) => string;
  id: string;
  label: string;
}) {
  // TODO: Consider doing something more sophisicated here. i.e. being able to select multiple, being able to select a parent and have all children show up as well, etc.
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        multiple
        onChange={(e) =>
          onChange(
            Array.from(e.target.selectedOptions).map(({ value }) => value)
          )
        }
      >
        {/* TODO: Add instructions / tooltip instructing how to select multiple on the user's OS. Or, change this to be more useful and visually meaningful (probably by using checkboxes) */}
        <option value="" className="empty-filter-option">
          Select one or more options...
        </option>
        {/* TODO: If we stick with a <select>, consider using <optgroup>s to visually separate / group options together */}
        {options.map((option) => (
          <option
            key={getOptionValue(option)}
            value={getOptionValue(option)}
            // TODO: Consider pulling in something like Reach UI's tooltip, for more responsive and visually appealing tooltips here
            title={getOptionDescription(option)}
          >
            {getOptionDisplayValue(option)}
          </option>
        ))}
      </select>
    </>
  );
}
