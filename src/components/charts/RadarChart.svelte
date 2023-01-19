<script>
	import { scaleLinear, line } from "d3";

	export let data;
	export let width;
	export let height;

	let max = (width - 100) / 2;
	let linearScale = scaleLinear().domain([0, 1]).range([0, max]);
	let xVals = data.map((d) => linearScale(d));
	let angleSlice = (Math.PI * 2) / data.length;
	let path = line()
		.x((d, i) => d * Math.cos(angleSlice * i - Math.PI / 2))
		.y((d, i) => d * Math.sin(angleSlice * i - Math.PI / 2));
</script>

<g transform="translate({width / 2}, {height / 2})">
	<path
		class="path-line"
		d={path(xVals)}
		stroke="#f0c"
		stroke-width={2}
		fill="#f0c"
		fill-opacity={0.5}
	/>
	{#each xVals as circleR, i}
		{@const thisAngleSlice = angleSlice * i - Math.PI / 2}
		<circle
			cx={circleR * Math.cos(thisAngleSlice)}
			cy={circleR * Math.sin(thisAngleSlice)}
			r={4.5}
			fill="#f0c"
			stroke="#fff"
			stroke-width={2}
		/>
	{/each}
</g>
