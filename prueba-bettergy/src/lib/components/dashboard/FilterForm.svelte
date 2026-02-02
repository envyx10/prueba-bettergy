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

		<!-- Botón Generar con validaciones -->
		<div class="flex items-end">
			<button
				onclick={() => energyStore.generate()}
				disabled={energyStore.loading || !energyStore.isFormValid}
				class="w-full bg-[#1a1a2e] hover:bg-[#2d2d44] disabled:bg-gray-400 text-emerald-400 disabled:text-white font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-colors disabled:cursor-not-allowed shadow-sm"
				title={energyStore.validationError || ''}
			>
				{energyStore.loading ? 'Cargando...' : 'Generar Gráfico'}
			</button>
		</div>
	</div>

	<ValidationMessage />
</div>
