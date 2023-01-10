<script>
	import { getContext } from "svelte";
	const { padding, width, yScale } = getContext("LayerCake");
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	export let meanValue;
	export let stdValue;
	$: meanTweened.set(meanValue);
	const meanTweened = tweened(0, {
		duration: 600,
		easing: cubicOut
	});
	$: stdTweened.set(stdValue);
	const stdTweened = tweened(0, {
		duration: 600,
		easing: cubicOut
	});
	$: y = $yScale($meanTweened);
	$: upper = $yScale(meanValue + $stdTweened);
	$: lower = $yScale(meanValue - $stdTweened);
</script>

<g class="markline-y" transform="translate({-$padding.left}, 0)">
	<rect width="100%" height={Math.abs(y - upper) * 2} x="0" y={upper} />
	<text transform="translate({$width - ($padding.right + 10)}, {y - 10})"
		>mean={$meanTweened.toFixed(3)}</text
	>
	<text transform="translate({$width - ($padding.right + 10)}, {y + 20})"
		>std={$stdTweened.toFixed(3)}</text
	>
	<line x2="100%" transform="translate(0, {y})" />
	<line x2="100%" transform="translate(0, {upper})" />
	<line x2="100%" transform="translate(0, {lower})" />
</g>

<style>
	rect {
		fill: var(--color-gray-100);
		opacity: 0.5;
		transition: all 2s cubic-bezier(0, 0, 0.04, 1);
	}
	text,
	line {
		font-size: 0.725em;
		font-weight: 200;
		fill: var(--color-gray-500);
		transition: all 2s cubic-bezier(0, 0, 0.04, 1);
	}
	line {
		stroke-dasharray: 4px 4px;
		stroke: var(--color-gray-500);
	}
</style>
