<script lang="ts">
	import { energyStore } from '$lib/stores/energyStore.svelte';
</script>

<div style="padding: 2rem; font-family: system-ui; max-width: 600px; margin: 0 auto;">
	<h1 style="margin-bottom: 0.5rem;">API Integration - Prueba Técnica Bettergy</h1>
	<p style="color: #666; margin-bottom: 2rem;">✅ Integración con API completada</p>

	<button
		onclick={() => energyStore.generate()}
		disabled={energyStore.loading}
		style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 500;"
	>
		{energyStore.loading ? 'Cargando...' : 'Probar API (26-27 Enero 2026)'}
	</button>

	{#if energyStore.error}
		<div
			style="margin-top: 1.5rem; padding: 1rem; background: #fee; border-left: 4px solid #dc2626; color: #991b1b;"
		>
			<strong>Error:</strong>
			{energyStore.error}
		</div>
	{/if}

	{#if energyStore.rawData.length > 0}
		<div
			style="margin-top: 1.5rem; padding: 1rem; background: #f0fdf4; border-left: 4px solid #16a34a; color: #166534;"
		>
			<strong>✅ Datos cargados correctamente:</strong>
			{energyStore.rawData.length} registros
			<details style="margin-top: 0.75rem;">
				<summary style="cursor: pointer; font-size: 0.875rem;">Ver primeros 3 registros</summary>
				<pre
					style="background: white; padding: 0.75rem; overflow: auto; margin-top: 0.5rem; font-size: 0.75rem; border-radius: 0.25rem;">{JSON.stringify(
						energyStore.rawData.slice(0, 3),
						null,
						2
					)}</pre>
			</details>
		</div>
	{/if}
</div>
