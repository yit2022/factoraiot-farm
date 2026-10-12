export type CountryPack = {
  code: string;
  name: string;
  status: "launch" | "reference";
  version: string;
  summary: string;
  languages: { code: string; name: string }[];
  currency: string;
  timezone: string;
  adminLevels: [string, string];
  radioProfile: string;
  cellular: string;
  residency: string;
  seasons: string;
  inputAuthority: string;
  siteCount: number;
  hardware: { model: string; status: string }[];
};

export const countryPacks: CountryPack[] = [
  {
    code: "KE",
    name: "Kenya",
    status: "launch",
    version: "KE-1",
    summary:
      "First operating market. English and Kiswahili templates, Kenya shilling display, and Communications Authority radio checks.",
    languages: [
      { code: "en", name: "English" },
      { code: "sw", name: "Kiswahili" },
    ],
    currency: "KES",
    timezone: "Africa/Nairobi",
    adminLevels: ["County", "Ward"],
    radioProfile: "LoRaWAN EU863–870, only after the exact model is approved",
    cellular: "Dual-SIM 4G gateway backhaul",
    residency: "Africa hosting region, selected before pilot data is collected",
    seasons: "Long rains, short rains, and local calendars",
    inputAuthority: "Pest Control Products Board for any Kenya pesticide guidance",
    siteCount: 1,
    hardware: [
      {
        model: "Candidate soil-moisture probe",
        status: "Bench only — approval certificate not attached",
      },
      {
        model: "Candidate EU868 gateway",
        status: "Do not import until Communications Authority approval is confirmed",
      },
    ],
  },
  {
    code: "REF",
    name: "Unlaunched reference",
    status: "reference",
    version: "REF-0",
    summary:
      "A second country pack used to prove the product is not hardcoded to Kenya. It is not a market decision.",
    languages: [
      { code: "en", name: "English" },
      { code: "fr", name: "French" },
    ],
    currency: "USD",
    timezone: "UTC",
    adminLevels: ["Region", "District"],
    radioProfile: "Unassigned until that country's spectrum rules are reviewed",
    cellular: "Unassigned",
    residency: "Not selected",
    seasons: "Local season calendar required",
    inputAuthority: "That country's registered-input authority, not Kenya's",
    siteCount: 0,
    hardware: [],
  },
];

export const kenyaPack = countryPacks[0];
