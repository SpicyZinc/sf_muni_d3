import React, { Component } from 'react';
import * as d3 from 'd3';

import {
	ALL_VEHICLE_URL,
	ONE_ROUTE_VEHICLE_URL,
	UPDATE_INTERVAL
} from '../static/constants';

class Shuttle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projection: props.data.projection,
			vehicles: props.data.vehicles,
			selectedRoutes: props.data.selectedRoutes,
			routeHash: props.data.routeHash,
			timeId: 0,
		};
	}

	componentDidMount() {
		let id = setInterval(() => {
			d3.json(ALL_VEHICLE_URL).then((locations) => {
				this.removeShuttle();
				this.setState({
					vehicles: locations.vehicle
				});
			});
		}, UPDATE_INTERVAL);

		this.setState({
			timeId: id
		});

		this.renderShuttle();
	}

	componentDidUpdate() {
		this.state.vehicles && this.state.vehicles.length > 0 && this.renderShuttle();
	}

	// check change from parent component update
	componentWillReceiveProps(nextProps) {
		clearInterval(this.state.timeId);
	}

	componentWillUpdate(nextProps, nextState) {
		return false;
	}

	renderShuttle() {
		let vehicles = this.state.vehicles.map((v) => ({
			id: v.id,
			routeTag: v.routeTag,
			routeName: this.state.routeHash[v.routeTag],
			position: this.state.projection([v.lon, v.lat]),
		}));

		let g = d3.select(this.refs.Shuttle);

		let tooltip = d3.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("position", "absolute")
			.style("top", "18%")
			.style("left", "25%")
			.style("z-index", "10")
			.style("visibility", "hidden");
			
		vehicles.map(({ position: [x, y], id, routeName, routeTag }, index) => {
			g.append("rect")
				.attr("x", x)
				.attr("y", y)
				.attr("height", 15)
				.attr("width", 12)
				.attr("rx", 4)
				.attr("ry", 4)
				.attr("class", "bus")
				.on("mouseover", () => tooltip.style("visibility", "visible").text(`Route Name: ${routeName}`))
				.on("mouseout", () => tooltip.style("visibility", "hidden"));
		});
	}

	removeShuttle() {
		d3.select("body").selectAll("div.tooltip").remove();

		d3.select(this.refs.Shuttle)
			.selectAll("rect").remove();
	}

	render() {
		return (
			<g ref="Shuttle" />
		);
	}
}

export default Shuttle;

