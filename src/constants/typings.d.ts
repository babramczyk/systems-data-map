import { DATA_CATEGORIES } from "./data-categories";
import { DATA_USES } from "./data-uses";
import { SAMPLE_DATA } from "./sample-data";

export type System = typeof SAMPLE_DATA[number];
// TODO: Make this more explicit, with this assumption?
// TODO: Put this on a namespace? (i.e. `System.Type`)
// TODO: Maybe move these to their own constants file (i.e. where they have their data defined)
export type SystemType = System["system_type"];
export type SystemKey = System["fides_key"];
export type DataUse = typeof DATA_USES[number];
export type DataUseKey = DataUse["privacy_key"];
export type DataCategory = typeof DATA_CATEGORIES[number];
export type DataCategoryKey = DataCategory["privacy_key"];
