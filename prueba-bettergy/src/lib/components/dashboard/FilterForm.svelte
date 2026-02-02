
<script>
    import { energyStore } from '$lib/stores/energyStore.svelte';
</script>


<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- Fecha Inicio -->
			<div class="flex flex-col gap-2">
				<label class="text-sm font-semibold text-gray-700" for="from"> Fecha Inicio </label>
				<input
					type="date"
					id="from"
					bind:value={energyStore.dateFrom}
					class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
				/>
			</div>

			<!-- Fecha Fin -->
			<div class="flex flex-col gap-2">
				<label class="text-sm font-semibold text-gray-700" for="to"> Fecha Fin </label>
				<input
					type="date"
					id="to"
					bind:value={energyStore.dateTo}
					class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
				/>
			</div>

			<!-- Frecuencia -->
			<div class="flex flex-col gap-2">
				<label class="text-sm font-semibold text-gray-700" for="freq"> Frecuencia </label>
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
				<label class="text-sm font-semibold text-gray-700" for="measure"> Medida </label>
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
				<label class="text-sm font-semibold text-gray-700" for="chart"> Tipo de Gráfico </label>
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