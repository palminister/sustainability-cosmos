<script>
	import { createEventDispatcher, onDestroy } from "svelte";
	import Cross from "$components/dashboard/Cross.svg.svelte";

	const dispatch = createEventDispatcher();
	const close = () => dispatch("close");

	let modal;

	const handle_keydown = (e) => {
		if (e.key === "Escape") {
			close();
			return;
		}

		if (e.key === "Tab") {
			// trap focus
			const nodes = modal.querySelectorAll("*");
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused =
		typeof document !== "undefined" && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:click={close} on:keydown={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<slot name="header" />
	<slot name="sub-header" />
	<!-- <hr /> -->
	<slot />
	<!-- <hr /> -->

	<!-- svelte-ignore a11y-autofocus -->
	<button on:click={close}><Cross /></button>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 20;
		animation: fadeIn 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 35em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em 1.5em 1em 1.5em;
		border: 1px solid var(--color-yellow);
		border-radius: 8px;
		background: rgb(16, 17, 39, 0.85);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 0.85) 0%,
			rgba(22, 27, 118, 1) 100%
		);
		z-index: 20;
		animation: fadeIn 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}

	button {
		position: absolute;
		width: 30px;
		height: 30px;
		top: 15px;
		right: 15px;
		padding: 0;
		border-radius: 100%;
		background: none;
	}
</style>
