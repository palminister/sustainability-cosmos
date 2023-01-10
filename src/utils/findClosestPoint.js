export const findClosestPoint = (arr, [x, y]) => {
	let closest = null;
	let closestDistance = Infinity;
	for (let i = 0; i < arr.length; i++) {
		const distance = Math.sqrt(
			Math.pow(arr[i].x - x, 2) + Math.pow(arr[i].y - y, 2)
		);
		if (distance < closestDistance) {
			closest = arr[i];
			closestDistance = distance;
		}
	}
	return closest;
};
