# Factora Precision Farming

## Global product strategy and Kenya launch plan

**Prepared:** 12 October 2026  
**Product surface:** `iot.factoraerp.com`  
**Scope:** Global precision-farming product. Kenya is the first operating market.  
**Status:** Discovery and implementation blueprint  
**Important:** Regulatory sections are planning guidance, not legal advice.

---

## 1. Executive recommendation

Build one global precision-farming module inside Factora ERP, and launch it in Kenya. Kenya is the first country pack and reference deployment, not a separate product and not a set of assumptions baked into the platform.

The first commercial slice is an **offline-first water and crop-risk workflow**, not a standalone farm app and not an autonomous “AI agronomist.”

The global product should:

1. Measure soil moisture at crop-root depths, local weather, tank level, irrigation flow, and equipment health.
2. Combine those observations with crop stage, plot, soil, irrigation, work-order, inventory, and cost records already managed by the ERP.
3. Turn readings into a small number of specific actions: irrigate, stop irrigation, inspect a leak, refill a tank, delay spraying, protect a crop from heat/frost, or service a device.
4. Deliver actions through the channel each role can use: dashboard and WhatsApp for managers, SMS/voice for field workers and feature-phone farmers, and in-app work orders for operational teams.
5. Begin with deterministic, locally approved agronomic rules. Add predictive models only after calibrated field data from the operating market shows that the rules improve outcomes.
6. Keep measurements, device protocols, tenancy, and workflows global. Put language, radio rules, geography, currency, weather sources, crop thresholds, and regulation in a country pack.

### Kenya beachhead

Start with **irrigated, high-value horticulture** and an organization that can support multiple growers, such as a cooperative, exporter, irrigation scheme, processor, or commercial farm. The initial county and crop should be selected through partner access and field discovery rather than presumed nationally.

Good pilot candidates include:

- Tomato, capsicum, French beans, avocado nursery, potato, or other irrigated horticulture where water timing and disease risk affect value.
- A farm cluster with 25–100 plots within gateway range.
- A partner with an agronomist, reliable production records, and willingness to maintain sensors.
- At least one full production season with comparable control plots.

Do not lead with low-margin, rain-fed maize farms unless a cooperative, county program, insurer, or donor pays for shared infrastructure. For those users, weather and agronomy advisories may be valuable, but dedicated per-plot hardware is unlikely to repay itself.

### Why this focus

- Kenya's agriculture, forestry, and fishing sector accounted for **21.8% of GDP in 2023** and employed over 40% of the population, according to KNBS.
- Farm structures are dominated by small holdings, while high-value production and aggregation create the strongest ability to pay.
- Less than 5% of arable land is irrigated in frequently cited official estimates, and water access and management are major constraints.
- Mobile network coverage is broad, but smartphone access, rural data use, electricity, and digital literacy are uneven. Sensor systems and user interfaces must tolerate intermittent service.
- Soil sensors without calibration can produce confident but wrong recommendations. Operational quality is more important than adding more sensor types.
- These conditions are globally relevant. A product that works through Kenya's connectivity, device, language, and regulatory constraints can be configured for other countries. A product designed only around Kenya cannot.

---

## 2. Global platform and country packs

### One product, four configuration layers

| Layer | Changes how often | Examples | Rule |
|---|---|---|---|
| Global platform | Rarely, through product releases | Device identity, telemetry schema, SI measurements, quality flags, rules engine, work orders, tenancy, audit | No country names, currencies, or radio bands in core logic |
| Country pack | When a market opens or a regulator changes | Languages, administrative areas, radio profile, approved hardware, weather providers, privacy terms, input registries, taxes, support hours | Versioned and auditable; Kenya is pack `KE-1` |
| Tenant configuration | Per customer | Farms, users, channels, branding, crop selections, billing plan, data-sharing permissions | A tenant may operate in more than one country |
| Plot configuration | Per field and season | Crop, variety, planting date, soil calibration, irrigation hardware, sensor depths, local thresholds | Recommendations use this context, not a national average |

### What Kenya must prove

Kenya is the right first market because it forces the platform to handle the difficult cases:

- Shared and feature phones as well as smartphones.
- Intermittent mobile data and power.
- More than one language.
- Small plots and large commercial or outgrower operations in the same product.
- Scarce or costly irrigation water.
- Device approval, spectrum limits, and personal-data regulation.
- Organizations that need ERP records, not only a sensor chart.

Success in Kenya should produce reusable country-pack machinery and evidence that the water workflow changes farm decisions. It should not produce Kenya-only database columns, message text, or hardware assumptions.

### Country-pack contents

Each new country needs a pack before devices are sold there:

1. **Locale:** languages, time zone, date and number formats, and message templates.
2. **Geography:** administrative hierarchy and map boundaries. Kenya uses county, sub-county, and ward; another country may use state, province, or district.
3. **Units and money:** SI values in storage; local display units and ISO currency in the interface. Kenya displays metric units and KES.
4. **Radio and hardware:** permitted bands, duty cycle, power, certified models, antennas, and import rules. Kenya's initial profile is LoRaWAN EU863–870 where the Communications Authority permits it, plus cellular backhaul.
5. **Connectivity partners:** mobile operators, SMS, USSD, WhatsApp, or email providers available in that country.
6. **Weather and agronomy sources:** licensed forecast, soil, and extension sources, each with an availability fallback.
7. **Crop profiles:** crop and growth-stage parameters approved for defined agroecological zones. A tomato profile approved in one Kenyan zone is not automatically valid in another country.
8. **Regulation:** privacy notice, data-residency choice, device certification evidence, and the registered-input authority used for chemical guidance.
9. **Commercial setup:** currency, tax, invoice requirements, warranty, and local support or installation partners.

Opening a country is a configuration and compliance release, not a fork of the codebase.

### Global customers

An exporter, processor, or farm group may manage sites in more than one country under one Factora tenant.

- Each site carries its country, time zone, currency, and residency region.
- Users see consolidated operations, with money converted only for presentation and with the exchange-rate source and date shown.
- Sensor data, farmer identity, and recommendations remain governed by the site's country pack.
- A user in one country must not see another grower's personal data unless that organization has a lawful basis and an explicit role assignment.

### Data residency

The platform needs a region attribute per tenant or site. Kenya data should be able to remain in an approved hosting region. A later European deployment may require a different region and GDPR terms. Cross-border support access, backups, and model training are separate processing purposes and must be documented per country pack.

### Expansion gate

Do not schedule a second country until all of these are true:

- The Kenya advisory pilot meets its reliability, action, and outcome gates.
- A second language, currency display, administrative hierarchy, and radio profile can be configured without a code fork.
- Hardware certification is a catalogue entry, not a Kenya-only screen.
- Factora has a named payer, installer, and agronomy approver for the next country.
- Privacy, radio, and input-advice reviews are complete for that country.

The next country should be chosen from Factora's actual customers and service capacity. It should not be selected in advance from a generic market list.

---

## 3. Product thesis

### Problem statement

Farm decisions are often based on fixed schedules, visual inspection, generalized weather reports, and delayed field reports. The result can be:

- Too much or too little irrigation.
- Pumping when a tank is low or a line is leaking.
- Spraying immediately before rain or during unsuitable wind, temperature, or leaf-wetness conditions.
- Late detection of heat, frost, water stress, or equipment failure.
- No reliable link between resource use, field work, input cost, crop outcome, and profitability.
- Sensor pilots that produce charts but do not create accountable farm actions.

### Product promise

> Factora tells the right person what needs attention, where, why, and by when; creates the corresponding ERP task; and measures whether the action improved water use, cost, quality, or yield.

### Principles

1. **Action before analytics.** Every prominent signal should map to a decision or task.
2. **Advisory before autonomy.** Remote actuation comes only after field safety and accuracy are proven.
3. **Local context before national or global averages.** Crop, growth stage, soil, irrigation method, and agroecological zone determine thresholds.
4. **Raw data remains immutable.** Store raw, calibrated, and quality-flagged values separately.
5. **Offline is normal.** Gateways buffer readings and local safety rules continue without cloud connectivity.
6. **Channels are configurable.** Kenya requires SMS and feature-phone flows. Another market may be app-first, but the platform must support both.
7. **Human accountability.** Important recommendations show their evidence and can be accepted, deferred, or rejected with a reason.
8. **ERP-native workflow.** Alerts become work orders, resource usage becomes cost, and sensor assets have maintenance histories.

### Initial non-goals

- Fully autonomous irrigation across all farms.
- Diagnosis of crop disease from sensors alone.
- Unqualified pesticide or fertilizer prescriptions.
- Supporting every available sensor or DIY device.
- Credit scoring, insurance pricing, or sale of farmer data.
- Drone fleets, satellite imagery, animal wearables, and cold-chain monitoring in the first release.

---

## 4. First market operating context: Kenya

### 4.1 Segments

| Segment | Need | Ability to pay | Recommended offer |
|---|---|---:|---|
| Commercial irrigated farm | Water, fertigation, labor, compliance, asset uptime | High | Dedicated sensors, gateways, dashboard, work orders |
| Exporter/outgrower scheme | Quality, traceability, consistent practice across growers | High at organization level | Shared infrastructure, grower alerts, compliance reporting |
| Cooperative/irrigation scheme | Shared water allocation, pump and scheme health | Medium | Shared gateways and meters; organization subscription |
| High-value smallholder cluster | Timely irrigation and spray decisions | Medium if aggregated | Sensor-as-a-service through cooperative/agent |
| Rain-fed smallholder | Planting and weather risk | Low individually | Shared station plus SMS advisory; avoid per-farm kit |
| Dairy/livestock enterprise | Animal health, milk chilling, water | Potentially high | Later vertical after crop/water product is stable |

### 4.2 Agroecological variation

Kenya cannot use one national threshold set. Highland horticulture, Rift Valley cereals, coastal farming, and arid and semi-arid lands differ in rainfall pattern, temperature, soil, water source, crop calendar, and disease pressure. The same principle applies inside every later country.

The global model needs:

- Country and that country's administrative area. In Kenya, this includes county and ward.
- Crop variety, planting date, and phenological stage.
- Soil texture and locally calibrated field capacity/wilting reference.
- Irrigation method and emitter/flow characteristics.
- A local season calendar. In Kenya this includes the long rains, short rains, and local variation.
- Rules approved for a crop-zone combination, not merely a crop name.

### 4.3 Digital channels in Kenya

National SIM or coverage figures overstate what an individual farmer can use. Product design should assume:

- A shared or feature phone may be the farmer's only device.
- Internet may be intermittent even where coverage maps show service.
- SMS delivery is useful but not proof the message was understood or acted on.
- Managers and agronomists are more likely to use web or WhatsApp.
- Kiswahili and English are baseline languages; partner research should determine where another local language is necessary.
- Voice/IVR is a later accessibility option for low-literacy or urgent scenarios.

### 4.4 Public data and ecosystem in Kenya

Factora should integrate available public or partner data rather than attempt to replace national systems:

- Kenya Meteorological Department data and forecasts where licensing and service access permit.
- KALRO's Kenya Agricultural Observatory Platform (KAOP) and extension content.
- FAO WaPOR remote-sensing water productivity where relevant.
- KNBS and Ministry of Agriculture production data for market and benchmark analysis.
- County agriculture officers, KALRO researchers, irrigation authorities, and cooperatives for validation.

Availability does not imply a production API or service-level agreement. Each source needs a data-sharing, licensing, update-frequency, and reliability check before it is put on a critical path.

---

## 5. Users and jobs to be done

### Farm owner or manager

- See which plots need action today.
- Know whether water, pumps, and irrigation are operating as expected.
- Compare water, input, labor, and yield performance by plot and season.
- Verify that assigned work was completed.

### Agronomist

- Define and approve crop-stage thresholds.
- See sensor quality and context before making a recommendation.
- Review exceptions and escalate high-risk advice.
- Compare treatment and control outcomes.

### Irrigation operator or field worker

- Receive a short instruction with plot, action, amount/duration, and deadline.
- Confirm start, completion, or reason not completed without navigating a complex app.
- Report a broken line, blocked emitter, empty tank, or sensor issue.

### Cooperative/exporter operations lead

- Monitor many farms without exposing one grower's data to another.
- Find compliance, quality, and production risks early.
- Coordinate extension visits and maintenance.

### Installer/technician

- Commission devices using a guided checklist.
- Record serial number, GPS, depth, photo, calibration, firmware, and connectivity.
- See low battery, silence, and calibration-due work.

### Factora administrator

- Approve device models and payload schemas.
- Provision tenants safely.
- Track service health, firmware, subscriptions, and support.

---

## 6. Core workflows

### 6.1 Farm onboarding

1. Create or select the ERP customer organization.
2. Create farms, fields, blocks, and plots with boundaries.
3. Record owner/manager and notification preferences with privacy notice.
4. Add crop, variety, planting date, expected harvest, and irrigation method.
5. Record soil texture and baseline lab/field measurements.
6. Select an agronomist-approved crop profile for the local zone.
7. Register sensor and gateway assets against the correct plot.
8. Complete installation QA: GPS, depth, orientation, photos, battery, radio test, calibration, and acceptance.
9. Run a soak period during which recommendations are visible to agronomists but not automatically sent to farmers.

### 6.2 Daily decision loop

1. Sensors report and the gateway stores and forwards readings.
2. Ingestion validates schema, time, identity, and plausible ranges.
3. Calibration is applied without overwriting raw readings.
4. The rules engine evaluates current state, forecast, crop stage, prior irrigation, and cooldown.
5. A recommendation is generated with severity, evidence, confidence, action, deadline, and recipient.
6. Critical events create ERP work orders and notifications.
7. The assignee acknowledges, acts, defers, or rejects.
8. Flow and moisture response verify whether the action occurred and had the expected effect.
9. The outcome is captured for agronomic tuning and impact reporting.

### 6.3 Device maintenance

1. Detect a silent, stuck, drifting, low-battery, or implausible sensor.
2. Suppress agronomic recommendations that depend on untrustworthy data.
3. Create a technician work order with diagnostics.
4. Record inspection, cleaning, recalibration, repair, replacement, and new baseline.

### 6.4 Advisory approval

Rules move through `draft → agronomist review → pilot → approved → retired`. Each alert records the rule version and inputs used. A changed rule must not rewrite old decisions.

---

## 7. Sensor strategy

### 7.1 Minimum viable plot kit

| Measurement | Purpose | Initial recommendation | Key caveat |
|---|---|---|---|
| Soil moisture | Irrigation need and root-zone response | Capacitance/FDR at two or three crop-specific depths | Must be calibrated to local soil; affected by salinity, clay, placement, and air gaps |
| Soil temperature | Root-zone and interpretation context | Combined with moisture profile | Sensor depth matters |
| Air temperature and humidity | Heat, frost, evapotranspiration and disease context | Shielded, ventilated probe | Unshielded readings are misleading in direct sun |
| Rainfall | Irrigation adjustment and spray timing | Leveled tipping bucket with debris protection | Wind undercatch and clogging require maintenance |
| Tank level | Water availability | Ultrasonic for suitable clean tanks; hydrostatic where foam/turbulence makes ultrasound unreliable | Convert height to volume using tank geometry |
| Mainline flow | Consumption, irrigation verification, leak detection | Pulse meter or suitable inline meter | K-factor, low-flow sensitivity, debris, and pipe conditions matter |
| Gateway health | Reliability | Battery, solar charge, signal, storage, firmware, clock | Must be visible as operational data |

### 7.2 Premium add-ons

- Inline EC and pH only for fertigation customers who can support frequent cleaning and calibration.
- Leaf wetness for crops where an agronomist can provide a validated disease-risk model.
- Pump current/pressure for dry-run, blocked line, and maintenance diagnosis.
- Weather station wind speed/direction when spray-window guidance is in scope.

### 7.3 Avoid misleading hardware claims

Low-cost “NPK soil sensors” often infer nutrient status indirectly and cannot replace soil laboratory analysis. Do not market continuous nutrient readings unless the device is independently validated for the local soil and use case.

### 7.4 Installation and calibration

Every installation record should include:

- Manufacturer, model, serial number, firmware, and approval evidence.
- Plot, coordinates, soil type, sensor depth, installation method, and photo.
- Crop and root-zone rationale.
- Raw baseline and calibration equation/version.
- Installer, date, next inspection, and next calibration.
- Radio signal, battery/solar readings, and a test event.

For soil moisture, use plot-specific calibration where possible. At minimum, establish meaningful local wet and dry reference points and validate readings after irrigation and rainfall. Never present uncalibrated volumetric water content as precision truth.

---

## 8. Notifications and decision rules

### 8.1 Notification payload

Every farmer-facing notification should answer:

- **What:** the requested action.
- **Where:** farm and plot.
- **When:** deadline or safe window.
- **Why:** one plain-language reason.
- **How much:** irrigation duration/volume only when calibrated.
- **What next:** reply or confirmation path.

Example:

> ACTION — Plot T3 tomato root zone is dry and no rain is expected before tomorrow. Irrigate Zone 2 this evening for the approved 35-minute cycle. Reply 1 when started, 2 when complete, or 3 for help.

Do not send:

> Soil moisture sensor 7 = 21.8%.

### 8.2 Initial alert catalogue

| Rule | Evidence | Action | Severity | Channel |
|---|---|---|---|---|
| Root zone below managed depletion threshold | Calibrated soil profile + crop stage + recent rain/irrigation | Irrigate approved cycle | Medium/high | App, SMS/WhatsApp |
| Root zone remains saturated | Profile above upper threshold for configured duration | Stop irrigation; inspect drainage | High | App, SMS; work order |
| Flow without active schedule | Flow meter + no authorized event | Inspect leak or unauthorized use | Critical | SMS/WhatsApp/call escalation |
| Scheduled irrigation but no flow | Schedule + valve/pump state + meter | Inspect pump, tank, or blockage | High | Work order + SMS |
| Tank below reserve | Level + planned irrigation demand | Refill or reprioritize irrigation | High | SMS + dashboard |
| Pump dry-run risk | Low tank/pressure + pump current/state | Stop locally; inspect | Critical | Edge action + escalation |
| Heavy rain expected | Forecast + current moisture | Delay or reduce irrigation | Medium | Digest or task update |
| Unsafe spray window | Rain/wind/RH/temp and planned spray task | Reschedule; consult agronomist | High | Work-order warning |
| Prolonged leaf wetness risk | Leaf wetness + temp/RH + approved crop model | Scout crop; agronomist review | Medium | Task; no automatic pesticide prescription |
| Heat/frost risk | Local temperature + forecast | Apply crop-specific protection plan | High | SMS/WhatsApp |
| Device silent | Missing data relative to expected interval | Technician inspection | Operational | Work order |
| Sensor stuck/drifting | Rate-of-change and cross-sensor checks | Suppress dependent advice; calibrate | Operational | Technician dashboard |
| Battery/solar low | Device telemetry | Service power system | Operational | Work order |

### 8.3 Alert controls

- Hysteresis prevents repeated triggering around a boundary.
- Cooldown prevents message storms.
- Deduplication combines correlated events.
- Quiet hours apply except to safety-critical alerts.
- Escalation occurs only if unacknowledged.
- Digest mode groups low-priority advisories.
- Rules automatically degrade or suspend when required input quality is poor.
- Every recommendation exposes its source and confidence to agronomists.

---

## 9. Technical architecture

```text
Field probes and meters
  ├─ SDI-12 / RS-485 Modbus / pulse / 4–20 mA
  └─ LoRaWAN nodes
          ↓
Solar farm gateway
  ├─ local encrypted queue (at least 7 days)
  ├─ local health and safety rules
  ├─ signed configuration and OTA updates
  └─ dual-SIM 4G backhaul where practical
          ↓ MQTT over TLS
Factora IoT platform
  ├─ device identity and registry
  ├─ schema validation and normalization
  ├─ immutable raw telemetry
  ├─ calibration and data-quality pipeline
  ├─ time-series query and aggregates
  ├─ rule/recommendation engine
  ├─ notification and acknowledgement service
  ├─ digital twin / latest state
  └─ audit and observability
          ↓ domain events / versioned APIs
Factora ERP
  ├─ customer, farm, plot, crop and season
  ├─ assets and maintenance
  ├─ inventory and inputs
  ├─ work orders and people
  ├─ water, energy and production costs
  └─ harvest, quality and financial outcomes
```

### 9.1 Connectivity

The platform supports more than one radio profile. The country pack selects the legal profile and certified hardware; the farm survey selects the practical option.

Global options:

- LoRaWAN using the regional parameters permitted in that country, such as EU863–870, US902–928, AS923, AU915–928, or IN865–867.
- Cellular backhaul or a direct cellular RTU where a gateway is uneconomical.
- Local wired SDI-12, RS-485 Modbus, pulse, or 4–20 mA where probes are close to the controller.
- Store-and-forward during outages, regardless of country.

Kenya launch profile:

- LoRaWAN EU863–870 where the Communications Authority permits the exact device, power, duty cycle, and antenna.
- Dual-SIM 4G gateway backhaul where coverage and power budgets support it.
- Confirm current approval, import, and licensed-provider requirements before buying a production batch. A LoRa Alliance regional profile does not prove national approval.

### 9.2 Data contracts

Canonical telemetry event:

```json
{
  "schemaVersion": "1.0",
  "tenantId": "ten_...",
  "countryCode": "KE",
  "deviceId": "dev_...",
  "siteId": "site_...",
  "plotId": "plot_...",
  "observedAt": "2026-10-12T12:30:00Z",
  "receivedAt": "2026-10-12T12:34:18Z",
  "sequence": 18442,
  "metrics": [
    {
      "channel": "soil_moisture_30cm",
      "value": 0.218,
      "unit": "m3/m3",
      "calibrationVersion": "cal_...",
      "quality": ["delayed"]
    }
  ],
  "deviceHealth": {
    "batteryV": 3.71,
    "rssi": -101,
    "firmware": "1.4.2"
  }
}
```

Required behaviors:

- Idempotency by device, sequence, and observation timestamp.
- Tolerate delayed and out-of-order events.
- Store timestamps in UTC and display them in the farm's time zone.
- Store measurements in SI units. Currency and display units come from the country pack or tenant preference.
- Validate units and ranges at ingestion.
- Keep raw payload for forensic analysis with controlled retention.
- Do not permit devices direct access to ERP databases.

### 9.3 Domain model

Core hierarchy:

`Tenant → Organization → Country site → Farm → Site/Block → Plot → Crop Season`

Country-pack hierarchy:

`Country pack → Locale → Administrative areas → Radio profile → Hardware catalogue → Crop-zone profiles → Regulatory terms`

Asset hierarchy:

`Gateway → Device → Sensor Channel → Calibration`

Decision hierarchy:

`Rule Version → Evaluation → Recommendation → Notification → Acknowledgement → Work Order → Outcome`

Important entities:

- Tenant, country pack, residency region, user, role, consent, notification preference, and locale.
- Farm boundary, plot boundary, water source, irrigation zone, time zone, and currency.
- Crop, variety, crop stage, crop profile, soil profile.
- Device model, device, channel, installation, calibration, maintenance.
- Observation, quality flag, aggregate.
- Rule template, tenant override, rule version, evaluation.
- Alert, recommendation, notification attempt, acknowledgement.
- Irrigation event, planned amount, actual flow/volume, response.
- Work order, assignment, completion evidence.
- Harvest, quality grade, input use, labor, water, energy, revenue.

### 9.4 Tenancy and security

- Put `tenant_id` on every customer-owned entity and enforce it at broker ACL, API authorization, database row policy, queue, cache, and object-storage prefix.
- Use a unique identity and revocable credentials per device. Never share one credential across a fleet.
- Encrypt transport north of the gateway; encrypt sensitive data at rest.
- Sign firmware and configuration updates; use secure boot where supported.
- Restrict commands by device capability and user role.
- Require dual authorization or an approved schedule for pump/valve control.
- Keep an immutable audit of remote commands, rule changes, recipients, and acknowledgements.
- Separate safety interlocks from cloud availability.
- Maintain a vulnerability and end-of-support policy for approved device models.

---

## 10. Analytics and model strategy

“Precision farm model” should mean a progression of decision models, not one opaque model.

### Level 0 — Data quality

Detect missing, delayed, impossible, stuck, drifting, or contradictory readings. Without this layer, later models amplify bad data.

### Level 1 — Agronomic rules

Use crop-stage and soil-specific thresholds, water balance, forecast adjustments, and operational constraints. Rules are explainable and can be approved by an agronomist.

### Level 2 — Plot water balance

Estimate crop water need using weather, reference evapotranspiration, crop coefficient, rainfall, irrigation volume, and soil response. Calibrate against observed field behavior.

### Level 3 — Forecasting and anomaly detection

After enough clean history:

- Forecast time to water stress.
- Detect unusual flow, pump behavior, sensor drift, or crop response.
- Rank plots by urgency.
- Estimate water required to restore the target zone.

### Level 4 — Optimization

Optimize irrigation schedules across water, pump capacity, electricity/solar availability, labor, and crop priority. Keep constraints explainable and provide an operator override.

### Level 5 — Controlled automation

Only after advisory performance and hardware safety pass explicit gates:

- Edge controller executes an approved irrigation plan.
- Local maximum runtime, dry-run, pressure, and tank-level interlocks override cloud commands.
- Flow verifies execution.
- Operator can stop locally.
- The system fails safe during lost connectivity.

### Training and evaluation requirements

- Split evaluation by farm and season, not random readings from the same farm.
- Compare against fixed schedules and agronomist practice.
- Measure agronomic and economic outcomes, not prediction accuracy alone.
- Check performance across country, administrative area, soil type, crop stage, farm size, and phone-access cohorts. Kenya reporting includes county and ward.
- Record model/rule version and feature values for every decision.
- Do not train on personally identifiable farmer data unless necessary, lawful, documented, and consented where required.

---

## 11. Factora ERP integration

### Product navigation

Add a **Precision Farming** area to `iot.factoraerp.com`:

1. **Today** — prioritized actions, critical assets, weather, and acknowledgment state.
2. **Map** — farms and plots colored by actionable status, not raw sensor color alone.
3. **Plots** — crop stage, root-zone profile, irrigation history, and current recommendation.
4. **Water** — source/tank balance, consumption, pump runtime, leaks, cost, and yield per cubic metre.
5. **Devices** — commissioning, health, calibration, firmware, and maintenance.
6. **Rules** — agronomist-managed profiles, versions, overrides, and approval.
7. **Reports** — season comparison, water productivity, uptime, actions, outcomes, and compliance exports.

### ERP event examples

- `iot.alert.created` creates or updates a work order.
- `irrigation.recommended` reserves labor and expected water.
- `irrigation.completed` posts actual volume and energy cost to plot/season.
- `device.maintenance_due` creates an asset service task.
- `crop.stage.changed` selects the next approved threshold set.
- `inventory.application.recorded` can be checked against weather/spray-window risk.
- `harvest.recorded` closes the outcome loop for water and margin analysis.

Use an outbox/event boundary so an IoT outage does not corrupt ERP transactions and an ERP outage does not stop edge safety behavior.

---

## 12. Privacy, regulation, and responsible advice

Regulation is implemented through country packs. The global product supplies the controls; each market supplies the legal content and evidence. This section is not legal advice. Counsel in every operating country must review the pack before launch.

### Global controls

- Identify the operator, customer, installer, and subprocessor roles for each country.
- Keep personal data, farm boundaries, device telemetry, and aggregated agronomy separate.
- Record a purpose, lawful basis, notice, retention period, and residency region for each processing activity.
- Support access, correction, deletion, export, and consent withdrawal where the applicable law provides those rights.
- Separate service alerts from marketing permissions.
- Keep an inventory of cross-border transfers, support access, backups, and any use of data for model training.
- Store device approvals against the exact hardware model and firmware family.
- Treat pesticide and fertilizer guidance as regulated advice. Route product-specific recommendations through the country's registered-input rules and a qualified reviewer.
- Never claim guaranteed yield, diagnosis, safety, or government endorsement.

### 12.1 Kenya data protection

Kenya's Data Protection Act 2019 applies when farm data can identify a person. Names, phone numbers, precise farm boundaries, GPS, photos, property details, and linked financial or production records require careful treatment.

Before pilot enrollment:

- Identify Factora's controller/processor role and each partner's role.
- Establish a lawful basis for each purpose.
- Give a clear, channel-appropriate privacy notice.
- Separate operational alerts from marketing consent.
- Minimize collection and define retention/deletion schedules.
- Execute processor and data-sharing agreements.
- Provide access, correction, objection, portability, and deletion processes where applicable.
- Assess ODPC registration obligations.
- Complete a DPIA before high-risk, large-scale, combined, or automated processing.
- Document safeguards for cross-border hosting or subprocessors.
- Maintain incident response capable of meeting statutory notification deadlines.

Farmers must not lose service or subsidy access merely because they decline unrelated analytics, marketing, or data resale.

### 12.2 Kenya communications equipment and spectrum

The Communications Authority regulates radio equipment, type approval, spectrum use, telecommunications services, numbering, and related providers. Its requirements belong in the Kenya country pack and must be revalidated for every later country.

Before purchasing a production batch:

- Confirm approval for each exact radio module/device model.
- Confirm allowed bands, power, duty cycle, antenna, and installation.
- Use licensed vendors and network/service partners where required.
- Keep approval certificates, test reports, import records, and SKU mapping.
- Validate cellular SIM registration and eSIM requirements.
- Contract an MNO or properly licensed messaging provider for SMS/USSD services.

### 12.3 Kenya agronomic and pesticide advice

Rules concerning chemical products should be reviewed by a qualified local agronomist. In Kenya, they must comply with PCPB registration, label, advertising, and consumer-protection requirements. Another country's pesticide authority and label rules replace this pack; they do not reuse Kenyan product registrations.

Product safeguards:

- Prefer scouting and timing recommendations over automatic chemical prescriptions.
- Refer to registered labels and approved uses.
- Never recommend an unregistered product or unsupported dose.
- Require human review for high-risk or restricted products.
- Show confidence and limitations.
- Log the advice, data, rule version, reviewer, and farmer response.
- Do not claim guaranteed yield, diagnosis, safety, or government endorsement.

---

## 13. Delivery plan and gates

The stages below are capability and evidence gates, not calendar estimates.

### Stage A — Discovery and partner selection

Deliverables:

- Select Kenya as the first country pack, then one value chain, one or two counties, and one anchor partner.
- Define the global and country-pack boundary in the data model before building screens.
- Interview farm owners, operators, agronomists, technicians, and county stakeholders.
- Document current irrigation decisions, costs, failure modes, languages, and phone access.
- Map the existing Factora ERP architecture, tenancy model, APIs, and notification stack.
- Test mobile signal, LoRa propagation, power, theft risk, and installation access on candidate sites.
- Establish baseline water, yield, quality, labor, and input records.
- Complete regulatory and privacy assessment.

Exit gate:

- Named payer and users.
- Quantified decision problem and baseline.
- Pilot sites and control design agreed.
- Hardware approval path confirmed.
- Data rights and responsibilities signed.

### Stage B — Platform foundation and bench validation

Deliverables:

- Tenant-safe device registry, country pack, locale, currency, and residency region.
- Hardware catalogue that can contain approvals for more than one country.
- MQTT ingestion, canonical schema, raw store, time-series store, quality flags, and audit.
- Gateway store-and-forward and health monitoring.
- Installer workflow and approved hardware catalogue.
- Rules engine, notification service, acknowledgements, and ERP work-order bridge.
- Simulated devices and hardware-in-the-loop tests.

Exit gate:

- No cross-tenant or unauthorized cross-country access in security tests.
- Kenya and a simulated second country pack can run without a code fork.
- Delayed, duplicate, reordered, and malformed messages handled correctly.
- Seven-day offline buffer demonstrated.
- Device revocation and credential rotation demonstrated.
- Alert evidence and rule version are auditable.

### Stage C — Observational field pilot

Sensors operate in shadow mode. Agronomists see recommendations; farmers follow existing practice.

Deliverables:

- Installation QA and local calibration.
- Connectivity, solar, battery, sensor drift, maintenance, and theft data.
- Comparison between sensor signals and agronomist observations.
- Threshold tuning without operational dependence.

Exit gate:

- Sensor uptime and data completeness meet agreed targets.
- False critical alerts are within an acceptable rate.
- Soil and flow readings are validated against reference checks.
- Maintenance workload and costs are understood.

### Stage D — Advisory pilot

Send approved recommendations and create work orders, while farmers retain control.

Deliverables:

- Multichannel actions using Kenya's English and Kiswahili templates, through the global template system.
- Acknowledgement and outcome tracking.
- Treatment/control or stepped-wedge evaluation.
- Weekly agronomist review of misses, false alerts, and adverse events.
- Water, labor, yield, quality, and margin reporting.

Exit gate:

- Users act on a meaningful share of recommendations.
- Water or operational savings are measurable without harm to yield/quality.
- Partner willingness to pay covers a credible share of service cost.
- No unresolved high-severity privacy, safety, or regulatory issue.

### Stage E — Commercial release

Deliverables:

- Support and maintenance SLAs.
- Device replacement, calibration, and spare-parts process.
- Subscription, billing, and partner administration.
- Country, zone, and crop profile governance.
- Operational dashboards and incident response.
- Onboarding playbook and training materials.

Exit gate:

- Positive contribution-margin path at target deployment density.
- Hardware and field-support capacity can scale.
- Retention into a second season.

### Stage F — Controlled actuation

Deliverables:

- Edge safety controller, manual stop, pressure/flow/tank interlocks.
- Signed commands, replay protection, role controls, and dual approval.
- Fail-safe behavior for cloud, power, radio, and sensor loss.
- Insurance and liability review.

Exit gate:

- Independent safety review and fault-injection tests pass.
- Advisory accuracy and execution verification meet agreed thresholds.
- Explicit customer opt-in and trained local operators.

---

## 14. Pilot design

### Suggested shape

- One anchor organization.
- One or two crop/county combinations, not a nationwide mixture.
- 25–100 instrumented plots depending on farm density and budget.
- Comparable control plots or a stepped-wedge rollout.
- Shared weather and gateway infrastructure where scientifically appropriate.
- One full crop cycle plus pre-installation baseline data.

### Baseline measurements

- Water source and irrigation method.
- Estimated and metered water per event.
- Pump energy/fuel and runtime.
- Irrigation labor and schedule.
- Input use and spray events.
- Yield, rejected quantity, quality grade, price, and gross margin.
- Existing crop loss and irrigation failure incidents.
- Current communication and record-keeping process.

### Success scorecard

| Area | Metric |
|---|---|
| Reliability | Sensor uptime, gateway uptime, data completeness, median delay |
| Quality | Calibration pass rate, drift incidents, false critical-alert rate |
| Adoption | Acknowledgement rate, action completion, median response time, second-season retention |
| Water | m³/ha, irrigation events avoided, leak volume detected, yield per m³ |
| Agronomy | Yield/ha, marketable yield, quality grade, crop loss |
| Economics | Net margin/ha, labor cost, energy cost, contribution margin per farm-season |
| Operations | Install time, support tickets/100 devices, truck rolls, device loss/damage |
| Inclusion | Outcomes by farm size, gender, phone type, language, and connectivity |
| Safety | Harmful recommendation or actuation events; pesticide guardrail breaches |

Define target values with the pilot partner after baseline measurement. Do not invent percentage savings before field evidence.

---

## 15. Commercial model

### Recommended packaging

**Organization platform subscription**

- Tenant administration, farms/plots, dashboards, agronomist rules, ERP integration, reporting, and support.

**Site connectivity fee**

- Gateway, data plan, network management, monitoring, and maintenance.

**Sensor kit lease or sale**

- Water/soil base kit with installation and scheduled calibration.

**Premium modules**

- Fertigation EC/pH service, disease-risk sensors, pump controls, advanced reports, or dedicated support.

Prefer leasing or managed service for early deployments. Factora then controls calibration, replacement, firmware, and support quality instead of leaving farms with unsupported hardware.

### Unit economics template

For each farm cluster, calculate:

```text
Annual recurring revenue
+ installation revenue
+ hardware margin or lease revenue
- hardware depreciation/replacement
- gateway and connectivity
- SMS/WhatsApp/USSD
- cloud and storage
- field installation and travel
- scheduled calibration and maintenance
- support and agronomist review
- loss, theft, warranty and spares
- regulatory/compliance allocation
= contribution margin
```

Track:

- Devices and hectares per gateway.
- Revenue and support cost per farm-season.
- Customer acquisition cost by cooperative/exporter/direct channel.
- Payback in crop seasons.
- Incremental farm margin relative to subscription price.
- Message cost per acknowledged action.

Do not base the business case on selling farmer data. Any later consented analytics product should have a separate purpose, contract, and benefit-sharing model.

---

## 16. Team and ownership

| Capability | Responsibility |
|---|---|
| Product lead | Segment, outcomes, roadmap, partner and commercial decisions |
| Agronomy lead | Crop profiles, thresholds, safety, rule approval, outcome review |
| IoT/embedded engineer | Devices, power, firmware, gateway, OTA, field diagnostics |
| Platform engineer | Broker, ingestion, registry, tenancy, storage, APIs, observability |
| ERP engineer | Domain model, work orders, assets, costs, billing, UI integration |
| Data engineer/scientist | Quality, water balance, experimentation, later models |
| Field operations lead | Site survey, installation, calibration, maintenance, training |
| Security/privacy lead | DPIA, contracts, controls, incident response, audits |
| Country regulatory counsel | Kenya first: ODPC, CA, messaging, contracts, and advisory liability. Repeat per country pack |
| Localization and country-pack owner | Languages, units, geography, hardware approvals, and market configuration |
| Partner agronomists/extension | Local validation, user support, escalation |

The agronomy and field-operations functions are core product capabilities, not temporary pilot support.

---

## 17. Major risks and mitigations

| Risk | Consequence | Mitigation |
|---|---|---|
| Uncalibrated soil sensors | Wrong irrigation and lost trust | Local calibration, reference checks, quality flags, advisory-only start |
| Weak willingness to pay | Hardware-heavy pilot never commercializes | Anchor payer, high-value crop, baseline economics, stage gates |
| Connectivity/power failure | Missing or delayed alerts | Solar sizing, local queue, dual-SIM, edge rules, health alerts |
| Theft, livestock, weather damage | High replacement cost | Tamper-resistant mounts, conduit, asset register, spares and insurance |
| Alert fatigue | Users ignore critical events | Hysteresis, cooldown, severity, digest, escalation |
| Dangerous pesticide advice | Harm and liability | Scouting-first design, registered labels, agronomist review, audit |
| Remote-control failure | Crop, pump, or safety damage | Defer automation; edge interlocks, manual stop, fault tests |
| Tenant data leakage | Privacy and contractual breach | Layered tenant enforcement and security testing |
| Regulatory mismatch | Import, privacy, or deployment delay | Country-pack review before hardware purchase; local counsel in each market |
| Kenya-specific hardcoding | A second country requires a product fork | SI units, UTC, country packs, template-based messages, and a simulated second country in testing |
| Public data source instability | Broken recommendations | Cache, provenance, fallback provider, no unverified critical dependency |
| “AI” overpromising | Poor decisions and reputational loss | Explainable rules first, outcome evaluation, confidence and human override |
| Partner bias in pilot | Results do not generalize | Controls, stratification, full-season evaluation, independent review |

---

## 18. Decisions needed before engineering starts

1. Which countries and value chains does Factora already serve, and which Kenya segment will launch first?
2. Who is the paying customer in Kenya: farm, cooperative, exporter, county program, or input/irrigation partner?
3. Which later markets must the data model accommodate now, even if they are not launched?
4. What farm, plot, crop, inventory, work-order, currency, and accounting functions already exist in Factora ERP?
5. Does Factora already have a device broker, tenant model, localization, messaging provider, and field-service workflow?
6. Which water sources and irrigation methods dominate the candidate Kenyan farms?
7. Which agronomist or research institution will approve the first Kenya crop profiles?
8. Which exact hardware models have Kenyan approval, local spares, and equivalents that can later be approved elsewhere?
9. Where is Factora data hosted, and which subprocessors and countries can receive farmer data?
10. What outcome would cause the Kenya pilot partner to buy, and what evidence would justify opening country pack two?

---

## 19. Immediate next actions

1. Appoint one global product owner, one agronomy owner, and one Kenya country-pack owner.
2. Record the global-core and country-pack boundary before ERP schema design.
3. Select three candidate Kenyan anchor partners and score them on farm density, crop value, irrigation, records, agronomy support, and willingness to pay.
4. Run structured field discovery and an RF/power/site survey.
5. Audit Factora ERP APIs, tenancy, localization, currency, work orders, notification stack, and hosting regions.
6. Obtain quotations and Kenyan approval evidence for two sensor/gateway vendors; bench-test both.
7. Draft the Kenya pilot protocol, privacy notice, consent terms, data-sharing agreement, and DPIA.
8. Define one Kenya crop-zone profile and the first 10–12 global rule templates with a Kenyan agronomist.
9. Add a simulated second country pack in testing to prove that language, currency, geography, and radio profile are configuration.
10. Capture baseline operational and economic data before installing hardware.
11. Build the platform foundation only after the partner, hardware, baseline, and compliance gates are satisfied.

---

## 20. Research sources

Kenya sources support the first country pack. Global standards define the platform behavior that must remain stable across countries.

### Global methods and standards

- FAO Irrigation and Drainage Paper 56, *Crop evapotranspiration*:  
  https://www.fao.org/4/x0490e/x0490e00.htm
- FAO WaPOR water-productivity programme:  
  https://www.fao.org/in-action/remote-sensing-for-water-productivity/en
- LoRa Alliance RP002 regional parameters:  
  https://resources.lora-alliance.org/technical-specifications/rp002-1-0-5-lorawan-regional-parameters
- OASIS MQTT 5.0:  
  https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- NISTIR 8259A, IoT Device Cybersecurity Capability Core Baseline:  
  https://nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8259A.pdf
- ITU-T Y.4495, IoT requirements and data models for smart greenhouse service:  
  https://www.itu.int/rec/T-REC-Y.4495

### Kenya agriculture and water

- Kenya National Bureau of Statistics, *National Agriculture Production Report 2024*:  
  https://www.knbs.or.ke/wp-content/uploads/2025/01/National-Agriculture-Production-Report-2024.pdf
- KNBS, *Economic Survey 2025* and popular version:  
  https://www.knbs.or.ke/wp-content/uploads/2025/05/2025-Economic-Survey.pdf  
  https://www.knbs.or.ke/wp-content/uploads/2025/05/2025-Economic-Survey-Popular-Version.pdf
- Government of Kenya, *Agricultural Sector Transformation and Growth Strategy*:  
  https://faolex.fao.org/docs/pdf/ken189053.pdf
- KIPPRA, *Implications of Agricultural Land Subdivision in Kenya*:  
  https://kippra.or.ke/implications-of-agricultural-land-subdivision-in-kenya/
- FAO Family Farming Data Portrait, Kenya:  
  https://www.fao.org/family-farming/data-sources/dataportrait/country-details/en/?cnt=KEN
- Ministry of Water, Sanitation and Irrigation, *National Irrigation Sector Investment Plan*:  
  https://www.irrigation.go.ke/sites/default/files/downloads/National%20Irrigation%20Sector%20Investment%20Plan%20%28NISIP%29.pdf
- FAO WaPOR Kenya country activities:  
  https://www.fao.org/in-action/remote-sensing-for-water-productivity/country-activities/kenya/3/en

### Digital access and agriculture services

- Communications Authority of Kenya/KNBS, ICT analytical report based on the 2023/24 Kenya Housing Survey:  
  https://www.ca.go.ke/sites/default/files/2025-08/ICT%20Analytical%20Report%20Based%20on%202023-2024%20Kenya%20Housing%20Survey_0.pdf
- GSMA, *AI for Africa: Kenya deep dive*:  
  https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/07/KENYA_AIforAfrica.pdf
- 60 Decibels, *Digital Agriculture Services in Kenya* (2024):  
  https://60decibels.com/wp-content/uploads/2024/09/60-Decibels-Digital-Agriculture-Services-in-Kenya.pdf
- KALRO, Kenya Agricultural Observatory Platform:  
  https://kaop.co.ke/
- World Bank, digital agriculture results in Kenya:  
  https://www.worldbank.org/en/results/2023/06/07/scaling-up-disruptive-technologies-for-agricultural-productivity-in-kenya

### Telecom and IoT regulation

- Communications Authority, *Guidelines on the Use of Radiofrequency Spectrum by Short Range Devices 2022*:  
  https://www.ca.go.ke/sites/default/files/2023-06/Guidelines-on-the-Use-of-Radiofrequency-Spectrum-by-Short-Range-Devices-2022.pdf
- Communications Authority, Type Approval application form (June 2025):  
  https://www.ca.go.ke/sites/default/files/2025-06/Type%20Approval%20Application%20Form%20June%202025.pdf
- Kenya Information and Communications (Importation, Type Approval and Distribution of Communications Equipment) Regulations 2010:  
  https://www.ca.go.ke/sites/default/files/2023-06/Importation-Type-Approval-And-Distribution-Of-Communications-Equipment-Regulations-2010-1.pdf
- Communications Authority, IoT device guidelines:  
  https://www.ca.go.ke/sites/default/files/2023-06/Guidelines-on-the-use-of-Internet-of-Things-IoT-Devices.pdf

### Kenya privacy and responsible use

- Kenya Data Protection Act 2019:  
  https://www.odpc.go.ke/wp-content/uploads/2024/02/TheDataProtectionAct__No24of2019.pdf
- Data Protection (General) Regulations 2021:  
  https://www.odpc.go.ke/wp-content/uploads/2024/03/THE-DATA-PROTECTION-GENERAL-REGULATIONS-2021-1.pdf
- Data Protection (Registration of Data Controllers and Data Processors) Regulations 2021:  
  https://www.odpc.go.ke/wp-content/uploads/2024/03/THE-DATA-PROTECTION-REGISTRATION-OF-DATA-CONTROLLERS-AND-DATA-PROCESSORS-REGULATIONS-2021.pdf
- Ministry of Agriculture, KIAMIS Data Governance Framework:  
  https://kilimo.go.ke/wp-content/uploads/2025/02/DATA_GOVERNANCE_FRAMEWORK_TODATE_REVISED_8.10.241-edited.pdf
- Pest Control Products Board:  
  https://www.pcpb.go.ke/
- Pest Control Products Act:  
  https://new.kenyalaw.org/akn/ke/act/1982/4
- Pest Control Products (Labelling, Advertising and Packaging) Regulations 2024:  
  https://new.kenyalaw.org/akn/ke/act/ln/2024/99/eng@2024-06-21

### Sensor quality

- IAEA, field estimation of soil water content and sensor limitations:  
  https://www-pub.iaea.org/mtcd/publications/pdf/tcs-30_web.pdf
- FAO GLOSOLAN, soil electrical conductivity SOP:  
  https://openknowledge.fao.org/server/api/core/bitstreams/80c029bc-0dc5-4060-8b14-1dbcc20e6528/content

### Evidence cautions

- Farm-size, irrigation-area, smartphone, and coverage figures vary by year and definition. Use them to size the first market, not as permanent product assumptions.
- Coverage is not the same as reliable farm-level signal, and connected-handset counts are not the same as individual farmer smartphone ownership.
- Vendor-reported yield or water-saving claims should not enter Factora forecasts without an independent field baseline in the operating country.
- Government and third-party data portals may not provide production-grade APIs or guaranteed uptime.
- A crop threshold, radio approval, or privacy term validated in Kenya must be revalidated before reuse in another country.

