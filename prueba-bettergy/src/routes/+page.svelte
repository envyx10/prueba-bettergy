<script lang="ts">
	import DashboardHeader from '../lib/components/dashboard/DashboardHeader.svelte';
	import ChartContainer from '../lib/components/dashboard/ChartContainer.svelte';
	import FilterForm from '../lib/components/dashboard/FilterForm.svelte';
</script>

<main class="container mx-auto p-6 max-w-5xl">

	<DashboardHeader />
    <FilterForm/>
	<ChartContainer />

</main>
