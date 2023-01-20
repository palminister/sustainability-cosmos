<script>
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	export let options;
	export let width;
	export let height;

	let max = (width - 100) / 2;
	let lineLengthFactor = 1.1;
	let labelPlacementFactor = 1.25;
	let lineLength = max * lineLengthFactor;
	let labelPlacement = max * labelPlacementFactor;
	let angleSlice = (Math.PI * 2) / options.length;

	$: innerSizeTweened.set(max);
	const innerSizeTweened = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	$: outerSizeTweened.set(max);
	const outerSizeTweened = tweened(0, {
		duration: 600,
		easing: cubicOut
	});

	$: lineTweened.set(lineLength);
	const lineTweened = tweened(0, {
		duration: 600,
		easing: cubicOut
	});

	const anchor = (total, i) => {
		if (i === 0 || i === total / 2) {
			return "middle";
		} else if (i < total / 2) {
			return "start";
		}
		return "end";
	};
</script>

<g transform="translate({width / 2}, {height / 2})">
	<circle
		cx="0"
		cy="0"
		r={$outerSizeTweened}
		stroke="#ccc"
		stroke-width="1"
		fill="#CDCDCD"
		fill-opacity="0.1"
	/>
	<circle
		cx="0"
		cy="0"
		r={$innerSizeTweened / 2}
		stroke="#ccc"
		stroke-width="1"
		fill="none"
	/>
	{#each options as { value }, i}
		{@const thisAngleSlice = angleSlice * i - Math.PI / 2}
		<line
			x1="0"
			y1="0"
			x2={$lineTweened * Math.cos(thisAngleSlice)}
			y2={$lineTweened * Math.sin(thisAngleSlice)}
			stroke="#ccc"
			stroke-width="1"
			fill="none"
		/>
		<text
			text-anchor={anchor(options.length, i)}
			dy="0.35em"
			font-size="12px"
			text-outline="#fff"
			fill="#fff"
			transform="translate({labelPlacement *
				Math.cos(thisAngleSlice)}, {labelPlacement * Math.sin(thisAngleSlice)})"
			>{value.slice(0, 3)}</text
		>
	{/each}
</g>
