import factors from "$components/dashboard/factors.csv";
import rawData from "$components/dashboard/world_data_raw.csv";
import { interpolateRgb, extent, scaleLinear, group } from "d3";

export const viewOptions = [
	{ value: "Cluster" },
	{ value: "BeeSwarm" },
	{ value: "Heatmap" }
];

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

export const countryOptions = [
	{ value: "All" },
	...rawData.map((d) => ({ value: d.Country }))
];

export const colorOptions = [
	{ value: "Continent" },
	{ value: "Class" },
	{ value: "Sustainability Index" },
	{ value: "Human Index" },
	{ value: "Health Index" },
	{ value: "Environment Index" },
	{ value: "Economics Index" },
	{ value: "Politics Index" }
];

export const sizeOptions = [
	{ value: "GDP" },
	{ value: "Index" },
	{ value: "Feature" }
];

const factorsGrouped = group(factors, (d) => d.Factor);
export const sizeFeatureOptions = [...factorsGrouped].map(([key, value]) => ({
	groupHeader: key,
	items: value.map((d) => ({ value: d["Columns"] }))
}));

export const colors = {
	red: "#FF4200",
	green: "#2EED7B",
	blue: "#09CEFF",
	orange: "#ff7f00",
	yellow: "#FFDE32",
	purple: "#690EFF",
	dark: "#1e217e"
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
	SustainabilityIndex: { startColor: colors.dark, endColor: colors.blue },
	HumanIndex: { startColor: colors.dark, endColor: colors.purple },
	HealthIndex: { startColor: colors.dark, endColor: colors.red },
	EnvironmentIndex: { startColor: colors.dark, endColor: colors.green },
	EconomicsIndex: { startColor: colors.dark, endColor: colors.yellow },
	PoliticsIndex: { startColor: colors.dark, endColor: colors.orange }
};

export const colorAccessor = (d, color, key) => {
	color = color.replace(" ", "");
	if (color === "Continent") {
		return continentColors[d.Continent];
	} else if (color === "Class") {
		return classColors[d[key + "Class"]];
	} else {
		const colorInterpolation = interpolateRgb(
			indexColors[color].startColor,
			indexColors[color].endColor
		);
		return colorInterpolation(d[color]);
	}
};

export const sizeAccessor = (d, size, sizeIndex, sizeFeature) => {
	if (size === "GDP") {
		return +d["GDP (current US$)"];
	} else if (size === "Index") {
		return +d[sizeIndex + "Index"];
	} else {
		return +d[sizeFeature];
	}
};

export const sizeRange = [5, 15];

export const formatSNEData = (
	key,
	color,
	size,
	sizeIndex,
	sizeFeature,
	data
) => {
	let tsneKey = `tsne${key.slice(0, 3)}`;
	let sizeDomain = extent(data, (d) =>
		sizeAccessor(d, size, sizeIndex, sizeFeature)
	);
	let linearScale = scaleLinear().domain(sizeDomain).range(sizeRange);
	return data.map((d, index) => {
		return {
			...rawData[index],
			Country: d.Country,
			Continent: d.Continent,
			SNE_X: +d[tsneKey + "_X"],
			SNE_Y: +d[tsneKey + "_Y"],
			color: colorAccessor(d, color, key),
			size: linearScale(sizeAccessor(d, size, sizeIndex, sizeFeature)),
			isSize: sizeAccessor(rawData[index], size, sizeIndex, sizeFeature) !== 0,
			sizeDomain
		};
	});
};

export const formatBeeSwarmData = (
	key,
	color,
	size,
	sizeIndex,
	sizeFeature,
	data
) => {
	let beeSwarmKey = `${key}Index`;
	let sizeDomain = extent(data, (d) =>
		sizeAccessor(d, size, sizeIndex, sizeFeature)
	);
	let linearScale = scaleLinear().domain(sizeDomain).range(sizeRange);
	return data.map((d, index) => {
		return {
			...rawData[index],
			Country: d.Country,
			Continent: d.Continent,
			BeeSwarmX: 0,
			BeeSwarmY: +d[beeSwarmKey],
			color: colorAccessor(d, color, key),
			size: linearScale(sizeAccessor(d, size, sizeIndex, sizeFeature)),
			isSize: sizeAccessor(rawData[index], size, sizeIndex, sizeFeature) !== 0,
			sizeDomain
		};
	});
};

export const formatTableData = (data) => {
	return data.map((d, index) => {
		return {
			...rawData[index],
			Country: d.Country,
			HumanIndex: +d.HumanIndex,
			HealthIndex: +d.HealthIndex,
			EnvironmentIndex: +d.EnvironmentIndex,
			EconomicsIndex: +d.EconomicsIndex,
			PoliticsIndex: +d.PoliticsIndex,
			SustainabilityIndex: +d.SustainabilityIndex,
			Continent: d.Continent
		};
	});
};

export const filterData = (key, selected, data) => {
	return selected === "All" ? data : data.filter((d) => d[key] === selected);
};
