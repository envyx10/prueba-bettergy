<script>
	import { energyStore } from '$lib/stores/energyStore.svelte';
	import ValidationMessage from './ValidationMessage.svelte';
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
				class="p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
				class:border-gray-300={energyStore.isValidDateRange ||
					!energyStore.dateFrom ||
					!energyStore.dateTo}
				class:border-red-500={!energyStore.isValidDateRange &&
					energyStore.dateFrom &&
					energyStore.dateTo}
			/>
		</div>

		<!-- Fecha Fin -->
		<div class="flex flex-col gap-2">
			<label class="text-sm font-semibold text-gray-700" for="to"> Fecha Fin </label>
			<input
				type="date"
				id="to"
				bind:value={energyStore.dateTo}
				class="p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
				class:border-gray-300={energyStore.isValidDateRange ||
					!energyStore.dateFrom ||
					!energyStore.dateTo}
				class:border-red-500={!energyStore.isValidDateRange &&
					energyStore.dateFrom &&
					energyStore.dateTo}
			/>
		</div>

		<!-- Frecuencia -->
		<div class="flex flex-col gap-2">
			<label class="text-sm font-semibold text-gray-700" for="freq"> Frecuencia </label>
			<select
				id="freq"
				bind:value={energyStore.frequency}
				class="select-arrow p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white font-medium text-gray-700"
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
				class="select-arrow p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white font-medium text-gray-700"
			>
				<optgroup label="Energía" class="font-bold text-emerald-700">
					<option value="Energía Activa">Activa</option>
					<option value="Energía Generada">Generada</option>
					<option value="Energía Reactiva Inductiva">Reactiva Inductiva</option>
					<option value="Energía Inductiva Generada">Inductiva Generada</option>
					<option value="Energía Capacitiva Generada">Capacitiva Generada</option>
					<option value="Energía Reactiva Capacitiva">Reactiva Capacitiva</option>
				</optgroup>
				<optgroup label="Cualificadores" class="font-bold text-emerald-700">
					<option value="Cualificador de Energía Activa Importada">Activa Importada</option>
					<option value="Cualificador de Energía Activa Exportada">Activa Exportada</option>
					<option value="Cualificador de Energía Reactiva Inductiva Importada"
						>Reactiva Inductiva Importada</option
					>
					<option value="Cualificador de Energía Inductiva Exportada">Inductiva Exportada</option>
					<option value="Cualificador de Energía Capacitiva Importada">Capacitiva Importada</option>
					<option value="Cualificador de Energía Capacitiva Exportada">Capacitiva Exportada</option>
				</optgroup>
				<optgroup label="Potencia" class="font-bold text-emerald-700">
					<option value="Potencia Activa Total">Activa Total</option>
				</optgroup>
			</select>
		</div>

		<!-- Tipo de Gráfico -->
		<div class="flex flex-col gap-2">
			<label class="text-sm font-semibold text-gray-700" for="chart"> Tipo de Gráfico </label>
			<select
				id="chart"
				bind:value={energyStore.chartType}
				class="select-arrow p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white font-medium text-gray-700"
			>
				<option value="line">Líneas</option>
				<option value="column">Columnas</option>
				<option value="area">Área</option>
			</select>
		</div>

		<!-- Botones de acción -->
		<div class="flex items-end gap-3 md:col-span-2 lg:col-span-1">
			<button
				onclick={() => energyStore.generate()}
				disabled={energyStore.loading || !energyStore.isFormValid}
				class="flex-1 bg-[#1a1a2e] hover:bg-[#2d2d44] disabled:bg-gray-400 text-emerald-400 disabled:text-white font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-colors disabled:cursor-not-allowed shadow-sm"
				title={energyStore.validationError || ''}
			>
				{energyStore.loading ? 'Cargando...' : 'Generar Gráfico'}
			</button>
			<button
				onclick={() => energyStore.reset()}
				disabled={energyStore.loading}
				class="px-4 py-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				title="Limpiar todos los filtros"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
				</svg>
			</button>
		</div>
	</div>

	<ValidationMessage />
	
</div>
