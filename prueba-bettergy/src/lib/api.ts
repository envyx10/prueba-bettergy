import { PUBLIC_API_URL, PUBLIC_METER_ID } from '$env/static/public';

/**
 * Interfaz que representa la estructura de respuesta de datos energéticos.
 * Basado en la especificación de la API v2.
 */
export interface EnergyData {
	date: string;
	values: {
		'Energía Activa': number;
		'Energía Generada': number;
		'Energía Reactiva Inductiva': number;
		'Energía Reactiva Capacitiva': number;
		'Potencia Activa Total': number;
		[key: string]: number; // Permite escalabilidad si añaden nuevas métricas
	};
}

/**
 * Obtiene los datos energéticos del medidor configurado para un rango de fechas.
 * @param dateFrom Fecha de inicio en formato YYYY-MM-DD
 * @param dateTo Fecha de fin en formato YYYY-MM-DD
 * @returns Promesa con el array de datos energéticos
 * @throws Error si la petición HTTP falla
 */
export async function fetchEnergyData(dateFrom: string, dateTo: string): Promise<EnergyData[]> {
	const url = `${PUBLIC_API_URL}?meter=${PUBLIC_METER_ID}&date_from=${dateFrom}&date_to=${dateTo}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// Relanzamos el error para que sea manejado por la capa de UI
		console.error('Error fetching energy data:', error);
		throw error;
	}
}
