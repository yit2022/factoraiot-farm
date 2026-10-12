import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  evaluateDeviceSilence,
  evaluateRootZone,
  evaluateTankReserve,
  evaluateUnauthorizedFlow,
} from "./decisions.ts";

describe("precision farming decisions", () => {
  it("withholds irrigation advice when the soil reading is missing", () => {
    assert.equal(
      evaluateRootZone({
        moistureM3: 0.18,
        lowerM3: 0.22,
        upperM3: 0.36,
        rainExpectedMm: 0,
        quality: "missing",
      }).action,
      "suppress",
    );
  });

  it("requests irrigation when the root zone is dry and rain is not expected", () => {
    const decision = evaluateRootZone({
      moistureM3: 0.18,
      lowerM3: 0.22,
      upperM3: 0.36,
      rainExpectedMm: 0,
      quality: "ok",
    });
    assert.equal(decision.action, "irrigate");
  });

  it("holds irrigation when expected rain covers a dry root zone", () => {
    assert.equal(
      evaluateRootZone({
        moistureM3: 0.18,
        lowerM3: 0.22,
        upperM3: 0.36,
        rainExpectedMm: 8,
        quality: "ok",
      }).action,
      "hold",
    );
  });

  it("stops irrigation when the root zone is saturated", () => {
    assert.equal(
      evaluateRootZone({
        moistureM3: 0.39,
        lowerM3: 0.2,
        upperM3: 0.34,
        rainExpectedMm: 2,
        quality: "ok",
      }).action,
      "stop",
    );
  });

  it("flags flow that has no authorized schedule", () => {
    assert.equal(
      evaluateUnauthorizedFlow({
        flowM3h: 1.4,
        scheduleActive: false,
        quality: "ok",
      }).action,
      "inspect",
    );
  });

  it("asks for a refill when the tank cannot cover the next irrigation", () => {
    assert.equal(
      evaluateTankReserve({
        availableM3: 7.2,
        reserveM3: 10,
        plannedM3: 12,
        quality: "ok",
      }).action,
      "refill",
    );
  });

  it("sends a technician when a device misses three intervals", () => {
    assert.equal(
      evaluateDeviceSilence({
        minutesSinceReport: 210,
        expectedIntervalMinutes: 30,
      }).action,
      "inspect",
    );
  });
});
