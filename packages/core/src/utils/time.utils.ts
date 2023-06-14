export const fromSeconds = (s: number) => s * 1000;

export const fromMinutes = (m: number) => fromSeconds(m * 60);

export const fromHours = (h: number) => fromMinutes(h * 60);

export const fromDays = (d: number) => fromHours(d * 24);

export const fromYears = (y: number) => fromDays(y * 365);
