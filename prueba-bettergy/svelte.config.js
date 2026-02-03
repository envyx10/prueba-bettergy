import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Selección dinámica de adaptador:
		// - Si existe la variable ADAPTER=node, usa adapter-node (para Docker/VPS)
		// - Si no, usa adapter-auto (ideal para Vercel, Netlify, etc.)
		adapter: process.env.ADAPTER === 'node' ? adapterNode() : adapterAuto()
	}
};

export default config;
