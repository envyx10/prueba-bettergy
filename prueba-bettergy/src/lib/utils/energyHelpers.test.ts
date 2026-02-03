import { describe, it, expect } from 'vitest';
import { aggregateDataByFrequency } from './energyHelpers';
import type { EnergyData } from '$lib/types/energy';

describe('EnergyHelpers - aggregateDataByFrequency', () => {
	// Mock de datos: 3 entradas
	// - Dos del mismo día (diferentes horas implícitas p.ej. 15m)
	// - Una de otro día pero misma semana/mes
	const mockData: EnergyData[] = [
		{
			date: '2023-10-01T10:00:00.000Z', // Domingo
			values: {
				'Energía Activa': 10,
				'Energía Generada': 5,
				'Energía Reactiva Inductiva': 0,
				'Energía Inductiva Generada': 0,
				'Energía Capacitiva Generada': 0,
				'Energía Reactiva Capacitiva': 0,
				'Cualificador de Energía Activa Importada': 0,
				'Cualificador de Energía Activa Exportada': 0,
				'Cualificador de Energía Reactiva Inductiva Importada': 0,
				'Cualificador de Energía Inductiva Exportada': 0,
				'Cualificador de Energía Capacitiva Importada': 0,
				'Cualificador de Energía Capacitiva Exportada': 0,
				'Potencia Activa Total': 0
			}
		},
		{
			date: '2023-10-01T11:00:00.000Z', // Mismo día (Domingo)
			values: {
				'Energía Activa': 20,
				'Energía Generada': 5,
				'Energía Reactiva Inductiva': 0,
				'Energía Inductiva Generada': 0,
				'Energía Capacitiva Generada': 0,
				'Energía Reactiva Capacitiva': 0,
				'Cualificador de Energía Activa Importada': 0,
				'Cualificador de Energía Activa Exportada': 0,
				'Cualificador de Energía Reactiva Inductiva Importada': 0,
				'Cualificador de Energía Inductiva Exportada': 0,
				'Cualificador de Energía Capacitiva Importada': 0,
				'Cualificador de Energía Capacitiva Exportada': 0,
				'Potencia Activa Total': 0
			}
		},
		{
			date: '2023-10-02T10:00:00.000Z', // Lunes (Siguiente semana según ISO si empieza Lunes, o misma si empieza Domingo?
			// La lógica del helper usa Lunes como inicio)
			values: {
				'Energía Activa': 30,
				'Energía Generada': 10,
				'Energía Reactiva Inductiva': 0,
				'Energía Inductiva Generada': 0,
				'Energía Capacitiva Generada': 0,
				'Energía Reactiva Capacitiva': 0,
				'Cualificador de Energía Activa Importada': 0,
				'Cualificador de Energía Activa Exportada': 0,
				'Cualificador de Energía Reactiva Inductiva Importada': 0,
				'Cualificador de Energía Inductiva Exportada': 0,
				'Cualificador de Energía Capacitiva Importada': 0,
				'Cualificador de Energía Capacitiva Exportada': 0,
				'Potencia Activa Total': 0
			}
		}
	];

	it('debería devolver array vacío si no hay datos', () => {
		const result = aggregateDataByFrequency([], 'daily', 'Energía Activa');
		expect(result).toEqual([]);
	});

	it('debería agrupar por Lunes de la semana si la frecuencia es semanal', () => {
		// 2023-10-01 es Domingo. Si la semana empieza el Lunes, esto pertenece a la semana anterior (que empieza el Lunes 25 Sep).
		// 2023-10-02 es Lunes. Empieza nueva semana.

		const result = aggregateDataByFrequency(mockData, 'weekly', 'Energía Activa');

		// Esperamos 2 grupos:
		// 1. Semana del 25 Sep (contiene los datos del Domingo 01 Oct): 10 + 20 = 30
		// 2. Semana del 02 Oct (contiene los datos del Lunes 02 Oct): 30

		expect(result.length).toBe(2);
		expect(result[0][1]).toBe(30);
		expect(result[1][1]).toBe(30);
	});

	it('debería agrupar por mes correctamente', () => {
		// Todos son Octubre 2023
		const result = aggregateDataByFrequency(mockData, 'monthly', 'Energía Activa');

		expect(result.length).toBe(1);
		expect(result[0][1]).toBe(10 + 20 + 30); // 60 total
	});

	it('debería agrupar por día correctamente', () => {
		const result = aggregateDataByFrequency(mockData, 'daily', 'Energía Activa');

		// 2 días diferentes: 01 Oct y 02 Oct
		expect(result.length).toBe(2);

		// Día 1 (01 Oct): 10 + 20 = 30
		expect(result[0][1]).toBe(30);

		// Día 2 (02 Oct): 30
		expect(result[1][1]).toBe(30);
	});

	it('debería manejar métricas inexistentes como 0', () => {
		const result = aggregateDataByFrequency(mockData, 'daily', 'Metrica Inexistente');

		expect(result.length).toBe(2);
		expect(result[0][1]).toBe(0);
		expect(result[1][1]).toBe(0);
	});

	it('debería agrupar anualmente correctamente', () => {
		const dataAnnualMock = [
			{ ...mockData[0], date: '2023-01-01' },
			{ ...mockData[0], date: '2023-05-01' },
			{ ...mockData[0], date: '2024-01-01' }
		];
		// Asumiendo que todos tienen valor 10 en 'Energía Activa' (copiado de mockData[0])

		const result = aggregateDataByFrequency(dataAnnualMock, 'annual', 'Energía Activa');

		expect(result.length).toBe(2); // 2023 y 2024
		expect(result[0][1]).toBe(20); // 2023 (Ene + May)
		expect(result[1][1]).toBe(10); // 2024 (Ene)
	});
});
