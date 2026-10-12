# Factora Precision Farming

Global precision-farming module for `iot.factoraerp.com`. Kenya is the first country pack.

The operations console turns field readings into specific actions: irrigate, stop, inspect a leak, refill a tank, or service a device. Global rules stay separate from the Kenya pack. A second reference pack has no farms and is not a market decision.

The research and rollout plan is in [docs/precision-farming-plan.md](docs/precision-farming-plan.md).

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm test
npm run lint
```

## What the sample shows

The tenant is fictional Lakeview Growers in Naivasha, Nakuru County. Readings, Kiswahili messages, and the pumping tariff are sample data. Hardware is not marked as approved by the Communications Authority of Kenya. The console gives advice and records work. It does not open a valve.
