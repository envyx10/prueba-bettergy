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
        'Energía Inductiva Generada': number;
        'Energía Capacitiva Generada': number;
        'Energía Reactiva Capacitiva': number;
        'Cualificador de Energía Activa Importada': number;
        'Cualificador de Energía Activa Exportada': number;
        'Cualificador de Energía Reactiva Inductiva Importada': number;
        'Cualificador de Energía Inductiva Exportada': number;
        'Cualificador de Energía Capacitiva Importada': number;
        'Cualificador de Energía Capacitiva Exportada': number;
        'Potencia Activa Total': number;
        [key: string]: number; // Permite escalabilidad si añaden nuevas métricas
    };
}