<script>
	import Cross from "$components/dashboard/Cross.svg.svelte";
	import { fly } from "svelte/transition";

	export let open = false;

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
	<button class="info" on:click={handleClick}>
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
				<h5>ABOUT</h5>
				<p>
					The <span class="hilighted">Sustainability</span> Cosmos dashboard is
					an interactive tool that allows users to explore the sustainability
					performance of countries based on five key aspects:
					<span class="hilighted"
						>Human, Health, Environmental, Economical, and Political</span
					>
					conditions.
					<br /> <br />
					The ability to toggle between different modes, focus on specific countries
					and continents, and customize data points, encourages users to uncover
					interesting patterns and a deeper understanding of the current state of
					our world.
					<br /> <br />
					Enjoy diving into the data and discovering the shining stars of sustainability!
				</p>
				<slot name="tour" />
				<h5>DATA</h5>
				<ul>
					<li>
						<a
							href="https://databank.worldbank.org/"
							target="_blank"
							rel="noopener noreferrer">DataBank | The World Bank</a
						>
					</li>
					<li>
						<a
							href="https://ourworldindata.org/"
							target="_blank"
							rel="noopener noreferrer">Our World in Data</a
						>
					</li>
				</ul>
				<h5>METHOD</h5>
				<ul>
					<li>
						<a
							href="https://github.com/supawichO/Clustering_Our_World_with_TSNE"
							target="_blank"
							rel="noopener noreferrer"
							>Clustering Our World with TSNE
						</a>
					</li>
				</ul>
				<h5>THE TEAM</h5>
				<ul>
					<li>
						<a
							href="https://www.linkedin.com/in/supawich-orian/"
							target="_blank"
							rel="noopener noreferrer"
							>Supawich (Dear) Orian
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/palminister/"
							target="_blank"
							rel="noopener noreferrer"
							>Palm Jumnongrat
						</a>
					</li>
				</ul>
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
		background: linear-gradient(
			0deg,
			rgba(20, 20, 49, 1) 0%,
			rgb(4, 20, 255) 100%
		);
		padding: 0;
		line-height: 0;
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
		border-radius: 100%;
	}
	button:hover {
		background: rgba(20, 23, 84, 0.9);
	}
	.close-button {
		position: absolute;
		right: 20px;
	}
	.info-panel {
		position: absolute;
		z-index: 50;
		width: 40%;
		height: 100vh;
		right: 0;
		top: 0;
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(27, 34, 175, 1) 100%
		);
		font-size: var(--12px);
		font-weight: 400;
		color: var(--color-white);
		padding: 20px;
	}
	.info-body {
		display: flex;
		flex-direction: column;
	}
	.hilighted {
		color: var(--color-yellow);
		font-weight: 700;
	}
	h5 {
		font-weight: 700;
		letter-spacing: 2px;
		color: var(--color-yellow);
	}
	p {
		letter-spacing: 1.5px;
		margin: 0px;
	}
	a {
		font-size: var(--12px);
		letter-spacing: 1.5px;
		color: var(--color-white);
	}
	a:hover {
		color: var(--color-purple-light);
	}
</style>
