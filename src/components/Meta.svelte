<script>
	export let title = "Sustainability Cosmos";
	export let description =
		"Explore the stars of sustainability with our cosmic dashboard!";
	export let url = "";
	export let ogUrl = "https://i.ibb.co/SsKrjcJ/sustainability-cosmos-og.jpg";
	export let keywords = "";
	export let preloadFont = [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="palminister" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content={title} />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content={ogUrl} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={url} />
	<meta name="twitter:creator" content="@thepalminister" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content={ogUrl} />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}/" />
	<link rel="icon" type="image/svg+xml" href="src/svg/favicon.svg" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	{#each preloadFont as href}
		<link {href} rel="stylesheet" />
	{/each}
</svelte:head>
