
<script lang="ts">
    
    import Highcharts from 'highcharts';
    import { onMount, onDestroy } from 'svelte';

    // Recibimos los datos y configuración desde el padre (+page.svelte)
    let { data, title, type, color } = $props<{
        data: [number, number][], // Formato [Timestamp, Valor]
        title: string,
        type: 'line' | 'column' | 'area',
        color: string
    }>();

    let chartContainer: HTMLDivElement;
    let chartInstance: Highcharts.Chart;

    // Función para dibujar o actualizar el gráfico
    function updateChart() {
        if (!chartContainer) return;

        const options: Highcharts.Options = {
            chart: {
                type: type, // línea, columna o área 
                backgroundColor: 'transparent',
                animation: true
            },
            title: {
                text: title
            },
            xAxis: {
                type: 'datetime', // El eje X son fechas
                title: { text: 'Tiempo' }
            },
            yAxis: {
                title: { text: 'Valor Energético' }
            },
            series: [{
                type: type,
                name: title,
                data: data, // Aquí van los datos
                color: color
            }],
            credits: { enabled: false }, // Quitamos la marca de agua de Highcharts
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' kWh' // Asumimos kWh por el contexto
            }
        };

        // Si ya existe, lo actualizamos. Si no, lo creamos.
        if (chartInstance) {
            chartInstance.update(options);
        } else {
            chartInstance = Highcharts.chart(chartContainer, options);
        }
    }

    // Svelte 5: $effect se ejecuta automáticamente cuando cambian las props (data o type)
    $effect(() => {
        if (data && chartContainer) {
            updateChart();
        }
    });

    onDestroy(() => {
        if (chartInstance) chartInstance.destroy(); // Limpieza de memoria
    });
</script>

<div bind:this={chartContainer} class="w-full h-[400px] rounded-lg overflow-hidden"></div>