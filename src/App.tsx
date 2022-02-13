import { useState } from "react";
import "./App.css";
import { MultiSelect } from "./components/MultiSelect/MultiSelect";
import { SystemGrid } from "./components/SystemGrid/SystemGrid";
import { DataCategoryKey, DATA_CATEGORIES } from "./constants/data-categories";
import { DataUseKey, DATA_USES } from "./constants/data-uses";
import Logo from "./logo.svg";

export type LayoutMode = "bySystemType" | "byDataUse";

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("bySystemType");
  const [dataUseFilters, setDataUseFilters] = useState<DataUseKey[]>([]);
  const [dataCategoryFilters, setDataCategoryFilters] = useState<
    DataCategoryKey[]
  >([]);

  return (
    <div className="App">
      <header className="filters-and-layout">
        <img src={Logo} alt="" className="logo" />
        <fieldset className="layout-mode">
          <legend className="layout-mode__title">Layout mode</legend>
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
              className="layout-mode__input"
            />
            System type grid
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
              className="layout-mode__input"
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

      <SystemGrid
        layoutMode={layoutMode}
        dataUseFilters={dataUseFilters}
        dataCategoryFilters={dataCategoryFilters}
      />
    </div>
  );
}

export default App;
