<script lang="ts">
    import { energyStore } from '$lib/stores/energyStore.svelte';
    import Chart from '$lib/components/Chart.svelte';
</script>

<main class="container mx-auto p-6 max-w-5xl">
    <!-- Header con colores Bettergy -->
    <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900">Bettergy Energy Dashboard</h1>
        <p class="text-gray-600 mt-2">Visualización de consumo energético</p>
    </header>

    <!-- Formulario de Filtros -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- Fecha Inicio -->
            <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700" for="from">
                    Fecha Inicio
                </label>
                <input 
                    type="date" 
                    id="from" 
                    bind:value={energyStore.dateFrom}
                    class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            <!-- Fecha Fin -->
            <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700" for="to">
                    Fecha Fin
                </label>
                <input 
                    type="date" 
                    id="to" 
                    bind:value={energyStore.dateTo}
                    class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            <!-- Frecuencia -->
            <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700" for="freq">
                    Frecuencia
                </label>
                <select 
                    id="freq" 
                    bind:value={energyStore.frequency}
                    class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                >
                    <option value="15m">15 Minutos</option>
                    <option value="daily">Diaria</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                    <option value="annual">Anual</option>
                </select>
            </div>

            <!-- Medida -->
            <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700" for="measure">
                    Medida
                </label>
                <select 
                    id="measure" 
                    bind:value={energyStore.measure}
                    class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                >
                    <option value="Energía Activa">Energía Activa</option>
                    <option value="Energía Generada">Energía Generada</option>
                    <option value="Energía Reactiva Inductiva">Energía Reactiva Inductiva</option>
                    <option value="Energía Reactiva Capacitiva">Energía Reactiva Capacitiva</option>
                    <option value="Potencia Activa Total">Potencia Activa Total</option>
                </select>
            </div>

            <!-- Tipo de Gráfico -->
            <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700" for="chart">
                    Tipo de Gráfico
                </label>
                <select 
                    id="chart" 
                    bind:value={energyStore.chartType}
                    class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                >
                    <option value="line">Líneas</option>
                    <option value="column">Columnas</option>
                    <option value="area">Área</option>
                </select>
            </div>

            <!-- Botón Generar con verde Bettergy -->
            <div class="flex items-end">
                <button 
                    onclick={() => energyStore.generate()}
                    disabled={energyStore.loading}
                    class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:cursor-not-allowed shadow-sm"
                >
                    {energyStore.loading ? 'Cargando...' : 'Generar Gráfico'}
                </button>
            </div>
        </div>
    </div>

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
</main>