import { fetchEnergyData} from '$lib/api';

import  type { EnergyData } from "../types/energy";


/**
 * Store para gestionar el estado del dashboard de energía.
 * Centraliza toda la lógica de negocio y estado de la aplicación.
 *
 * Nota: Este archivo es .svelte.ts para que Svelte 5 procese correctamente los runes $state
 */
class EnergyStore {

	// Estado de filtros
	dateFrom = $state('2026-01-26');
	dateTo = $state('2026-01-27');
	frequency = $state('15m');
	measure = $state('Energía Activa');
	chartType = $state('line');

	// Estado de datos y UI
	loading = $state(false);
	error = $state<string | null>(null);
	rawData = $state<EnergyData[]>([]);

	/**
	 * Genera y carga los datos de energía según los filtros configurados.
	 */
	async generate() {
		this.loading = true;
		this.error = null;
		this.rawData = [];

		try {
			const data = await fetchEnergyData(this.dateFrom, this.dateTo);

			if (data.length === 0) {
				this.error = 'La API no devolvió datos para este rango de fechas.';
			} else {
				this.rawData = data;
			}
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Error desconocido al cargar datos';
		} finally {
			this.loading = false;
		}
	}

	/**
	 * Resetea todos los filtros a sus valores por defecto.
	 */
	reset() {
		this.dateFrom = '2026-01-26';
		this.dateTo = '2026-01-27';
		this.frequency = '15m';
		this.measure = 'Energía Activa';
		this.chartType = 'line';
		this.error = null;
		this.rawData = [];
	}
}

// Exportamos una instancia única (singleton)
export const energyStore = new EnergyStore();
