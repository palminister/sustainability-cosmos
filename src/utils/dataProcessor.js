export const indexOptions = [
	{ value: "Sustainability" },
	{ value: "Human" },
	{ value: "Health" },
	{ value: "Environment" },
	{ value: "Economics" },
	{ value: "Politics" }
];

export const continentOptions = [
	{ value: "All" },
	{ value: "Africa" },
	{ value: "Asia" },
	{ value: "Europe" },
	{ value: "North America" },
	{ value: "South America" },
	{ value: "Oceania" }
];

export const formatSNEData = (key, data) => {
	let tsneKey = `tsne${key.slice(0, 3)}`;
	return data.map((d) => {
		return {
			Country: d.Country,
			Continent: d.Continent,
			SNE_X: +d[tsneKey + "_X"],
			SNE_Y: +d[tsneKey + "_Y"]
		};
	});
};

export const formatBeeSwarmData = (key, data) => {
	let beeSwarmKey = `${key}Index`;
	return data.map((d) => {
		return {
			Country: d.Country,
			Continent: d.Continent,
			BeeSwarmX: 0,
			BeeSwarmY: +d[beeSwarmKey]
		};
	});
};

export const filterData = (key, selected, data) => {
	return selected === "All" ? data : data.filter((d) => d[key] === selected);
};
