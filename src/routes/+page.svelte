<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";

	export let data;

	version();

	const preloadFont = [
		"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Source+Code+Pro:wght@400;700&display=swap"
	];

	const { title, description, url, keywords } = copy;
	setContext("copy", copy);
	setContext("data", data.data);
</script>

<Meta {preloadFont} />
<Index />
