
<script lang="ts">
    import { energyStore } from '$lib/stores/energyStore.svelte';
    import Chart from '$lib/components/chart/Chart.svelte';
</script>

 <!-- Área del Gráfico -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[500px]">
        {#if energyStore.error}
            <!-- Estado: Error -->
            <div class="flex flex-col items-center justify-center h-[400px] text-red-600">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-bold text-lg">Error al cargar datos</p>
                <p class="text-sm text-gray-600 mt-2">{energyStore.error}</p>
            </div>
        {:else if energyStore.loading}
            <!-- Estado: Cargando -->
            <div class="flex flex-col items-center justify-center h-[400px] text-emerald-600">
                <svg class="animate-spin h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="font-semibold">Cargando datos...</p>
            </div>
        {:else if energyStore.rawData.length > 0}
            <!-- Estado: Datos cargados - Mostrar gráfico con color verde Bettergy -->
            <Chart 
                data={energyStore.chartData}
                title={energyStore.measure}
                type={energyStore.chartType}
                color="#10B981"
                frequency={energyStore.frequency}
            />
        {:else}
            <!-- Estado: Vacío inicial -->
            <div class="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Configura los filtros y pulsa "Generar Gráfico"</p>
            </div>
        {/if}
    </div>