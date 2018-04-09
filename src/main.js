import React, { Component } from "react";
import * as d3 from 'd3';
import Layer from './components/Map';
import Shuttle from './components/Shuttle';
import MulSelect from './components/MultipleSelect';

import styles from './style.css';

const neighborhoods = require('./static/neighborhoods.json');
const arteries = require('./static/arteries.json');
const freeways = require('./static/freeways.json');
const streets = require('./static/streets.json');

import {
	WIDTH,
	HEIGHT,
	ALL_VEHICLE_URL,
	ONE_ROUTE_VEHICLE_URL,
	ROUTE_LIST_URL,
	SCALE,
	SCALE_EXTENT,
	SF_CENTER,
	NEIGHBORHOOD,
	ARTERY,
	FREEWAY,
	STREET,
} from './static/constants';

const getProjection = (width, height) => {
	let translateX = width / 2;
	let translateY = height / 2 - 100;

	return d3.geoEquirectangular()
			.scale(SCALE)
			.center(SF_CENTER)
			.translate([ translateX, translateY ]);
};

class Main extends Component {
	constructor(props) {
		super(props);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.updateRoutes = this.updateRoutes.bind(this);
		this.restoreRoutes = this.restoreRoutes.bind(this);

		this.state = {
			routeHash: {},
			selectedRoutes: [],
			vehicles: [],
			selectedOptions: [],
		};
	}

	initVehicleLocations() {
		d3.json(ALL_VEHICLE_URL).then((locations) => {
			d3.json(ROUTE_LIST_URL).then((list) => {
				let routeHash = {};
				list.route.forEach((item) => {
					routeHash[item.tag] = item.title;	
				});

				this.setState({
					vehicles: locations.vehicle,
					selectedRoutes: list.route,
					routeHash
				});
			});
		});
	}

	componentDidMount() {
		this.initVehicleLocations();

		// let map = d3.select(this.refs.map);
		// let groups = map.selectAll("g")._groups[0];

		// let zoom = d3.zoom()
		// 	.scaleExtent(SCALE_EXTENT)
		// 	.translateExtent([[-100, -100], [WIDTH + 100, HEIGHT + 100]])
		// 	.on("zoom", () => {
		// 		for (let i = 0; i < groups.length; i++) {
		// 			let group = groups[i];
		// 			d3.select(group).style("stroke-width", `${1.5 / d3.event.transform.k}px`)
		// 			d3.select(group).attr("transform", d3.event.transform);
		// 		}
		// 	});

		// d3.select(this.refs.map).call(zoom)
		// 	.append('svg:g')
		// 	.attr('transform', 'translate(100, 50) scale(0.5, 0.5)');
	}

	handleSelectChange(value) {
		this.setState({ selectedOptions: value });
	}

	updateRoutes() {
		this.setState({
			selectedRoutes: this.state.selectedOptions,
			vehicles: []
		});

		let newVehicleLocations = [];
		this.state.selectedOptions.forEach((route) => {
			d3.json(ONE_ROUTE_VEHICLE_URL + route.value).then((list) => {
				if (list.vehicle) {
					newVehicleLocations = newVehicleLocations.concat(list.vehicle);
					this.setState({
						vehicles: [ ...this.state.vehicles, ...list.vehicle ]
					});
				}
			});
		});
	}

	restoreRoutes() {
		this.setState({
			routeHash: {},
			selectedRoutes: [],
			vehicles: [],
			selectedOptions: [],
		});
		this.initVehicleLocations();
	}

	render() {
		let projection = getProjection(WIDTH, HEIGHT); 
		let shuttleData = {
			projection: projection,
			routeHash: this.state.routeHash,
			selectedRoutes: this.state.selectedRoutes,
			vehicles: this.state.vehicles,
		};

		return (
			<div>
				<h1>
					San Francisco Muni MAP
				</h1>

				<MulSelect
					selectedOptions={this.state.selectedOptions}
					handleSelectChange={this.handleSelectChange}
					updateRoutes={this.updateRoutes}
					restoreRoutes={this.restoreRoutes}
				/>

				<svg ref="map"
					width={WIDTH}
					height={HEIGHT}
				>
					<Layer
						geoJson={neighborhoods}
						projection={projection}
						className={NEIGHBORHOOD}
					/>
					<Layer
						geoJson={arteries}
						projection={projection}
						className={ARTERY}
					/>
					<Layer
						geoJson={freeways}
						projection={projection}
						className={FREEWAY}
					/>
					<Layer
						geoJson={streets}
						projection={projection}
						className={STREET}
					/>

					{
						this.state.vehicles.length > 0 && <Shuttle
							data={shuttleData}
						/>
					}

				</svg>
			</div>
		);
	}
}

export default Main;