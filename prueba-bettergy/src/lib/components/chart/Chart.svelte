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
                animation: true,
                zooming: {
                    type: 'x',
                    resetButton: {
                        theme: {
                            fill: '#10B981',
                            stroke: '#059669',
                            style: {
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                lineHeight: '16px'
                            },
                            r: 4,
                            states: {
                                hover: {
                                    fill: '#059669'
                                }
                            }
                        },
                        position: {
                            align: 'right',
                            verticalAlign: 'top',
                            x: -10,
                            y: 10
                        }
                    }
                },
                panning: {
                    enabled: true,
                    type: 'x'
                },
                panKey: 'shift'
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
                valueSuffix: ' kWh',
                xDateFormat: '%d/%m/%Y %H:%M' // Formato mejorado para el tooltip
            },
            plotOptions: {
                series: {
                    turboThreshold: 10000, //  Permite más de 1000 puntos sin warnings
                    states: {
                        inactive: {
                            opacity: 1 //  No atenúa la serie al hacer hover
                        }
                    }
                }
            }
        };

        // Si ya existe, lo actualizamos. Si no, lo creamos.
        if (chartInstance) {
            chartInstance.update(options);
        } else {
            chartInstance = Highcharts.chart(chartContainer, options);
            
            // 👇 AÑADIR ZOOM CON RUEDA DEL RATÓN
            chartContainer.addEventListener('wheel', handleWheel, { passive: false });
        }
    }

    // 👇 FUNCIÓN PARA MANEJAR ZOOM CON RUEDA
    function handleWheel(event: WheelEvent) {
        event.preventDefault();
        
        if (!chartInstance || !chartInstance.xAxis || !chartInstance.xAxis[0]) return;

        const xAxis = chartInstance.xAxis[0];
        const extremes = xAxis.getExtremes();
        
        // Calcular el punto del mouse en el eje X
        const chartX = event.offsetX;
        const mouseValue = xAxis.toValue(chartX);
        
        // Factor de zoom (ajustable)
        const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9; // Zoom out / Zoom in
        
        // Calcular nuevos extremos manteniendo el punto del mouse fijo
        const range = extremes.max - extremes.min;
        const newRange = range * zoomFactor;
        
        const leftRatio = (mouseValue - extremes.min) / range;
        const newMin = mouseValue - (newRange * leftRatio);
        const newMax = mouseValue + (newRange * (1 - leftRatio));
        
        // Aplicar los nuevos extremos
        xAxis.setExtremes(newMin, newMax, true, false);
        
        // 👇 Forzar que aparezca el botón de reset zoom
        chartInstance.showResetZoom();
    }

    // Svelte 5: $effect se ejecuta automáticamente cuando cambian las props (data o type)
    $effect(() => {
        if (data && chartContainer) {
            updateChart();
        }
    });

    onDestroy(() => {
        // Limpiar el event listener
        if (chartContainer) {
            chartContainer.removeEventListener('wheel', handleWheel);
        }
        if (chartInstance) chartInstance.destroy(); // Limpieza de memoria
    });
</script>

<div bind:this={chartContainer} class="w-full h-[400px] rounded-lg overflow-hidden"></div>
