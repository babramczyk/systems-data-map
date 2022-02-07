import { SAMPLE_DATA } from "./sample-data";

export type System = typeof SAMPLE_DATA[number];
// TODO: Make this more explicit, with this assumption?
export type SystemType = System["system_type"];
export type DataUseKey = typeof DATA_USES[number]["privacy_key"];
export type DataCategoryKey = typeof DATA_CATEGORIES[number]["privacy_key"];
