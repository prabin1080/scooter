import React from "react";
import axios from "axios";
import base_url from "./api_config";
import "./HelmetSlot.css";

const config = {
	is_empty: {
		false: {
			text: "Helmet Available",
			className: "helmetPresent"
		},
		true: {
			text: "Empty",
			className: "helmetAbsent"
		}
	}
};

class HelmetSlot extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.slot;
	}
	handleAttachClick = e => {
		e.preventDefault();
		console.log(this.state);
		axios
			.patch(base_url + "/zone/slot/" + this.state.id + "/", {
				is_empty: false
			})
			.then(res => {
				console.log(res);
				this.setState({ ...res.data });
			})
			.catch(error => {
				console.log(error);
				alert("There is an error in updating zone");
			});
	};

	handleDetachClick = e => {
		e.preventDefault();
		axios
			.patch(base_url + "/zone/slot/" + this.state.id + "/", {
				is_empty: true
			})
			.then(res => {
				console.log(res);
				this.setState({ ...res.data });
			})
			.catch(error => {
				console.log(error);
				alert("There is an error in updating zone");
			});
	};

	getButton = () => {
		if (this.state.is_empty) {
			return (
				<button onClick={this.handleAttachClick}>Attach Helmet</button>
			);
		} else {
			if (this.state.is_locked) {
				return <div className="scanQrMessage">Scan QR to Unlock</div>;
			} else {
				return (
					<button onClick={this.handleDetachClick}>
						Detach Helmet
					</button>
				);
			}
		}
	};

	extraInfo = () => {
		if (!this.state.is_empty && !this.state.is_locked) {
			return <div className="extraInfo">Scan QR to Lock</div>;
		}
	};

	render() {
		const slot_config = config["is_empty"][this.state.is_empty];
		return (
			<div className="helmetSlot">
				<div className={slot_config.className}>{slot_config.text}</div>
				<div className="qrCode">
					<div className="content">{this.state.id}</div>
					{this.extraInfo()}
				</div>
				{this.getButton()}
			</div>
		);
	}
}

// class HelmetZone extends React.Component {
//   state = {};
// }

export default HelmetSlot;
