// credit: https://svelte.dev/repl/09f442dc50ce40519537d46c923913e9?version=3.55.1
export const flipboard = (node, params) => {
	const text = node.textContent.trim();

	let lastTime = 0;
	return {
		duration: 5000,
		...params,
		tick(t) {
			if (t === 1) {
				node.textContent = text;
				return;
			}

			const time = Date.now();
			if (time - lastTime < 32) return;
			lastTime = time;

			let str = "";
			for (let i = 0; i < text.length; i++) {
				const progress = i / text.length;
				if (text[i] === " " || progress < t) {
					str += text[i];
				} else if (progress < t * 1.5) {
					str += "•";
				} else if (progress < t * 1.55) {
					str += "-";
				} else {
					str += "";
				}
			}
			node.textContent = str;
		}
	};
};
