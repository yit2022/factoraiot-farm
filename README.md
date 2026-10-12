# FactorAIoT Farm

Global precision-farming product hosted at `farm.factoraiot.com`. Kenya is the first country pack.

The operations console turns field readings into specific actions: irrigate, stop, inspect a leak, refill a tank, or service a device. Global rules stay separate from the Kenya pack. A second reference pack has no farms and is not a market decision. Factora ERP remains an integration for work orders, inventory, costs, and harvest outcomes rather than the module's host.

The research and rollout plan is in [docs/precision-farming-plan.md](docs/precision-farming-plan.md).

## Product navigation

Add this primary navigation action to `iot.factoraerp.com`:

```tsx
<a href="https://farm.factoraiot.com" aria-label="Open Precision Farming">
  Precision Farming
</a>
```

The link should open in the same tab. FactorAIoT Farm includes a **Factora ERP** button that returns to `https://iot.factoraerp.com`.

Do not place tenant IDs, user IDs, access tokens, or farm IDs in this link. Shared authentication and tenant handoff require a signed, short-lived SSO exchange; they should not be implemented with plain query parameters.

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

## GitHub deployment

Pushes to `main` build a static export and publish it with GitHub Pages. The deployment is recorded on the `github-pages` environment.

The Pages site is [https://yit2022.github.io/factoraiot-farm/](https://yit2022.github.io/factoraiot-farm/). `farm.factoraiot.com` stays on its own DNS record and does not automatically follow this deployment.

## What the sample shows

The tenant is fictional Lakeview Growers in Naivasha, Nakuru County. Readings, Kiswahili messages, and the pumping tariff are sample data. Hardware is not marked as approved by the Communications Authority of Kenya. The console gives advice and records work. It does not open a valve.
