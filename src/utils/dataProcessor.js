import factors from "$components/dashboard/factors.csv";
import rawData from "$components/dashboard/world_data_raw.csv";
import { interpolateRgb, extent, scaleLinear, group } from "d3";

export const viewOptions = [
	{ value: "Cluster" },
	{ value: "Average" },
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

export const indexKeys = [
	"SustainabilityIndex",
	"HumanIndex",
	"HealthIndex",
	"EnvironmentIndex",
	"EconomicsIndex",
	"PoliticsIndex"
];

export const continentOptions = [
	{ value: "All Continents" },
	{ value: "Africa" },
	{ value: "Asia" },
	{ value: "Europe" },
	{ value: "North America" },
	{ value: "South America" },
	{ value: "Oceania" }
];

export const classOptions = [
	{ value: "All" },
	{ value: "Low" },
	{ value: "High" }
];

export const countryOptions = [
	{ value: "All Countries" },
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

export const isFactor = (key) => {
	const allFactors = factors.map((d) => d.Columns);

	return allFactors.includes(key);
};

export const colors = {
	red: "#FF4200",
	green: "#2EED7B",
	blue: "#09CEFF",
	orange: "#ff7f00",
	yellow: "#FFDE32",
	purple: "#995bff",
	purpleDark: "#5b6fff",
	pink: "#ed2ea0",
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
	SustainabilityIndex: { startColor: colors.red, endColor: colors.blue },
	HumanIndex: { startColor: colors.purple, endColor: colors.yellow },
	HealthIndex: { startColor: colors.yellow, endColor: colors.pink },
	EnvironmentIndex: { startColor: colors.pink, endColor: colors.green },
	EconomicsIndex: { startColor: colors.purpleDark, endColor: colors.orange },
	PoliticsIndex: { startColor: colors.orange, endColor: colors.blue }
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

export const isAll = (selected) =>
	selected ? selected.includes("All") : false;

export const filterData = (key, selected, data) => {
	return isAll(selected) ? data : data.filter((d) => d[key] === selected);
};

export const filterContinentCountry = (
	selectedContinent,
	selectedCountry,
	data
) => {
	if (selectedContinent) {
		if (isAll(selectedContinent) && isAll(selectedCountry)) {
			return data;
		} else if (isAll(selectedContinent)) {
			return data;
		} else if (isAll(selectedCountry)) {
			return data.filter((d) => d.Continent === selectedContinent);
		} else {
			return data.filter(
				(d) =>
					d.Continent === selectedContinent || d.Country === selectedCountry
			);
		}
	} else {
		return data;
	}
};

export const getOpacity = (
	d,
	isAllCountry,
	isAllContinent,
	selectedCountry,
	selectedContinent,
	dim,
	bright
) => {
	// Check if all countries and continents are selected
	if (isAllCountry && isAllContinent) {
		return bright;
	}
	// check if all countries are selected
	else if (isAllCountry) {
		// check if the selected continent is the same as current country
		if (selectedContinent === d.Continent) {
			return bright;
		} else {
			return dim;
		}
	}
	// check if all continents are selected
	else if (isAllContinent) {
		// check if the selected country is the same as current country
		if (selectedCountry === d.Country) {
			return bright;
		} else {
			return dim;
		}
	} else {
		// check if the selected country or continent is the same as current country or continent
		if (selectedCountry === d.Country || selectedContinent === d.Continent) {
			return bright;
		} else {
			return dim;
		}
	}
};

export const numberFormatter = (number) => {
	let absNum = Math.abs(number);
	if (absNum > 1000000000) {
		return `${Math.round(number / 1000000000).toLocaleString()} B`;
	} else if (absNum > 1000000) {
		return `${Math.round(number / 1000000).toLocaleString()} M`;
	} else if (absNum > 1000) {
		return `${Math.round(number / 1000).toLocaleString()} K`;
	} else if (absNum <= 1000) {
		return number.toFixed(1).toLocaleString();
	} else {
		return number;
	}
};
