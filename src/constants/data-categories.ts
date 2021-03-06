export type DataCategory = typeof DATA_CATEGORIES[number];
export type DataCategoryKey = DataCategory["privacy_key"];

export const DATA_CATEGORIES = [
  {
    privacy_key: "account",
    name: "Account Data",
    description: "Data related to a system account.",
  },
  {
    privacy_key: "account.contact",
    name: "Account Contact Data",
    parent_key: "account",
    description: "Contact data related to a system account.",
  },
  {
    privacy_key: "account.contact.city",
    name: "Account City",
    parent_key: "account.contact",
    description: "Account's city level address data.",
  },
  {
    privacy_key: "account.contact.country",
    name: "Account Country",
    parent_key: "account.contact",
    description: "Account's country level address data.",
  },
  {
    privacy_key: "account.contact.email",
    name: "Account Email",
    parent_key: "account.contact",
    description: "Account's email address.",
  },
  {
    privacy_key: "account.contact.phone_number",
    name: "Account Phone Number",
    parent_key: "account.contact",
    description: "Account's phone number.",
  },
  {
    privacy_key: "account.contact.postal_code",
    name: "Account Postal Code",
    parent_key: "account.contact",
    description: "Account's postal code.",
  },
  {
    privacy_key: "account.contact.state",
    name: "Account State",
    parent_key: "account.contact",
    description: "Account's state level address data.",
  },
  {
    privacy_key: "account.contact.street",
    name: "Account Street",
    parent_key: "account.contact",
    description: "Account's street level address.",
  },
  {
    privacy_key: "account.payment",
    name: "Payment Data",
    parent_key: "account",
    description: "Payment data related to system account.",
  },
  {
    privacy_key: "account.payment.financial_account_number",
    name: "Account Payment Financial Account Number",
    parent_key: "account.payment",
    description:
      "Financial account number for an account's payment card, bank account, or other financial system.",
  },
  {
    privacy_key: "system",
    name: "System Data",
    description: "Data unique to, and under control of the system.",
  },
  {
    privacy_key: "system.authentication",
    name: "Authentication Data",
    parent_key: "system",
    description: "Data used to manage access to the system.",
  },
  {
    privacy_key: "system.operations",
    name: "Operations Data",
    parent_key: "system",
    description: "Data used for system operations.",
  },
  {
    privacy_key: "user",
    name: "User Data",
    description:
      "Data related to the user of the system, either provided directly or derived based on their usage.",
  },
  {
    privacy_key: "user.derived",
    name: "Derived Data",
    parent_key: "user",
    description:
      "Data derived from user provided data or as a result of user actions in the system.",
  },
  {
    privacy_key: "user.derived.identifiable",
    name: "Derived User Identifiable Data",
    parent_key: "user.derived",
    description: "Derived data that is linked to, or identifies a user.",
  },
  {
    privacy_key: "user.derived.identifiable.biometric_health",
    name: "Biometric Health Data",
    parent_key: "user.derived.identifiable",
    description: "Encoded characteristic collected about a user.",
  },
  {
    privacy_key: "user.derived.identifiable.browsing_history",
    name: "Browsing History",
    parent_key: "user.derived.identifiable",
    description: "Content browsing history of a user.",
  },
  {
    privacy_key: "user.derived.identifiable.demographic",
    name: "Demographic Data",
    parent_key: "user.derived.identifiable",
    description: "Demographic data about a user.",
  },
  {
    privacy_key: "user.derived.identifiable.contact",
    name: "Derived Contact Data",
    parent_key: "user.derived.identifiable",
    description: "Contact data collected about a user.",
  },
  {
    privacy_key: "user.derived.identifiable.device",
    name: "Device Data",
    parent_key: "user.derived.identifiable",
    description: "Data related to a user's device, configuration and setting.",
  },
  {
    privacy_key: "user.derived.identifiable.device.cookie_id",
    name: "Cookie ID",
    parent_key: "user.derived.identifiable.device",
    description: "Cookie unique identification number.",
  },
  {
    privacy_key: "user.derived.identifiable.device.device_id",
    name: "Device ID",
    parent_key: "user.derived.identifiable.device",
    description: "Device unique identification number.",
  },
  {
    privacy_key: "user.derived.identifiable.device.ip_address",
    name: "IP Address",
    parent_key: "user.derived.identifiable.device",
    description: "Unique identifier related to device connection.",
  },
  {
    privacy_key: "user.derived.identifiable.gender",
    name: "Derived Gender",
    parent_key: "user.derived.identifiable",
    description: "Gender of an individual.",
  },
  {
    privacy_key: "user.derived.identifiable.location",
    name: "Location Data",
    parent_key: "user.derived.identifiable",
    description: "Records of the location of a user.",
  },
  {
    privacy_key: "user.derived.identifiable.media_consumption",
    name: "Media Consumption Data",
    parent_key: "user.derived.identifiable",
    description: "Media type consumption data of a user.",
  },
  {
    privacy_key: "user.derived.identifiable.non_specific_age",
    name: "Derived Non-Specific Age",
    parent_key: "user.derived.identifiable",
    description: "Age range data.",
  },
  {
    privacy_key: "user.derived.identifiable.observed",
    name: "Observed Data",
    parent_key: "user.derived.identifiable",
    description: "Data collected through observation of use of the system.",
  },
  {
    privacy_key: "user.derived.identifiable.profiling",
    name: "Profiling Data",
    parent_key: "user.derived.identifiable",
    description: "Preference and interest data about a user.",
  },
  {
    privacy_key: "user.derived.identifiable.race",
    name: "Derived Race",
    parent_key: "user.derived.identifiable",
    description: "Racial or ethnic origin data.",
  },
  {
    privacy_key: "user.derived.identifiable.religious_belief",
    name: "Derived Religious Belief",
    parent_key: "user.derived.identifiable",
    description: "Religion or religious belief.",
  },
  {
    privacy_key: "user.derived.identifiable.search_history",
    name: "Search History",
    parent_key: "user.derived.identifiable",
    description: "Records of search history and queries of a user.",
  },
  {
    privacy_key: "user.derived.identifiable.sexual_orientation",
    name: "Derived Sexual Orientation",
    parent_key: "user.derived.identifiable",
    description: "Personal sex life or sexual data.",
  },
  {
    privacy_key: "user.derived.identifiable.social",
    name: "Social Data",
    parent_key: "user.derived.identifiable",
    description: "Social activity and interaction data.",
  },
  {
    privacy_key: "user.derived.identifiable.telemetry",
    name: "Telemetry Data",
    parent_key: "user.derived.identifiable",
    description:
      "User identifiable measurement data from system sensors and monitoring.",
  },
  {
    privacy_key: "user.derived.identifiable.unique_id",
    name: "Unique ID",
    parent_key: "user.derived.identifiable",
    description: "Unique identifier for a user assigned through system use.",
  },
  {
    privacy_key: "user.derived.identifiable.user_sensor",
    name: "User Sensor Data",
    parent_key: "user.derived.identifiable",
    description:
      "Measurement data derived about a user's environment through system use.",
  },
  {
    privacy_key: "user.derived.identifiable.organization",
    name: "Organization Identifiable Data",
    parent_key: "user.derived.identifiable",
    description:
      "Derived data that is linked to, or identifies an organization.",
  },
  {
    privacy_key: "user.derived.identifiable.workplace",
    name: "Derived Workplace",
    parent_key: "user.derived.identifiable",
    description: "Organization of employment.",
  },
  {
    privacy_key: "user.derived.nonidentifiable",
    name: "Derived User Non-Identifiable Data",
    parent_key: "user.derived",
    description:
      "Non-user identifiable data derived related to a user as a result of user actions in the system.",
  },
  {
    privacy_key: "user.derived.nonidentifiable.sensor",
    name: "Sensor Data",
    parent_key: "user.derived.nonidentifiable",
    description:
      "Non-user identifiable measurement data derived from sensors and monitoring systems.",
  },
  {
    privacy_key: "user.provided",
    name: "User Provided Data",
    parent_key: "user",
    description: "Data provided or created directly by a user of the system.",
  },
  {
    privacy_key: "user.provided.identifiable",
    name: "User Provided Identifiable Data",
    parent_key: "user.provided",
    description:
      "Data provided or created directly by a user that is linked to or identifies a user.",
  },
  {
    privacy_key: "user.provided.identifiable.biometric",
    name: "Biometric Data",
    parent_key: "user.provided.identifiable",
    description: "Encoded characteristics provided by a user.",
  },
  {
    privacy_key: "user.provided.identifiable.childrens",
    name: "Children's Data",
    parent_key: "user.provided.identifiable",
    description: "Data relating to children.",
  },
  {
    privacy_key: "user.provided.identifiable.contact",
    name: "Provided Contact Data",
    parent_key: "user.provided.identifiable",
    description:
      "User provided contact data for purposes other than account management.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.city",
    name: "User Provided City",
    parent_key: "user.provided.identifiable.contact",
    description: "User's city level address data.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.country",
    name: "User Provided Country",
    parent_key: "user.provided.identifiable.contact",
    description: "User's country level address data.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.email",
    name: "User Provided Email",
    parent_key: "user.provided.identifiable.contact",
    description: "User's provided email address.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.phone_number",
    name: "User Provided Phone Number",
    parent_key: "user.provided.identifiable.contact",
    description: "User's phone number.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.postal_code",
    name: "User Provided Postal Code",
    parent_key: "user.provided.identifiable.contact",
    description: "User's postal code.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.state",
    name: "User Provided State",
    parent_key: "user.provided.identifiable.contact",
    description: "User's state level address data.",
  },
  {
    privacy_key: "user.provided.identifiable.contact.street",
    name: "User Provided Street",
    parent_key: "user.provided.identifiable.contact",
    description: "User's street level address data.",
  },
  {
    privacy_key: "user.provided.identifiable.credentials",
    name: "Credentials",
    parent_key: "user.provided.identifiable",
    description: "User provided authentication data.",
  },
  {
    privacy_key: "user.provided.identifiable.credentials.biometric_credentials",
    name: "Biometric Credentials",
    parent_key: "user.provided.identifiable.credentials",
    description: "Credentials for system authentication.",
  },
  {
    privacy_key: "user.provided.identifiable.credentials.password",
    name: "Password",
    parent_key: "user.provided.identifiable.credentials",
    description: "Password for system authentication.",
  },
  {
    privacy_key: "user.provided.identifiable.date_of_birth",
    name: "Date of Birth",
    parent_key: "user.provided.identifiable",
    description: "User's date of birth.",
  },
  {
    privacy_key: "user.provided.identifiable.financial",
    name: "Financial Data",
    parent_key: "user.provided.identifiable",
    description: "Payment data and financial history.",
  },
  {
    privacy_key: "user.provided.identifiable.financial.account_number",
    name: "User Provided Financial Account Number",
    parent_key: "user.provided.identifiable.financial",
    description:
      "User's account number for a payment card, bank account, or other financial system.",
  },
  {
    privacy_key: "user.provided.identifiable.gender",
    name: "User Provided Gender",
    parent_key: "user.provided.identifiable",
    description: "Gender of an individual.",
  },
  {
    privacy_key: "user.provided.identifiable.genetic",
    name: "Genetic Data",
    parent_key: "user.provided.identifiable",
    description: "Data about the genetic makeup provided by a user.",
  },
  {
    privacy_key: "user.provided.identifiable.government_id",
    name: "Government ID",
    parent_key: "user.provided.identifiable",
    description: "State provided identification data.",
  },
  {
    privacy_key:
      "user.provided.identifiable.government_id.drivers_license_number",
    name: "Driver's License Number",
    parent_key: "user.provided.identifiable.government_id",
    description: "State issued driving identification number.",
  },
  {
    privacy_key:
      "user.provided.identifiable.government_id.national_identification_number",
    name: "National Identification Number",
    parent_key: "user.provided.identifiable.government_id",
    description: "State issued personal identification number.",
  },
  {
    privacy_key: "user.provided.identifiable.government_id.passport_number",
    name: "Passport Number",
    parent_key: "user.provided.identifiable.government_id",
    description: "State issued passport data.",
  },
  {
    privacy_key: "user.provided.identifiable.health_and_medical",
    name: "Health and Medical Data",
    parent_key: "user.provided.identifiable",
    description: "Health records or individual's personal medical information.",
  },
  {
    privacy_key: "user.provided.identifiable.job_title",
    name: "Job Title",
    parent_key: "user.provided.identifiable",
    description: "Professional data.",
  },
  {
    privacy_key: "user.provided.identifiable.name",
    name: "Name",
    parent_key: "user.provided.identifiable",
    description: "User's real name.",
  },
  {
    privacy_key: "user.provided.identifiable.non_specific_age",
    name: "User Provided Non-Specific Age",
    parent_key: "user.provided.identifiable",
    description: "Age range data.",
  },
  {
    privacy_key: "user.provided.identifiable.political_opinion",
    name: "Political Opinion",
    parent_key: "user.provided.identifiable",
    description: "Data related to the individual's political opinions.",
  },
  {
    privacy_key: "user.provided.identifiable.race",
    name: "User Provided Race",
    parent_key: "user.provided.identifiable",
    description: "Racial or ethnic origin data.",
  },
  {
    privacy_key: "user.provided.identifiable.religious_belief",
    name: "User Provided Religious Belief",
    parent_key: "user.provided.identifiable",
    description: "Religion or religious belief.",
  },
  {
    privacy_key: "user.provided.identifiable.sexual_orientation",
    name: "User Provided Sexual Orientation",
    parent_key: "user.provided.identifiable",
    description: "Personal sex life or sexual data.",
  },
  {
    privacy_key: "user.provided.identifiable.workplace",
    name: "User Provided Workplace",
    parent_key: "user.provided.identifiable",
    description: "Organization of employment.",
  },
  {
    privacy_key: "user.provided.nonidentifiable",
    name: "User Provided Non-Identifiable Data",
    parent_key: "user.provided",
    description:
      "Data provided or created directly by a user that is not identifiable.",
  },
];

export const dataCategoriesByPrivacyKey = DATA_CATEGORIES.reduce<
  Record<DataCategory["privacy_key"], DataCategory>
>(
  (dataCategoriesByPrivacyKey, category) => ({
    ...dataCategoriesByPrivacyKey,
    [category.privacy_key]: category,
  }),
  {}
);
