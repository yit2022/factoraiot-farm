# Factora Precision Farming Kenya

## Research, product strategy, and implementation plan

**Prepared:** 12 October 2026  
**Product surface:** `iot.factoraerp.com`  
**Status:** Discovery and implementation blueprint  
**Important:** Regulatory sections are planning guidance, not legal advice.

---

## 1. Executive recommendation

Build the first release as an **offline-first water and crop-risk module inside Factora ERP**, not as a separate generic farm app and not as an autonomous “AI agronomist.”

The product should:

1. Measure soil moisture at crop-root depths, local weather, tank level, irrigation flow, and equipment health.
2. Combine those observations with crop stage, plot, soil, irrigation, work-order, inventory, and cost records already managed by the ERP.
3. Turn readings into a small number of specific actions: irrigate, stop irrigation, inspect a leak, refill a tank, delay spraying, protect a crop from heat/frost, or service a device.
4. Deliver actions through the channel each role can use: dashboard and WhatsApp for managers, SMS/voice for field workers and feature-phone farmers, and in-app work orders for operational teams.
5. Begin with deterministic, agronomist-approved rules. Add predictive models only after collecting calibrated Kenyan field data and measuring whether the rules improve outcomes.

### Recommended beachhead

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

---

## 2. Product thesis

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
3. **Local context before national averages.** Crop, growth stage, soil, irrigation method, and agroecological zone determine thresholds.
4. **Raw data remains immutable.** Store raw, calibrated, and quality-flagged values separately.
5. **Offline is normal.** Gateways buffer readings and local safety rules continue without cloud connectivity.
6. **Feature phones are first-class.** A smartphone-only product excludes many intended users.
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

## 3. Kenya market and operating context

### 3.1 Segments

| Segment | Need | Ability to pay | Recommended offer |
|---|---|---:|---|
| Commercial irrigated farm | Water, fertigation, labor, compliance, asset uptime | High | Dedicated sensors, gateways, dashboard, work orders |
| Exporter/outgrower scheme | Quality, traceability, consistent practice across growers | High at organization level | Shared infrastructure, grower alerts, compliance reporting |
| Cooperative/irrigation scheme | Shared water allocation, pump and scheme health | Medium | Shared gateways and meters; organization subscription |
| High-value smallholder cluster | Timely irrigation and spray decisions | Medium if aggregated | Sensor-as-a-service through cooperative/agent |
| Rain-fed smallholder | Planting and weather risk | Low individually | Shared station plus SMS advisory; avoid per-farm kit |
| Dairy/livestock enterprise | Animal health, milk chilling, water | Potentially high | Later vertical after crop/water product is stable |

### 3.2 Agroecological variation

Kenya cannot use one national threshold set. Highland horticulture, Rift Valley cereals, coastal farming, and arid and semi-arid lands differ in rainfall pattern, temperature, soil, water source, crop calendar, and disease pressure.

The system needs:

- Plot GPS and county/ward.
- Crop variety, planting date, and phenological stage.
- Soil texture and locally calibrated field capacity/wilting reference.
- Irrigation method and emitter/flow characteristics.
- Separate long-rains, short-rains, and local season calendars.
- Rules approved for a crop-zone combination, not merely a crop name.

### 3.3 Digital channels

National SIM or coverage figures overstate what an individual farmer can use. Product design should assume:

- A shared or feature phone may be the farmer's only device.
- Internet may be intermittent even where coverage maps show service.
- SMS delivery is useful but not proof the message was understood or acted on.
- Managers and agronomists are more likely to use web or WhatsApp.
- Kiswahili and English are baseline languages; partner research should determine where another local language is necessary.
- Voice/IVR is a later accessibility option for low-literacy or urgent scenarios.

### 3.4 Existing public data and ecosystem

Factora should integrate available public or partner data rather than attempt to replace national systems:

- Kenya Meteorological Department data and forecasts where licensing and service access permit.
- KALRO's Kenya Agricultural Observatory Platform (KAOP) and extension content.
- FAO WaPOR remote-sensing water productivity where relevant.
- KNBS and Ministry of Agriculture production data for market and benchmark analysis.
- County agriculture officers, KALRO researchers, irrigation authorities, and cooperatives for validation.

Availability does not imply a production API or service-level agreement. Each source needs a data-sharing, licensing, update-frequency, and reliability check before it is put on a critical path.

---

## 4. Users and jobs to be done

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

## 5. Core workflows

### 5.1 Farm onboarding

1. Create or select the ERP customer organization.
2. Create farms, fields, blocks, and plots with boundaries.
3. Record owner/manager and notification preferences with privacy notice.
4. Add crop, variety, planting date, expected harvest, and irrigation method.
5. Record soil texture and baseline lab/field measurements.
6. Select an agronomist-approved crop profile for the local zone.
7. Register sensor and gateway assets against the correct plot.
8. Complete installation QA: GPS, depth, orientation, photos, battery, radio test, calibration, and acceptance.
9. Run a soak period during which recommendations are visible to agronomists but not automatically sent to farmers.

### 5.2 Daily decision loop

1. Sensors report and the gateway stores and forwards readings.
2. Ingestion validates schema, time, identity, and plausible ranges.
3. Calibration is applied without overwriting raw readings.
4. The rules engine evaluates current state, forecast, crop stage, prior irrigation, and cooldown.
5. A recommendation is generated with severity, evidence, confidence, action, deadline, and recipient.
6. Critical events create ERP work orders and notifications.
7. The assignee acknowledges, acts, defers, or rejects.
8. Flow and moisture response verify whether the action occurred and had the expected effect.
9. The outcome is captured for agronomic tuning and impact reporting.

### 5.3 Device maintenance

1. Detect a silent, stuck, drifting, low-battery, or implausible sensor.
2. Suppress agronomic recommendations that depend on untrustworthy data.
3. Create a technician work order with diagnostics.
4. Record inspection, cleaning, recalibration, repair, replacement, and new baseline.

### 5.4 Advisory approval

Rules move through `draft → agronomist review → pilot → approved → retired`. Each alert records the rule version and inputs used. A changed rule must not rewrite old decisions.

---

## 6. Sensor strategy

### 6.1 Minimum viable plot kit

| Measurement | Purpose | Initial recommendation | Key caveat |
|---|---|---|---|
| Soil moisture | Irrigation need and root-zone response | Capacitance/FDR at two or three crop-specific depths | Must be calibrated to local soil; affected by salinity, clay, placement, and air gaps |
| Soil temperature | Root-zone and interpretation context | Combined with moisture profile | Sensor depth matters |
| Air temperature and humidity | Heat, frost, evapotranspiration and disease context | Shielded, ventilated probe | Unshielded readings are misleading in direct sun |
| Rainfall | Irrigation adjustment and spray timing | Leveled tipping bucket with debris protection | Wind undercatch and clogging require maintenance |
| Tank level | Water availability | Ultrasonic for suitable clean tanks; hydrostatic where foam/turbulence makes ultrasound unreliable | Convert height to volume using tank geometry |
| Mainline flow | Consumption, irrigation verification, leak detection | Pulse meter or suitable inline meter | K-factor, low-flow sensitivity, debris, and pipe conditions matter |
| Gateway health | Reliability | Battery, solar charge, signal, storage, firmware, clock | Must be visible as operational data |

### 6.2 Premium add-ons

- Inline EC and pH only for fertigation customers who can support frequent cleaning and calibration.
- Leaf wetness for crops where an agronomist can provide a validated disease-risk model.
- Pump current/pressure for dry-run, blocked line, and maintenance diagnosis.
- Weather station wind speed/direction when spray-window guidance is in scope.

### 6.3 Avoid misleading hardware claims

Low-cost “NPK soil sensors” often infer nutrient status indirectly and cannot replace soil laboratory analysis. Do not market continuous nutrient readings unless the device is independently validated for the local soil and use case.

### 6.4 Installation and calibration

Every installation record should include:

- Manufacturer, model, serial number, firmware, and approval evidence.
- Plot, coordinates, soil type, sensor depth, installation method, and photo.
- Crop and root-zone rationale.
- Raw baseline and calibration equation/version.
- Installer, date, next inspection, and next calibration.
- Radio signal, battery/solar readings, and a test event.

For soil moisture, use plot-specific calibration where possible. At minimum, establish meaningful local wet and dry reference points and validate readings after irrigation and rainfall. Never present uncalibrated volumetric water content as precision truth.

---

## 7. Notifications and decision rules

### 7.1 Notification payload

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

### 7.2 Initial alert catalogue

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

### 7.3 Alert controls

- Hysteresis prevents repeated triggering around a boundary.
- Cooldown prevents message storms.
- Deduplication combines correlated events.
- Quiet hours apply except to safety-critical alerts.
- Escalation occurs only if unacknowledged.
- Digest mode groups low-priority advisories.
- Rules automatically degrade or suspend when required input quality is poor.
- Every recommendation exposes its source and confidence to agronomists.

---

## 8. Technical architecture

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

### 8.1 Connectivity

Recommended default:

- **LoRaWAN EU863–870 profile**, subject to current Communications Authority requirements, for multiple low-bandwidth sensors on a farm or cluster.
- **Dual-SIM 4G gateway** for backhaul, with store-and-forward during outages.
- Direct cellular RTU only for isolated assets where a gateway is uneconomical.
- Local wired Modbus/SDI-12 where probes are close to the gateway/controller.

Before selecting hardware, confirm current CA frequency, duty-cycle, power, type-approval, import, and licensed-provider requirements. A LoRa Alliance regional profile does not by itself prove Kenyan regulatory approval.

### 8.2 Data contracts

Canonical telemetry event:

```json
{
  "schemaVersion": "1.0",
  "tenantId": "ten_...",
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
- Record device time and receive time.
- Validate units and ranges at ingestion.
- Keep raw payload for forensic analysis with controlled retention.
- Do not permit devices direct access to ERP databases.

### 8.3 Domain model

Core hierarchy:

`Tenant → Organization → Farm → Site/Block → Plot → Crop Season`

Asset hierarchy:

`Gateway → Device → Sensor Channel → Calibration`

Decision hierarchy:

`Rule Version → Evaluation → Recommendation → Notification → Acknowledgement → Work Order → Outcome`

Important entities:

- Tenant, user, role, consent, notification preference.
- Farm boundary, plot boundary, water source, irrigation zone.
- Crop, variety, crop stage, crop profile, soil profile.
- Device model, device, channel, installation, calibration, maintenance.
- Observation, quality flag, aggregate.
- Rule template, tenant override, rule version, evaluation.
- Alert, recommendation, notification attempt, acknowledgement.
- Irrigation event, planned amount, actual flow/volume, response.
- Work order, assignment, completion evidence.
- Harvest, quality grade, input use, labor, water, energy, revenue.

### 8.4 Tenancy and security

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

## 9. Analytics and model strategy

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
- Check performance across county, soil type, crop stage, farm size, and gender/phone-access cohorts.
- Record model/rule version and feature values for every decision.
- Do not train on personally identifiable farmer data unless necessary, lawful, documented, and consented where required.

---

## 10. Factora ERP integration

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

## 11. Privacy, regulation, and responsible advice

### 11.1 Data protection

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

### 11.2 Communications equipment and spectrum

The Communications Authority regulates radio equipment, type approval, spectrum use, telecommunications services, numbering, and related providers.

Before purchasing a production batch:

- Confirm approval for each exact radio module/device model.
- Confirm allowed bands, power, duty cycle, antenna, and installation.
- Use licensed vendors and network/service partners where required.
- Keep approval certificates, test reports, import records, and SKU mapping.
- Validate cellular SIM registration and eSIM requirements.
- Contract an MNO or properly licensed messaging provider for SMS/USSD services.

### 11.3 Agronomic and pesticide advice

Rules concerning chemical products should be reviewed by a qualified Kenyan agronomist and comply with PCPB registration, label, advertising, and consumer-protection requirements.

Product safeguards:

- Prefer scouting and timing recommendations over automatic chemical prescriptions.
- Refer to registered labels and approved uses.
- Never recommend an unregistered product or unsupported dose.
- Require human review for high-risk or restricted products.
- Show confidence and limitations.
- Log the advice, data, rule version, reviewer, and farmer response.
- Do not claim guaranteed yield, diagnosis, safety, or government endorsement.

---

## 12. Delivery plan and gates

The stages below are capability and evidence gates, not calendar estimates.

### Stage A — Discovery and partner selection

Deliverables:

- Select one value chain, one or two counties, and one anchor partner.
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

- Tenant-safe device registry and provisioning.
- MQTT ingestion, canonical schema, raw store, time-series store, quality flags, and audit.
- Gateway store-and-forward and health monitoring.
- Installer workflow and approved hardware catalogue.
- Rules engine, notification service, acknowledgements, and ERP work-order bridge.
- Simulated devices and hardware-in-the-loop tests.

Exit gate:

- No cross-tenant access in security tests.
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

- Multichannel actions in English/Kiswahili.
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
- County/crop profile governance.
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

## 13. Pilot design

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

## 14. Commercial model

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

## 15. Team and ownership

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
| Kenyan legal/regulatory counsel | ODPC, CA, messaging, contracts, advisory liability |
| Partner agronomists/extension | Local validation, user support, escalation |

The agronomy and field-operations functions are core product capabilities, not temporary pilot support.

---

## 16. Major risks and mitigations

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
| Regulatory mismatch | Import/deployment delay or sanctions | CA verification before purchasing hardware; local counsel |
| Public data source instability | Broken recommendations | Cache, provenance, fallback provider, no unverified critical dependency |
| “AI” overpromising | Poor decisions and reputational loss | Explainable rules first, outcome evaluation, confidence and human override |
| Partner bias in pilot | Results do not generalize | Controls, stratification, full-season evaluation, independent review |

---

## 17. Decisions needed before engineering starts

1. Which value chain and counties does Factora already serve?
2. Who is the paying customer: farm, cooperative, exporter, county program, or input/irrigation partner?
3. What farm, plot, crop, inventory, work-order, and accounting functions already exist in Factora ERP?
4. Does Factora already have a device broker, tenant model, mobile app, messaging provider, and field-service workflow?
5. Which water sources and irrigation methods dominate candidate farms?
6. What languages and phone types do operators use?
7. Which agronomist or research institution will approve crop profiles?
8. Which exact hardware models have Kenyan approval and local spares/support?
9. Where is Factora data hosted, and which subprocessors receive farmer data?
10. What outcome would cause the pilot partner to buy after the pilot?

---

## 18. Immediate next actions

1. Appoint one product owner and one agronomy owner.
2. Select three candidate anchor partners and score them on farm density, crop value, irrigation, records, agronomy support, and willingness to pay.
3. Run structured field discovery and an RF/power/site survey.
4. Audit the current Factora ERP APIs, tenancy, work orders, notification stack, and hosting.
5. Obtain quotations and Kenyan approval evidence for two sensor/gateway vendors; bench-test both.
6. Draft the pilot protocol, privacy notice, consent/contract terms, data-sharing agreement, and DPIA.
7. Define one crop profile and the first 10–12 rules with a Kenyan agronomist.
8. Capture baseline operational and economic data before installing hardware.
9. Build Stage B only after the partner, hardware, baseline, and compliance gates are satisfied.

---

## 19. Research sources

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
- LoRa Alliance, RP002 regional parameters:  
  https://resources.lora-alliance.org/technical-specifications/rp002-1-0-5-lorawan-regional-parameters

### Privacy and responsible use

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

### Technical standards and sensor quality

- OASIS MQTT 5.0:  
  https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- NISTIR 8259A, IoT Device Cybersecurity Capability Core Baseline:  
  https://nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8259A.pdf
- IAEA, field estimation of soil water content and sensor limitations:  
  https://www-pub.iaea.org/mtcd/publications/pdf/tcs-30_web.pdf
- FAO GLOSOLAN, soil electrical conductivity SOP:  
  https://openknowledge.fao.org/server/api/core/bitstreams/80c029bc-0dc5-4060-8b14-1dbcc20e6528/content
- ITU-T Y.4495, IoT requirements and data models for smart greenhouse service:  
  https://www.itu.int/rec/T-REC-Y.4495

### Evidence cautions

- Farm-size, irrigation-area, smartphone, and coverage figures vary by year and definition. Use them to size and segment the opportunity, not as precise design inputs.
- Coverage is not the same as reliable farm-level signal, and connected-handset counts are not the same as individual farmer smartphone ownership.
- Vendor-reported yield or water-saving claims should not be used in Factora forecasts without an independent Kenyan field baseline.
- Government and third-party data portals may not provide production-grade APIs or guaranteed uptime.

