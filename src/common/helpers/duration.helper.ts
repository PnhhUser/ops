/**
 * Parses a duration string like '1h', '30m', '2 days' into milliseconds.
 * Inspired by the `ms` library behavior.
 */

const unitToMs: Record<string, number> = {
  ms: 1,
  millisecond: 1,
  milliseconds: 1,

  s: 1000,
  sec: 1000,
  secs: 1000,
  second: 1000,
  seconds: 1000,

  m: 60 * 1000,
  min: 60 * 1000,
  mins: 60 * 1000,
  minute: 60 * 1000,
  minutes: 60 * 1000,

  h: 60 * 60 * 1000,
  hr: 60 * 60 * 1000,
  hrs: 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  hours: 60 * 60 * 1000,

  d: 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,

  w: 7 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  weeks: 7 * 24 * 60 * 60 * 1000,

  y: 365 * 24 * 60 * 60 * 1000,
  yr: 365 * 24 * 60 * 60 * 1000,
  yrs: 365 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
  years: 365 * 24 * 60 * 60 * 1000,
};

export function parseDuration(input: string): number {
  const regex = /^(\d+(?:\.\d+)?)(?:\s*)?([a-zA-Z]+)?$/;
  const match = input.trim().toLowerCase().match(regex);

  if (!match) {
    throw new Error(`Invalid duration format: "${input}"`);
  }

  const value = parseFloat(match[1]);
  const unit = match[2] || 'ms';

  const multiplier = unitToMs[unit];

  if (!multiplier) {
    throw new Error(`Unknown time unit: "${unit}"`);
  }

  return value * multiplier;
}
