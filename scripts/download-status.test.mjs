import test from "node:test";
import assert from "node:assert/strict";
import {
  downloadStatus,
  timeRemaining,
} from "../client/src/utils/orderStatus.mjs";
test("download eligibility follows stored expiry rather than purchase time", () => {
  const now = Date.parse("2026-10-04T12:00:00Z");
  const order = {
    createdAt: "2026-10-01T00:00:00Z",
    expiry: "2026-10-04T14:00:00Z",
  };
  assert.equal(downloadStatus(order, now).status, "available");
  assert.equal(
    downloadStatus({ ...order, expiry: "2026-10-04T11:59:59Z" }, now).status,
    "expired",
  );
  assert.equal(
    downloadStatus({ ...order, expiry: new Date(now).toISOString() }, now)
      .status,
    "available",
  );
  assert.equal(
    downloadStatus({ ...order, isExpired: true }, now).status,
    "expired",
  );
});
test("invalid expiry never exposes an available download", () => {
  assert.equal(downloadStatus({}).status, "unavailable");
  assert.equal(downloadStatus({ expiry: "invalid" }).status, "unavailable");
});
test("remaining time communicates imminent expiry without a negative duration", () => {
  assert.equal(timeRemaining(59000), "Less than a minute left");
  assert.equal(timeRemaining(60 * 60000), "1h 0m left");
  assert.equal(timeRemaining(5 * 60000), "5m left");
});
