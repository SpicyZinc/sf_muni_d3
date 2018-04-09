import React, { Component } from 'react';
import * as d3 from 'd3';

const getProjection = (width, height) => {
	let translateX = width / 2;
	let translateY = height / 2 - 100;

	let sfCenter = [-122.433701, 37.767683];
	return d3.geoEquirectangular()
			.scale(300000)
			.center(sfCenter)
			.translate([ translateX, translateY ]);
};

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			geoJson : props.geoJson,
			projection : props.projection,
			className: props.className
		};
	}

	componentDidMount() {
		this.renderMap();
	}

	componentDidUpdate() {
		this.renderMap();
	}

	renderMap() {
		let { geoJson, projection, className } = this.state;

		let geoGenerator = d3.geoPath().projection( projection );
		let g = d3.select(this.refs.anchor);

		g.selectAll( "path" )
			.data( geoJson.features )
			.enter()
			.append( "path" )
			.attr( "class", className )
			.attr( "d", geoGenerator );
	}

	render() {
		return <g ref="anchor" />;
	}
}

export default Map;

