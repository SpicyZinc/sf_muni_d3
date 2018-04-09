import React, { Component } from 'react';
import * as d3 from 'd3';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {
	ROUTE_LIST_URL,
	MULTI_SELECTION_PLACEHOLDER
} from '../static/constants';

class MulSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: [],
			selectedOptions: props.selectedOptions,
			handleSelectChange: props.handleSelectChange,
			updateRoutes: props.updateRoutes,
			restoreRoutes: props.restoreRoutes,
		};
	}

	componentDidMount() {
		d3.json(ROUTE_LIST_URL).then((list) => {
			this.setState({
				options: list.route.map((item) => ({
					label: item.title,
					value: item.tag
				}))
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			selectedOptions: nextProps.selectedOptions
		});
	}

	render() {
		const {
			options,
			selectedOptions,
			handleSelectChange,
			updateRoutes,
			restoreRoutes
		} = this.state;

		return (
			<div>
				<Select
					closeOnSelect={false}
					removeSelected={true}
					multi={true}
					placeholder={MULTI_SELECTION_PLACEHOLDER}
					options={options}
					value={selectedOptions}
					onChange={handleSelectChange}
					style={{width: 500}}
				/>
				<button
					disabled={selectedOptions.length === 0}
					onClick={updateRoutes}
				>
					Submit
				</button>
				<button
					onClick={restoreRoutes}
				>
					Reset
				</button>
			</div>
		);
	}
}

export default MulSelect;