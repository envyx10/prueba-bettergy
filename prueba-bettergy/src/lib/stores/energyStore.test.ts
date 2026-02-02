import { describe, it, expect, beforeEach } from 'vitest';
import { EnergyStore } from './energyStore.svelte';
import { tick } from 'svelte';

describe('Lógica de EnergyStore', () => {
    let store: EnergyStore;

    beforeEach(async () => {
        store = new EnergyStore();
        // Inicializamos con strings vacíos (como en la definición de la clase)
        await tick();
    });

    it('debería inicializarse con fechas vacías', () => {
        expect(store.dateFrom).toBe('');
        expect(store.dateTo).toBe('');
        expect(store.frequency).toBe('15m');
    });

    it('debería validar correctamente cuando faltan fechas', async () => {
        // Estado inicial
        expect(store.dateFrom).toBe('');
        expect(store.dateTo).toBe('');
        
        await tick();
        
        expect(store.isFormValid).toBe(false); 
        expect(store.validationError).toBe(null); 
    });

    it('debería detectar rango de fechas inválido (Fin < Inicio)', async () => {
        store.dateFrom = '2026-02-02';
        store.dateTo = '2026-02-01'; 
        await tick();

        expect(store.isValidDateRange).toBe(false);
        expect(store.validationError).toBe('La fecha de fin debe ser posterior a la fecha de inicio');
    });

    it('debería aceptar un rango de fechas válido', async () => {
        store.dateFrom = '2026-02-01';
        store.dateTo = '2026-02-02'; 
        await tick();

        expect(store.isValidDateRange).toBe(true);
        expect(store.isFormValid).toBe(true);
        expect(store.validationError).toBe(null);
    });

    it('debería calcular los días del rango correctamente', async () => {
        store.dateFrom = '2026-02-01';
        store.dateTo = '2026-02-03'; 
        await tick();

        expect(store.rangeDays).toBe(2);
    });
});
