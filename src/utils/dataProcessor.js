import factors from "$components/dashboard/factors.csv";
import rawData from "$components/dashboard/world_data_raw.csv";
import { interpolateRgb, extent, scaleLog, scaleLinear } from "d3";
export const viewOptions = [{ value: "Cluster" }, { value: "BeeSwarm" }];

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

export const colorOptions = [
	{ value: "Continent" },
	{ value: "Class" },
	{ value: "Index" }
];

export const sizeOptions = [
	{ value: "GDP" },
	{ value: "Index" },
	{ value: "Feature" }
];

export const sizeFeatureOptions = [];

export const colors = {
	red: "#FF4200",
	green: "#2EED7B",
	blue: "#09CEFF",
	orange: "#ff7f00",
	yellow: "#FFDE32",
	purple: "#690EFF",
	dark: "#0D172A"
};

export const continentColors = {
	Africa: colors.red,
	Asia: colors.green,
	Europe: colors.blue,
	"North America": colors.orange,
	"South America": colors.yellow,
	Oceania: colors.purple
};

export const classColors = {
	High: colors.blue,
	Low: colors.red
};

export const indexColors = {
	Sustainability: { startColor: colors.dark, endColor: colors.blue },
	Human: { startColor: colors.dark, endColor: colors.purple },
	Health: { startColor: colors.dark, endColor: colors.red },
	Environment: { startColor: colors.dark, endColor: colors.green },
	Economics: { startColor: colors.dark, endColor: colors.yellow },
	Politics: { startColor: colors.dark, endColor: colors.orange }
};

export const colorAccessor = (d, color, key, colorIndex) => {
	if (color === "Continent") {
		return continentColors[d.Continent];
	} else if (color === "Class") {
		return classColors[d[key + "Class"]];
	} else {
		const colorInterpolation = interpolateRgb(
			indexColors[colorIndex].startColor,
			indexColors[colorIndex].endColor
		);
		return colorInterpolation(d[colorIndex + "Index"]);
	}
};

export const sizeAccessor = (d, size, sizeIndex) => {
	if (size === "GDP") {
		return +d["GDP (current US$)"];
	} else if (size === "Index") {
		return +d[sizeIndex + "Index"];
	} else {
		// TODO: Aceess feature
		return +d[size];
	}
};

export const formatSNEData = (
	key,
	color,
	colorIndex,
	size,
	sizeIndex,
	data
) => {
	let tsneKey = `tsne${key.slice(0, 3)}`;
	let sizeDomain = extent(data, (d) => sizeAccessor(d, size, sizeIndex));
	let logScale = scaleLog().domain(sizeDomain).range([5, 15]);
	return data.map((d, index) => {
		return {
			// ...rawData[index],
			Country: d.Country,
			Continent: d.Continent,
			SNE_X: +d[tsneKey + "_X"],
			SNE_Y: +d[tsneKey + "_Y"],
			color: colorAccessor(d, color, key, colorIndex),
			size: logScale(sizeAccessor(d, size, sizeIndex)),
			isSize: sizeAccessor(rawData[index], size, sizeIndex) !== 0
		};
	});
};

export const formatBeeSwarmData = (
	key,
	color,
	colorIndex,
	size,
	sizeIndex,
	data
) => {
	let beeSwarmKey = `${key}Index`;
	let sizeDomain = extent(data, (d) => sizeAccessor(d, size, sizeIndex));
	let logScale = scaleLog().domain(sizeDomain).range([5, 15]);
	return data.map((d, index) => {
		return {
			// ...rawData[index],
			Country: d.Country,
			Continent: d.Continent,
			BeeSwarmX: 0,
			BeeSwarmY: +d[beeSwarmKey],
			color: colorAccessor(d, color, key, colorIndex),
			size: logScale(sizeAccessor(d, size, sizeIndex)),
			isSize: sizeAccessor(rawData[index], size, sizeIndex) !== 0
		};
	});
};

export const filterData = (key, selected, data) => {
	return selected === "All" ? data : data.filter((d) => d[key] === selected);
};
