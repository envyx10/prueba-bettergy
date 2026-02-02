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