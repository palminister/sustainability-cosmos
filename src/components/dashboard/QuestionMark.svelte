<script>
	import Cross from "$components/dashboard/Cross.svg.svelte";
	import { fly } from "svelte/transition";

	let open = false;

	const handleClick = () => {
		open = !open;
	};
	const close = () => {
		open = false;
	};
	const handle_keydown = (e) => {
		if (e.key === "Escape") {
			close();
			return;
		}
	};
</script>

<div>
	<button on:click={handleClick}>
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM2.44434 20C2.44434 29.6957 10.3043 37.5557 20 37.5557C29.6957 37.5557 37.5557 29.6957 37.5557 20C37.5557 10.3043 29.6957 2.44434 20 2.44434C10.3043 2.44434 2.44434 10.3043 2.44434 20Z"
				fill="#E5FF7B"
			/>
			<path
				d="M15.72 23.08V21.74C15.72 21.2333 15.84 20.7733 16.08 20.36C16.3333 19.9333 16.6667 19.6 17.08 19.36C17.5067 19.1067 17.9667 18.98 18.46 18.98H23.3C23.3667 18.98 23.42 18.96 23.46 18.92C23.5133 18.8667 23.54 18.8067 23.54 18.74V15.48C23.54 15.4133 23.5133 15.36 23.46 15.32C23.42 15.2667 23.3667 15.24 23.3 15.24H13.62V12.6H23.4C23.8933 12.6 24.3467 12.7267 24.76 12.98C25.1867 13.2333 25.5267 13.5667 25.78 13.98C26.0333 14.3933 26.16 14.8533 26.16 15.36V18.86C26.16 19.3667 26.0333 19.8267 25.78 20.24C25.5267 20.6533 25.1867 20.9867 24.76 21.24C24.3467 21.4933 23.8933 21.62 23.4 21.62H18.6C18.5333 21.62 18.4733 21.6467 18.42 21.7C18.3667 21.74 18.34 21.7933 18.34 21.86V23.08H15.72ZM15.72 27V24.38H18.34V27H15.72Z"
				fill="#E5FF7B"
			/>
		</svg>
	</button>

	{#if open}
		<div
			class="question-background"
			on:click={() => {
				close();
			}}
			on:keydown={handle_keydown}
		/>
		<div class="info-panel" transition:fly={{ x: 300 }}>
			<button class="close-button" on:click={() => close()}><Cross /></button>
			<div class="info-body">
				<p>hello</p>
				<p>hnldksanklasdnasnkldsan</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.question-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 50;
		animation: fadeIn 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}
	button {
		background-color: transparent;
		padding: 0;
		line-height: 0;
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
		border-radius: 100%;
	}
	button:hover {
		background: rgba(29, 35, 163, 0.85);
	}
	.close-button {
		position: absolute;
		right: 20px;
	}
	.info-panel {
		position: absolute;
		z-index: 50;
		height: 100vh;
		right: 0;
		top: 0;
		background-color: var(--color-yellow);
		font-size: var(--12px);
		font-weight: 700;
		color: var(--color-purple-dark);
		padding: 20px;
	}
	.info-body {
		display: flex;
		flex-direction: column;
	}
</style>
