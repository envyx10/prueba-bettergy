<script>
	import { energyStore } from '$lib/stores/energyStore.svelte';
</script>

{#if energyStore.validationError}
	<div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
		<svg
			class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<div>
			<p class="text-sm font-semibold text-red-800">Error de validación</p>
			<p class="text-sm text-red-700 mt-1">{energyStore.validationError}</p>
			{#if energyStore.rangeDays > 0}
				<p class="text-xs text-red-600 mt-1">Rango actual: {energyStore.rangeDays} días</p>
			{/if}
		</div>
	</div>
{/if}
