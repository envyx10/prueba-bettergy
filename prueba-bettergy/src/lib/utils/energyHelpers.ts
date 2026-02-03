import { SvelteDate, SvelteMap } from 'svelte/reactivity';
import type { EnergyData } from '$lib/types/energy';

/**
 * Obtiene el inicio de semana (lunes) para una fecha dada.
 */
function getWeekStart(date: SvelteDate): SvelteDate {
	const dayOfWeek = date.getDay();
	const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Lunes = inicio
	const weekStart = new SvelteDate(date);
	weekStart.setDate(date.getDate() + diff);
	weekStart.setHours(0, 0, 0, 0);
	return weekStart;
}

/**
 * Calcula el número de semana del año (ISO 8601)
 */
function getWeekNumber(date: SvelteDate): number {
	const d = new SvelteDate(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new SvelteDate(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Agrupa los datos según la frecuencia seleccionada.
 * Para cada período (día, semana, mes, año), suma los valores.
 */
export function aggregateDataByFrequency(
	rawData: EnergyData[],
	frequency: string,
	measure: string
): [number, number][] {
	// Configuración de agrupación por frecuencia
	const getGrouping = {
		daily: (date: SvelteDate) => ({
			key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
			timestamp: new SvelteDate(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
		}),
		weekly: (date: SvelteDate) => {
			const weekStart = getWeekStart(date);
			return {
				key: `${weekStart.getFullYear()}-W${getWeekNumber(weekStart)}`,
				timestamp: weekStart.getTime()
			};
		},
		monthly: (date: SvelteDate) => ({
			key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
			timestamp: new SvelteDate(date.getFullYear(), date.getMonth(), 1).getTime()
		}),
		annual: (date: SvelteDate) => ({
			key: `${date.getFullYear()}`,
			timestamp: new SvelteDate(date.getFullYear(), 0, 1).getTime()
		})
	};

	const groupFn = getGrouping[frequency as keyof typeof getGrouping];

	if (!groupFn) {
		console.warn(
			`aggregateDataByFrequency: frecuencia inválida "${frequency}". ` +
				'Se esperaba una de: ' +
				Object.keys(getGrouping).join(', ')
		);
		return [];
	}

	// Agrupar con reduce (más funcional y limpio)
	const grouped = rawData.reduce((acc, item) => {
		const date = new SvelteDate(item.date);
		const { key, timestamp } = groupFn(date);
		const value = item.values[measure] || 0;

		if (!acc.has(key)) {
			acc.set(key, { sum: 0, timestamp });
		}
		acc.get(key)!.sum += value;
		return acc;
	}, new SvelteMap<string, { sum: number; timestamp: number }>());

	return Array.from(grouped.values())
		.sort((a, b) => a.timestamp - b.timestamp)
		.map((g) => [g.timestamp, g.sum]);
}
