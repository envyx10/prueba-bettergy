import { fetchEnergyData} from '$lib/api';
import  type { EnergyData } from "$lib/types/energy";


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
	chartType = $state<'line' | 'column' | 'area'>('line');

	// Estado de datos y UI
	loading = $state(false);
	error = $state<string | null>(null);
	rawData = $state<EnergyData[]>([]);

	/**
	 * Valida que dateTo sea posterior a dateFrom
	 */
	isValidDateRange = $derived.by(() => {
		if(!this.dateFrom || !this.dateTo) return false;
		return new Date(this.dateTo) > new Date(this.dateFrom);
	});

	/**
	 * Calcula el rango de dias
	 */
	rangeDays = $derived.by(()=>{
		if(!this.dateFrom || !this.dateTo) return 0;
		const from = new Date(this.dateFrom);
		const to = new Date(this.dateTo);
		const diff = to.getTime() - from.getTime();
		return Math.ceil(diff / (1000 * 60 * 60 * 24))
	});

	/**
	 *  Valida límite máximo de días (ej: 90 días)
	 */
    isWithinMaxRange = $derived.by(() => {
        return this.rangeDays <= 90;
    });

	/**
	 * Mensaje de error de validación
	 */
	validationError = $derived.by((): string | null => {

		if(!this.dateFrom || !this.dateTo) return 'Selecciona ambas fechas';
		if(!this.isValidDateRange) return 'La fecha de fin debe ser posterior a la fecha de inicio';
		if(!this.isWithinMaxRange) return `El rango máximo es de 90 dias ( actual: ${this.rangeDays} días)`;

		return null;
	});

	/**
	 * Verifica si el formulario es válido
	 */
	isFormValid = $derived.by(()=>{
		return this.isValidDateRange && this.isWithinMaxRange;
	})

	/**
	 * Datos transformados para Highcharts: [[timestamp, valor], [timestamp, valor], ...]
	 * Se recalcula automáticamente cuando cambian rawData o measure.
	 */
	chartData = $derived.by((): [number, number][] => {
		return this.rawData.map(item => [
			new Date(item.date).getTime(), // Timestamp en milisegundos
			item.values[this.measure] // El valor de la métrica seleccionada
		]);
	});

	/**
	 * Genera y carga los datos de energía según los filtros configurados.
	 */
	async generate() {

		/**
		 * Valda antes de generar
		 */
		if(!this.isFormValid) return this.error = this.validationError;

		this.loading = true;
		this.error = null;
		this.rawData = [];

		try {
			const data = await fetchEnergyData(this.dateFrom, this.dateTo, this.frequency);

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
