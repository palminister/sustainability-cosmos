<script>
	export let width = 90;
	export let height = 25;
	let fill = "none";
	let stroke = "#E5FF7B";
	let r = 7;
	let strokeWidth = 3;
</script>

<svg {width} {height}>
	<g>
		<circle
			cx={r + strokeWidth}
			cy={height - (r + strokeWidth)}
			r={7}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
		<text x={r + strokeWidth + 20} y={height - r}>no data</text>
	</g>
</svg>

<style>
	text {
		font-size: var(--12px);
		fill: var(--color-white);
	}
</style>
