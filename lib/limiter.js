const usage = new Map();

export function checkLimit(userId, maxPerDay) {
  const today = new Date().toISOString().split("T")[0];
  const key = `${userId}:${today}`;

  const count = usage.get(key) || 0;

  if (count >= maxPerDay) return false;

  usage.set(key, count + 1);
  return true;
}
