<script>
	import { sizeRange, numberFormatter } from "$utils/dataProcessor";

	export let data;
	export let width;
	export let height;
	export let fill = "none";
	export let stroke = "#E5FF7B";
	export let strokeWidth = 1;

	$: extent = data[0].sizeDomain;
	$: [smallest, largest] = extent;
	let [smallestRadius, largestRadius] = sizeRange;
</script>

<svg {width} {height}>
	<g>
		<circle
			class="largest"
			cx={largestRadius}
			cy={height - largestRadius}
			r={largestRadius}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
		<line
			x1={largestRadius}
			x2={largestRadius + 25}
			y1={height - largestRadius - 15}
			y2={height - largestRadius - 15}
		/>
		<text x={largestRadius + 30} y={height - largestRadius - 10}
			>{numberFormatter(largest)}</text
		>
		<circle
			class="largest"
			cx={largestRadius}
			cy={height - smallestRadius}
			r={smallestRadius}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
		<line
			x1={largestRadius}
			x2={largestRadius + 25}
			y1={height - smallestRadius - 5}
			y2={height - smallestRadius - 5}
		/>
		<text x={largestRadius + 30} y={height - smallestRadius}
			>{numberFormatter(smallest)}</text
		>
	</g>
</svg>

<style>
	text {
		font-size: var(--12px);
		fill: var(--color-white);
	}
	line {
		stroke-dasharray: 4px 4px;
		stroke: var(--color-purple-light);
	}
</style>
