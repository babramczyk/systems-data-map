export type DataUse = typeof DATA_USES[number];
export type DataUseKey = DataUse["privacy_key"];

export const DATA_USES = [
  {
    privacy_key: "provide",
    name: "Provide the capability",
    description:
      "Provide, give, or make available the product, service, application or system.",
  },
  {
    privacy_key: "provide.system",
    name: "System",
    parent_key: "provide",
    description:
      "The source system, product, service or application being provided to the user.",
  },
  {
    privacy_key: "provide.system.operations",
    name: "System Operations",
    parent_key: "provide.system",
    description:
      "Use of specified data categories to operate and protect the system in order to provide the service.",
  },
  {
    privacy_key: "provide.system.operations.support",
    name: "Operations Support",
    parent_key: "provide.system.operations",
    description:
      "Use of specified data categories to provide support for operation and protection of the system in order to provide the service.",
  },
  {
    privacy_key: "provide.system.operations.support.optimization",
    name: "Support Optimization",
    parent_key: "provide.system.operations.support",
    description:
      "Use of specified data categories to optimize and improve support operations in order to provide the service.",
  },
  {
    privacy_key: "provide.system.upgrades",
    name: "Offer Upgrades",
    parent_key: "provide.system",
    description:
      "Offer upgrades or upsales such as increased capacity for the service based on monitoring of service usage.",
  },
  {
    privacy_key: "improve",
    name: "Improve the capability",
    description: "Improve the product, service, application or system.",
  },
  {
    privacy_key: "improve.system",
    name: "System",
    parent_key: "improve",
    description:
      "The source system, product, service or application being improved.",
  },
  {
    privacy_key: "personalize",
    name: "Personalize the capability",
    description: "Personalize the product, service, application or system.",
  },
  {
    privacy_key: "personalize.system",
    name: "System",
    parent_key: "personalize",
    description:
      "The source system, product, service or application being personalized.",
  },
  {
    privacy_key: "advertising",
    name: "Advertising, Marketing or Promotion",
    description:
      "The promotion of products or services targeted to users based on the the processing of user provided data in the system.",
  },
  {
    privacy_key: "advertising.first_party",
    name: "First Party Advertising",
    parent_key: "advertising",
    description:
      "The promotion of products or services targeting users based on processing of derviced data from prior use of the system.",
  },
  {
    privacy_key: "advertising.third_party",
    name: "Third Party Advertising",
    parent_key: "advertising",
    description:
      "The promotion of products or services targeting users based on processing of specific categories of data acquired from third party sources.",
  },
  {
    privacy_key: "advertising.first_party.contextual",
    name: "First Party Contextual Advertising",
    parent_key: "advertising.first_party",
    description:
      "The promotion of products or services targeted to users based on the processing of derived data from the users prior use of the services.",
  },
  {
    privacy_key: "advertising.first_party.personalized",
    name: "First Party Personalized Advertising",
    parent_key: "advertising.first_party",
    description:
      "The targeting and changing of promotional content based on processing of specific data categories from the user.",
  },
  {
    privacy_key: "advertising.third_party.personalized",
    name: "Third Party Personalized Advertising",
    parent_key: "advertising.third_party",
    description:
      "The targeting and changing of promotional content based on processing of specific categories of user data acquired from third party sources.",
  },
  {
    privacy_key: "third_party_sharing",
    name: "Third Party Sharing",
    description:
      "The transfer of specified data categories to third parties outside of the system/application's scope.",
  },
  {
    privacy_key: "third_party_sharing.payment_processing",
    name: "Sharing for Processing Payments",
    parent_key: "third_party_sharing",
    description:
      "Sharing of specified data categories with a third party for payment processing.",
  },
  {
    privacy_key: "third_party_sharing.personalized_advertising",
    name: "Sharing for Personalized Advertising",
    parent_key: "third_party_sharing",
    description:
      "Sharing of specified data categories for the purpose of marketing/advertising/promotion.",
  },
  {
    privacy_key: "third_party_sharing.fraud_detection",
    name: "Sharing for Fraud Detection",
    parent_key: "third_party_sharing",
    description:
      "Sharing of specified data categories with a third party fo fraud prevention/detection.",
  },
  {
    privacy_key: "third_party_sharing.legal_obligation",
    name: "Sharing for Legal Obligation",
    parent_key: "third_party_sharing",
    description:
      "Sharing of data for legal obligations, including contracts, applicable laws or regulations.",
  },
  {
    privacy_key: "collect",
    name: "Collect",
    description:
      "Collecting and storing data in order to use it for another purpose such as data training for ML.",
  },
  {
    privacy_key: "train_ai_system",
    name: "Train AI System",
    description:
      "Training an AI system. Please note when this data use is specified, the method and degree to which a user may be directly identified in the resulting AI system should be appended.",
  },
];

export const dataUsesByPrivacyKey = DATA_USES.reduce<
  Record<DataUse["privacy_key"], DataUse>
>(
  (dataUsesByPrivacyKey, dataUse) => ({
    ...dataUsesByPrivacyKey,
    [dataUse.privacy_key]: dataUse,
  }),
  {}
);
