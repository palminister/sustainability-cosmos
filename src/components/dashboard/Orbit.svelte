<script>
	import { randomUniform, randomLogNormal, color } from "d3";
	import { sizeRange, colors } from "$utils/dataProcessor";

	const path =
		"M562.947 417.236C702.51 376.164 822.916 318.707 904.766 258.997C945.689 229.143 976.997 198.71 996.235 169.459C1015.47 140.21 1022.68 112.083 1015.27 86.8919C1007.85 61.7012 986.558 41.9607 954.545 27.7944C922.529 13.6269 879.727 5.00289 829.157 2.07449C728.012 -3.78257 595.676 13.1389 456.114 54.2103C316.551 95.2818 196.145 152.739 114.295 212.449C73.3722 242.303 42.0645 272.736 22.8261 301.987C3.58923 331.236 -3.61727 359.363 3.79604 384.554C11.2094 409.745 32.5028 429.485 64.5161 443.652C96.532 457.819 139.334 466.443 189.904 469.372C291.049 475.229 423.385 458.307 562.947 417.236Z";

	const [mu, std] = [1.3, 0.5];
	const r = randomLogNormal(mu, std, sizeRange);
	const orbitOffset = randomUniform(-80, 80);
	const ngroups = 6;
	const data = Array.from({ length: 217 }, (_, i) => ({
		r: r(),
		color: Object.values(colors)[i % ngroups],
		offsetX: orbitOffset(),
		offsetY: orbitOffset()
	}));
</script>

<svg viewBox="0 0 1019 471" fill="none" xmlns="http://www.w3.org/2000/svg">
	{#each data as d, index}
		{@const cx = d.offsetX}
		{@const cy = d.offsetY}
		{@const r = d.r + 10}
		{@const begin = `-${index}s`}
		{@const dur = 150 + d.r * 10}
		{@const darker = color(d.color).darker(2)}
		<span style="display: none;">{(darker.opacity = 0.2)}</span>
		<circle {cx} {cy} fill={darker} {r}>
			<animateMotion
				attributeName="cx"
				{dur}
				{begin}
				repeatCount="indefinite"
				{path}
			/>
		</circle>
	{/each}
	{#each data as d, index}
		{@const cx = d.offsetX}
		{@const cy = d.offsetY}
		{@const r = d.r}
		{@const begin = `-${index}s`}
		{@const dur = 150 + d.r * 10}
		{@const fill = d.color}
		{@const brighter = color(d.color).brighter(0.2)}
		<circle {cx} {cy} {fill} {r} stroke={brighter} stroke-width={3}>
			<animateMotion
				attributeName="cx"
				{dur}
				{begin}
				repeatCount="indefinite"
				{path}
			/>
		</circle>
	{/each}
</svg>

<style>
	svg {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		max-width: 1019px;
		margin: auto;
		overflow: visible;
		z-index: 0;
	}
</style>
