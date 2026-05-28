const monthIndex: Record<string, number> = {
	ene: 0,
	jan: 0,
	feb: 1,
	mar: 2,
	abr: 3,
	apr: 3,
	may: 4,
	jun: 5,
	jul: 6,
	ago: 7,
	aug: 7,
	sep: 8,
	sept: 8,
	oct: 9,
	nov: 10,
	dic: 11,
	dec: 11,
};

export function parseStartDate(period: string): Date | null {
	const startPart = period.split("-")[0].trim();
	const tokens = startPart.split(/\s+/);
	if (tokens.length < 2) return null;
	const monthKey = tokens[0].toLowerCase().replace(/\./g, "");
	const year = Number(tokens[1]);
	const m = monthIndex[monthKey];
	if (m === undefined || Number.isNaN(year)) return null;
	return new Date(year, m, 1);
}

export function calcYearsExperience(periods: string[]): number {
	const starts = periods
		.map(parseStartDate)
		.filter((d): d is Date => d !== null);
	if (!starts.length) return 0;
	const earliest = starts.reduce((min, d) => (d < min ? d : min), starts[0]);
	const diffMs = Date.now() - earliest.getTime();
	return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
}
