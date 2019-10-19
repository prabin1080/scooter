import React from "react";
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
		this.setState({ is_empty: false, is_locked: false });
	};

	handleDetachClick = e => {
		e.preventDefault();
		console.log(this.state);
		this.setState({ is_empty: true, is_locked: false });
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
