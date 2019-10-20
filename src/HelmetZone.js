import React from "react";
import axios from "axios";

import HelmetSlot from "./HelmetSlot";
import base_url from "./api_config";

class HelmetZone extends React.Component {
	state = {
		slots: [
			// { id: 1, is_empty: false, is_locked: true },
			// { id: 2, is_empty: true, is_locked: true },
			// { id: 3, is_empty: true, is_locked: true },
			// { id: 4, is_empty: false, is_locked: true },
			// { id: 5, is_empty: false, is_locked: true },
			// { id: 6, is_empty: false, is_locked: true },
			// { id: 7, is_empty: false, is_locked: false },
			// { id: 8, is_empty: false, is_locked: true },
			// { id: 9, is_empty: false, is_locked: true },
			// { id: 10, is_empty: false, is_locked: true }
		]
	};

	getUpdatedZone = () => {
		axios
			.get(base_url + "/zone/slots/", {})
			.then(res => {
				console.log(res);
				console.log(this);
				this.setState({ slots: res.data });
			})
			.catch(error => {
				console.log(error);
				//on error
				console.log("There is an error in updating zone");
			});
	};

	componentDidMount = () => {
		this.getUpdatedZone();
		this.interval = setInterval(() => {
			this.getUpdatedZone();
		}, 5000);
	};
	render() {
		return (
			<div className="HelmetZone">
				<h1>HelmetZone</h1>
				<hr />
				<div style={{}}>
					{this.state.slots.map(slot => (
						<HelmetSlot key={slot.id} slot={slot} />
					))}
				</div>
			</div>
		);
	}
}

// class HelmetZone extends React.Component {
//   state = {};
// }

export default HelmetZone;
