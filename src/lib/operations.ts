import {
  evaluateDeviceSilence,
  evaluateRootZone,
  evaluateTankReserve,
  evaluateUnauthorizedFlow,
  type ReadingQuality,
} from "./decisions";

export type Severity = "critical" | "high" | "medium" | "operational";

export type Plot = {
  id: string;
  code: string;
  crop: string;
  variety: string;
  stage: string;
  hectares: number;
  soil: string;
  irrigation: string;
  county: string;
  ward: string;
  zone: string;
  moisture: { depthCm: number; m3: number }[];
  rootDepthCm: number;
  lowerM3: number;
  upperM3: number;
  rainExpectedMm: number;
  quality: ReadingQuality;
  calibration: string;
};

export type Device = {
  id: string;
  name: string;
  kind: string;
  plotId: string | null;
  minutesSinceReport: number;
  expectedIntervalMinutes: number;
  batteryV: number | null;
  firmware: string;
  calibration: string;
};

export type FarmAction = {
  id: string;
  plotId: string | null;
  severity: Severity;
  title: string;
  what: string;
  where: string;
  when: string;
  why: string;
  amount: string | null;
  evidence: { label: string; value: string }[];
  confidence: "High" | "Limited";
  ruleId: string;
  ruleVersion: string;
  workOrder: string;
  channel: string;
  messages: { language: string; label: string; body: string }[];
};

export type RuleRecord = {
  id: string;
  version: string;
  name: string;
  status: "Approved";
  scope: "Global template" | "Kenya crop profile";
  trigger: string;
  action: string;
  parameter: string;
};

export const tenant = {
  name: "Lakeview Growers Ltd",
  farm: "South Block",
  county: "Nakuru",
  ward: "Naivasha",
  pack: "KE-1",
  observedAt: "2026-10-12T13:40:00Z",
  note: "Sample launch data for a fictional Nakuru farm. It is not a live sensor feed.",
};

export const plots: Plot[] = [
  {
    id: "t3",
    code: "T3",
    crop: "Tomato",
    variety: "Anna F1",
    stage: "Flowering",
    hectares: 0.4,
    soil: "Clay loam, plot calibrated",
    irrigation: "Drip, zone 2",
    county: "Nakuru",
    ward: "Naivasha",
    zone: "Central Rift horticulture",
    moisture: [
      { depthCm: 15, m3: 0.2 },
      { depthCm: 30, m3: 0.18 },
      { depthCm: 60, m3: 0.24 },
    ],
    rootDepthCm: 30,
    lowerM3: 0.22,
    upperM3: 0.36,
    rainExpectedMm: 0,
    quality: "ok",
    calibration: "Field check 2 Oct 2026 against a wet reference after irrigation",
  },
  {
    id: "p2",
    code: "P2",
    crop: "Capsicum",
    variety: "Commandant",
    stage: "Fruit set",
    hectares: 0.3,
    soil: "Clay loam, plot calibrated",
    irrigation: "Drip, zone 1",
    county: "Nakuru",
    ward: "Naivasha",
    zone: "Central Rift horticulture",
    moisture: [
      { depthCm: 15, m3: 0.37 },
      { depthCm: 30, m3: 0.39 },
      { depthCm: 60, m3: 0.34 },
    ],
    rootDepthCm: 30,
    lowerM3: 0.2,
    upperM3: 0.34,
    rainExpectedMm: 2,
    quality: "ok",
    calibration: "Field check 2 Oct 2026",
  },
  {
    id: "b1",
    code: "B1",
    crop: "French beans",
    variety: "Teresa",
    stage: "Vegetative",
    hectares: 0.5,
    soil: "Sandy loam, plot calibrated",
    irrigation: "Drip, zone 3",
    county: "Nakuru",
    ward: "Naivasha",
    zone: "Central Rift horticulture",
    moisture: [
      { depthCm: 15, m3: 0.27 },
      { depthCm: 30, m3: 0.26 },
    ],
    rootDepthCm: 30,
    lowerM3: 0.18,
    upperM3: 0.32,
    rainExpectedMm: 0,
    quality: "ok",
    calibration: "Field check 28 Sep 2026",
  },
  {
    id: "n4",
    code: "N4",
    crop: "Potato",
    variety: "Shangi",
    stage: "Nursery",
    hectares: 0.2,
    soil: "Volcanic loam",
    irrigation: "Sprinkler",
    county: "Nakuru",
    ward: "Naivasha",
    zone: "Central Rift horticulture",
    moisture: [{ depthCm: 20, m3: 0 }],
    rootDepthCm: 20,
    lowerM3: 0.2,
    upperM3: 0.34,
    rainExpectedMm: 0,
    quality: "missing",
    calibration: "Install record incomplete until the probe reports again",
  },
  {
    id: "a2",
    code: "A2",
    crop: "Avocado",
    variety: "Hass",
    stage: "Nursery",
    hectares: 0.6,
    soil: "Clay loam",
    irrigation: "Drip",
    county: "Nakuru",
    ward: "Naivasha",
    zone: "Central Rift horticulture",
    moisture: [
      { depthCm: 20, m3: 0.25 },
      { depthCm: 40, m3: 0.27 },
    ],
    rootDepthCm: 40,
    lowerM3: 0.2,
    upperM3: 0.35,
    rainExpectedMm: 1,
    quality: "ok",
    calibration: "Field check 5 Oct 2026",
  },
  {
    id: "c1",
    code: "C1",
    crop: "Cabbage",
    variety: "Gloria",
    stage: "Head formation",
    hectares: 0.35,
    soil: "Clay loam, plot calibrated",
    irrigation: "Drip, zone 4",
    county: "Nakuru",
    ward: "Naivasha",
    zone: "Central Rift horticulture",
    moisture: [
      { depthCm: 15, m3: 0.29 },
      { depthCm: 30, m3: 0.28 },
    ],
    rootDepthCm: 30,
    lowerM3: 0.21,
    upperM3: 0.35,
    rainExpectedMm: 1,
    quality: "ok",
    calibration: "Field check 2 Oct 2026",
  },
];

export const devices: Device[] = [
  {
    id: "gw-1",
    name: "South Block gateway",
    kind: "Solar LoRa gateway",
    plotId: null,
    minutesSinceReport: 6,
    expectedIntervalMinutes: 15,
    batteryV: 12.8,
    firmware: "1.4.2",
    calibration: "Not applicable",
  },
  {
    id: "sm-t3",
    name: "T3 moisture profile",
    kind: "Capacitance probe",
    plotId: "t3",
    minutesSinceReport: 18,
    expectedIntervalMinutes: 30,
    batteryV: 3.7,
    firmware: "2.1.0",
    calibration: "Due 2 Jan 2027",
  },
  {
    id: "sm-p2",
    name: "P2 moisture profile",
    kind: "Capacitance probe",
    plotId: "p2",
    minutesSinceReport: 16,
    expectedIntervalMinutes: 30,
    batteryV: 3.66,
    firmware: "2.1.0",
    calibration: "Due 2 Jan 2027",
  },
  {
    id: "sm-n4",
    name: "N4 moisture probe",
    kind: "Capacitance probe",
    plotId: "n4",
    minutesSinceReport: 210,
    expectedIntervalMinutes: 30,
    batteryV: null,
    firmware: "2.1.0",
    calibration: "Blocked until the probe reports",
  },
  {
    id: "fl-1",
    name: "Mainline flow meter",
    kind: "Pulse meter",
    plotId: "b1",
    minutesSinceReport: 4,
    expectedIntervalMinutes: 15,
    batteryV: 3.6,
    firmware: "1.0.4",
    calibration: "K-factor checked 20 Sep 2026",
  },
  {
    id: "tk-1",
    name: "Header tank",
    kind: "Ultrasonic level",
    plotId: "a2",
    minutesSinceReport: 9,
    expectedIntervalMinutes: 15,
    batteryV: 3.72,
    firmware: "1.2.1",
    calibration: "Tank geometry recorded at install",
  },
];

export const tank = {
  availableM3: 7.2,
  capacityM3: 40,
  reserveM3: 10,
  plannedM3: 12,
  quality: "ok" as ReadingQuality,
  flowTodayM3: 18.4,
  unauthorizedM3: 6.2,
  pumpHours: 3.4,
  sampleTariffKesPerM3: 42,
};

export const rules: RuleRecord[] = [
  {
    id: "GL-FLOW-01",
    version: "1.0.0",
    name: "Flow without a schedule",
    status: "Approved",
    scope: "Global template",
    trigger: "Flow above 0.2 m³/h and no authorized irrigation",
    action: "Inspect the line and create a work order",
    parameter: "Threshold is global. Meter K-factor is per device.",
  },
  {
    id: "GL-TANK-01",
    version: "1.0.0",
    name: "Tank below reserve",
    status: "Approved",
    scope: "Global template",
    trigger: "Available volume below reserve or the next planned irrigation",
    action: "Refill or reprioritize irrigation",
    parameter: "Reserve volume is set per tank.",
  },
  {
    id: "GL-DEV-01",
    version: "1.0.0",
    name: "Silent device",
    status: "Approved",
    scope: "Global template",
    trigger: "Three missed reporting intervals",
    action: "Technician inspection. Suppress dependent advice.",
    parameter: "Interval comes from the device model.",
  },
  {
    id: "KE-IRR-01",
    version: "0.9.0",
    name: "Dry root zone",
    status: "Approved",
    scope: "Kenya crop profile",
    trigger: "Calibrated moisture at or below the crop-stage lower limit, with little expected rain",
    action: "Irrigate the approved cycle",
    parameter: "Tomato flowering at 30 cm: lower 0.22 m³/m³. Central Rift profile.",
  },
  {
    id: "KE-IRR-02",
    version: "0.9.0",
    name: "Saturated root zone",
    status: "Approved",
    scope: "Kenya crop profile",
    trigger: "Moisture at or above the crop-stage upper limit",
    action: "Stop irrigation and inspect drainage",
    parameter: "Capsicum fruit set at 30 cm: upper 0.34 m³/m³.",
  },
  {
    id: "KE-IRR-03",
    version: "0.9.0",
    name: "Rain replaces irrigation",
    status: "Approved",
    scope: "Kenya crop profile",
    trigger: "Dry root zone and at least 5 mm expected before the next cycle",
    action: "Hold the irrigation",
    parameter: "5 mm gate is global. Forecast source is per country pack.",
  },
  {
    id: "GL-QUAL-01",
    version: "1.0.0",
    name: "Untrustworthy soil reading",
    status: "Approved",
    scope: "Global template",
    trigger: "Missing, stale, or stuck soil moisture",
    action: "Withhold irrigation advice",
    parameter: "No crop override can bypass a bad reading.",
  },
  {
    id: "GL-FLOW-02",
    version: "1.0.0",
    name: "Scheduled irrigation, no flow",
    status: "Approved",
    scope: "Global template",
    trigger: "An authorized cycle starts and the meter stays near zero",
    action: "Inspect the pump, tank, or blockage",
    parameter: "Not firing in this sample.",
  },
  {
    id: "GL-PUMP-01",
    version: "1.0.0",
    name: "Pump dry-run risk",
    status: "Approved",
    scope: "Global template",
    trigger: "Low tank or pressure while the pump is requested to run",
    action: "Stop at the edge controller and inspect",
    parameter: "Edge interlock. Cloud cannot override it.",
  },
  {
    id: "GL-SPRAY-01",
    version: "1.0.0",
    name: "Unsafe spray window",
    status: "Approved",
    scope: "Global template",
    trigger: "Rain, wind, humidity, or temperature outside the approved window",
    action: "Reschedule the task. Do not name a product or dose.",
    parameter: "Kenya product choice stays with a qualified reviewer and the label.",
  },
  {
    id: "KE-DIS-01",
    version: "0.3.0",
    name: "Leaf-wetness scouting",
    status: "Approved",
    scope: "Kenya crop profile",
    trigger: "Approved leaf-wetness hours for a crop and zone",
    action: "Send a scout. No automatic pesticide prescription.",
    parameter: "No leaf-wetness sensor is installed in this sample.",
  },
  {
    id: "GL-DEV-02",
    version: "1.0.0",
    name: "Low gateway power",
    status: "Approved",
    scope: "Global template",
    trigger: "Battery or solar charge below the service threshold",
    action: "Service the power system",
    parameter: "South Block gateway is currently above the threshold.",
  },
];

const review = "Draft Kiswahili. A reviewer must approve it before it is sent.";

function rootAction(plot: Plot): FarmAction | null {
  const reading = plot.moisture.find((item) => item.depthCm === plot.rootDepthCm);
  const decision = evaluateRootZone({
    moistureM3: reading?.m3 ?? 0,
    lowerM3: plot.lowerM3,
    upperM3: plot.upperM3,
    rainExpectedMm: plot.rainExpectedMm,
    quality: reading ? plot.quality : "missing",
  });

  if (decision.action === "hold") return null;

  if (decision.action === "suppress") {
    return {
      id: `advice-${plot.id}`,
      plotId: plot.id,
      severity: "operational",
      title: `Advice withheld on ${plot.code}`,
      what: "Do not irrigate from this sensor until a technician checks it.",
      where: `${tenant.farm}, plot ${plot.code} ${plot.crop.toLowerCase()}`,
      when: "Before the next irrigation window",
      why: decision.reason,
      amount: null,
      evidence: [
        { label: "Reading", value: "Missing" },
        { label: "Rule", value: "GL-QUAL-01 · 1.0.0" },
      ],
      confidence: "Limited",
      ruleId: "GL-QUAL-01",
      ruleVersion: "1.0.0",
      workOrder: "WO-1048",
      channel: "Technician work order",
      messages: [],
    };
  }

  const irrigate = decision.action === "irrigate";
  return {
    id: `water-${plot.id}`,
    plotId: plot.id,
    severity: "high",
    title: irrigate
      ? `Irrigate plot ${plot.code}`
      : `Stop irrigation on plot ${plot.code}`,
    what: irrigate
      ? `Irrigate zone 2 for the approved 35-minute cycle.`
      : "Stop irrigation and inspect drainage.",
    where: `${tenant.farm}, plot ${plot.code} ${plot.crop.toLowerCase()}`,
    when: irrigate ? "This evening, before 19:00 EAT" : "Now",
    why: decision.reason,
    amount: irrigate ? "35 minutes" : "Stop the current cycle",
    evidence: [
      {
        label: `${plot.rootDepthCm} cm moisture`,
        value: `${reading?.m3.toFixed(2)} m³/m³`,
      },
      {
        label: "Target",
        value: `${plot.lowerM3.toFixed(2)}–${plot.upperM3.toFixed(2)} m³/m³`,
      },
      { label: "Expected rain", value: `${plot.rainExpectedMm} mm` },
      { label: "Crop stage", value: plot.stage },
    ],
    confidence: "High",
    ruleId: irrigate ? "KE-IRR-01" : "KE-IRR-02",
    ruleVersion: "0.9.0",
    workOrder: irrigate ? "WO-1044" : "WO-1045",
    channel: "Dashboard, SMS, and WhatsApp",
    messages: irrigate
      ? [
          {
            language: "en",
            label: "English",
            body: "ACTION — Plot T3 tomato root zone is dry and no rain is expected before tomorrow. Irrigate Zone 2 this evening for the approved 35-minute cycle. Reply 1 when started, 2 when complete, or 3 for help.",
          },
          {
            language: "sw",
            label: "Kiswahili",
            body: `HATUA — Shamba T3 nyanya imekauka na mvua haijatarajiwa kabla ya kesho. Mwagilia Eneo 2 leo jioni kwa mzunguko wa dakika 35. Jibu 1 ukianza, 2 ukimaliza, au 3 kwa msaada. ${review}`,
          },
        ]
      : [
          {
            language: "en",
            label: "English",
            body: "ACTION — Plot P2 capsicum is wetter than the approved upper limit. Stop irrigation and inspect drainage. Reply 1 when started, 2 when complete, or 3 for help.",
          },
          {
            language: "sw",
            label: "Kiswahili",
            body: `HATUA — Shamba P2 hoho limepita kiwango cha maji. Simamisha umwagiliaji na kagua mifereji. Jibu 1 ukianza, 2 ukimaliza, au 3 kwa msaada. ${review}`,
          },
        ],
  };
}

const flowDecision = evaluateUnauthorizedFlow({
  flowM3h: 1.4,
  scheduleActive: false,
  quality: "ok",
});

const tankDecision = evaluateTankReserve(tank);

const silentProbe = devices.find((device) => device.id === "sm-n4");
const silence = evaluateDeviceSilence({
  minutesSinceReport: silentProbe?.minutesSinceReport ?? 0,
  expectedIntervalMinutes: silentProbe?.expectedIntervalMinutes ?? 30,
});

export const actions: FarmAction[] = [
  {
    id: "leak-b1",
    plotId: "b1",
    severity: "critical",
    title: "Inspect flow on plot B1",
    what: "Walk the French bean lateral and look for a leak or an open valve.",
    where: `${tenant.farm}, plot B1 mainline`,
    when: "Now",
    why: flowDecision.reason,
    amount: "1.4 m³/h with no authorized cycle",
    evidence: [
      { label: "Flow", value: "1.4 m³/h" },
      { label: "Schedule", value: "None active" },
      { label: "Meter", value: "Mainline pulse meter" },
    ],
    confidence: "High",
    ruleId: "GL-FLOW-01",
    ruleVersion: "1.0.0",
    workOrder: "WO-1042",
    channel: "SMS, WhatsApp, and phone escalation",
    messages: [
      {
        language: "en",
        label: "English",
        body: "ACTION — Water is flowing at plot B1 French beans without a scheduled irrigation. Inspect the line now. Reply 1 when started, 2 when complete, or 3 for help.",
      },
      {
        language: "sw",
        label: "Kiswahili",
        body: `HATUA — Maji yanatiririka kwenye shamba B1 bila ratiba. Kagua mfereji sasa. Jibu 1 ukianza, 2 ukimaliza, au 3 kwa msaada. ${review}`,
      },
    ],
  },
  ...plots.map(rootAction).filter((action): action is FarmAction => action !== null),
  {
    id: "tank-a2",
    plotId: "a2",
    severity: "high",
    title: "Refill the header tank",
    what: "Refill before the avocado nursery cycle, or delay that cycle.",
    where: `${tenant.farm} header tank`,
    when: "Before 17:30 EAT",
    why: tankDecision.reason,
    amount: "7.2 m³ available, 12 m³ planned",
    evidence: [
      { label: "Level", value: "18% · 7.2 m³" },
      { label: "Reserve", value: "10 m³" },
      { label: "Next cycle", value: "12 m³ for A2" },
    ],
    confidence: "High",
    ruleId: "GL-TANK-01",
    ruleVersion: "1.0.0",
    workOrder: "WO-1046",
    channel: "Dashboard and SMS",
    messages: [
      {
        language: "en",
        label: "English",
        body: "ACTION — The header tank is below reserve and cannot cover the avocado nursery cycle. Refill it or delay plot A2. Reply 1 when started, 2 when complete, or 3 for help.",
      },
      {
        language: "sw",
        label: "Kiswahili",
        body: `HATUA — Tangi kuu iko chini ya akiba. Jaza tangi kabla ya kumwagilia shamba A2. Jibu 1 ukianza, 2 ukimaliza, au 3 kwa msaada. ${review}`,
      },
    ],
  },
  {
    id: "silent-n4",
    plotId: "n4",
    severity: "operational",
    title: "Inspect the N4 probe",
    what: "Check power, cable, and mounting on the potato nursery probe.",
    where: `${tenant.farm}, plot N4`,
    when: "Today",
    why: silence.reason,
    amount: null,
    evidence: [
      { label: "Last report", value: "210 minutes ago" },
      { label: "Expected interval", value: "30 minutes" },
      { label: "Dependent advice", value: "Withheld" },
    ],
    confidence: "High",
    ruleId: "GL-DEV-01",
    ruleVersion: "1.0.0",
    workOrder: "WO-1048",
    channel: "Technician work order",
    messages: [],
  },
];

if (silence.action !== "inspect") {
  throw new Error("Sample silent probe did not produce an inspection.");
}

export function plotStatus(plotId: string, closedIds: string[]) {
  const open = actions.filter(
    (action) => action.plotId === plotId && !closedIds.includes(action.id),
  );
  if (open.some((action) => action.severity === "critical")) return "critical" as const;
  if (open.some((action) => action.severity === "high")) return "high" as const;
  if (open.some((action) => action.severity === "operational")) return "watch" as const;
  return "steady" as const;
}

export function getPlot(id: string) {
  return plots.find((plot) => plot.id === id);
}
