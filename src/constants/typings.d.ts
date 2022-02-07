import { DATA_USES } from "./data-uses";
import { SAMPLE_DATA } from "./sample-data";

export type System = typeof SAMPLE_DATA[number];
// TODO: Make this more explicit, with this assumption?
// TODO: Put this on a namespace? (i.e. `System.Type`)
export type SystemType = System["system_type"];
export type SystemKey = System["fides_key"];
export type DataUse = typeof DATA_USES[number];
export type DataUseKey = typeof DataUse["privacy_key"];
export type DataCategoryKey = typeof DATA_CATEGORIES[number]["privacy_key"];
