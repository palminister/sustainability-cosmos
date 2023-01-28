# Sustainability Cosmos Dashboard

A interactive tool for exploring the sustainability performance of countries around the world.

## Features

- Evaluates countries based on five key aspects of sustainability: Human, Health, Environmental, Economical, and Political conditions. `[0,1] Index Score`
  - **Sustainability Index**: overall score for each country based on the performance in all five key aspects (Human, Health, Environmental, Economical, and Political conditions).
  - **Human Index**: score for each country based on performance of aspects like human rights, education, equality, and living standards.
  - **Health Index**: score for each country based on the performance of aspects like healthcare expenditure, accessibility, mortality rate, life expectancy, and prevalence of diseases.
  - **Environmental Index**: score for each country based on the performance of aspects like environmental quality, protection, and conservation e.g., CO2 emissions, electric power consumption, renewable energy consumption, and pollution.
  - **Economic Index**: score for each country based on the performance of aspects like economic stability, growth, and income equality.
  - **Political Index**: score for each country based on the performance of aspects like political stability, control of corruption, government effectiveness, democracy, and political rights.
- Switch between three modes (views):
  - **Cluster mode**: similar countries are grouped into clusters using the t-SNE algorithm.
  - **Average mode**: see the performance of countries based on the corresponding index level and compare it to the global/continental average. The average score changes corresponding to the data you filter.
  - **Summary mode**: a table view of countries sorted corresponding to the indexes' level (sustainability by default)
- Ability to **focus on a specific continent or country**, and **customize the color and size** of each data point to represent different aspects of the data.
- **Detailed information** about each country's performance in each of the six indexes can be viewed by clicking on each data point.
- **Guide** (Tutorial) option for a step-by-step guide on how to use the dashboard and explore the data.

## Method

The process for obtaining (manipulating) the dataset used in this project can be found in the [Clustering_Our_World_with_TSNE](https://github.com/supawichO/Clustering_Our_World_with_TSNE) repository.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Note

This project was built upon [svelte-starter](https://github.com/the-pudding/svelte-starter) template. Visit the template's repository for a thorough project structure documentation.

#### Pre-existing Project

- clone the repo

#### Installation

- In your local repo run `pnpm install` or `npm install`

## Development

```bash
pnpm run dev
```

Change the script in `package.json` to `"dev": "svelte-kit dev --host"` to test on your local network on a different device.

## Deploy

```bash
pnpm run build
```

This generates a directory called `build` with the statically rendered app.

A shortcut for github pages:

```bash
make github
```

## Authors

- **Author1**: [Supawich (Dear) Orian](https://github.com/author1)
- **Author2**: [Palm Jumnongrat](https://github.com/author2)

## Acknowledgments

- The data sources are collected from [DataBank | The World Bank](https://databank.worldbank.org/) and [Our World in Data](https://ourworldindata.org/). The datasets used in this project are the property of their respective owners and all rights are reserved.
- The manipulated data used for the visualization of this project can be found from the following:
  - [Imputed data](https://github.com/palminister/sustainability-cosmos/blob/master/src/components/dashboard/world_data_imputed.csv)
  - [Raw data](https://github.com/palminister/sustainability-cosmos/blob/master/src/components/dashboard/world_data_raw.csv)
