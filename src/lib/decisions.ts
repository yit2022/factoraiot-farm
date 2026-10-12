export type ReadingQuality = "ok" | "stale" | "stuck" | "missing";

export type RootZoneInput = {
  moistureM3: number;
  lowerM3: number;
  upperM3: number;
  rainExpectedMm: number;
  quality: ReadingQuality;
};

export type RootZoneDecision = {
  action: "suppress" | "irrigate" | "stop" | "hold";
  reason: string;
};

export function evaluateRootZone(input: RootZoneInput): RootZoneDecision {
  if (input.quality !== "ok") {
    return {
      action: "suppress",
      reason:
        "The soil reading is not trustworthy, so irrigation advice is withheld.",
    };
  }

  if (input.moistureM3 >= input.upperM3) {
    return {
      action: "stop",
      reason: "The root zone is above the upper water threshold.",
    };
  }

  if (input.moistureM3 <= input.lowerM3 && input.rainExpectedMm >= 5) {
    return {
      action: "hold",
      reason:
        "The root zone is dry, and expected rain covers the next irrigation.",
    };
  }

  if (input.moistureM3 <= input.lowerM3) {
    return {
      action: "irrigate",
      reason:
        "The root zone is at or below the managed depletion threshold, and meaningful rain is not expected.",
    };
  }

  return {
    action: "hold",
    reason: "The root zone is inside the target band.",
  };
}

export function evaluateUnauthorizedFlow(input: {
  flowM3h: number;
  scheduleActive: boolean;
  quality: ReadingQuality;
}): { action: "suppress" | "inspect" | "hold"; reason: string } {
  if (input.quality !== "ok") {
    return {
      action: "suppress",
      reason: "The flow meter reading is not trustworthy.",
    };
  }

  if (input.flowM3h > 0.2 && !input.scheduleActive) {
    return {
      action: "inspect",
      reason: "Water is flowing without an authorized irrigation event.",
    };
  }

  return { action: "hold", reason: "Flow matches the irrigation schedule." };
}

export function evaluateTankReserve(input: {
  availableM3: number;
  reserveM3: number;
  plannedM3: number;
  quality: ReadingQuality;
}): { action: "suppress" | "refill" | "hold"; reason: string } {
  if (input.quality !== "ok") {
    return {
      action: "suppress",
      reason: "The tank level is not trustworthy, so reserve advice is withheld.",
    };
  }

  if (input.availableM3 < input.reserveM3 || input.availableM3 < input.plannedM3) {
    return {
      action: "refill",
      reason: "Stored water is below the reserve or the next planned irrigation.",
    };
  }

  return { action: "hold", reason: "Stored water covers the reserve and the next irrigation." };
}

export function evaluateDeviceSilence(input: {
  minutesSinceReport: number;
  expectedIntervalMinutes: number;
}): { action: "inspect" | "hold"; reason: string } {
  if (input.minutesSinceReport > input.expectedIntervalMinutes * 3) {
    return {
      action: "inspect",
      reason: "The device has missed more than three expected reports.",
    };
  }

  return { action: "hold", reason: "The device is reporting on its expected interval." };
}
