export function downloadStatus(order, now = Date.now()) {
  const expiry = Date.parse(order.expiry);
  if (!Number.isFinite(expiry)) return { status: "unavailable", remaining: 0 };
  const remaining = expiry - now;
  return {
    status: order.isExpired || remaining < 0 ? "expired" : "available",
    remaining: Math.max(0, remaining),
  };
}
export function timeRemaining(milliseconds) {
  if (milliseconds < 60000) return "Less than a minute left";
  const minutes = Math.ceil(milliseconds / 60000);
  return minutes >= 60
    ? Math.floor(minutes / 60) + "h " + (minutes % 60) + "m left"
    : minutes + "m left";
}
