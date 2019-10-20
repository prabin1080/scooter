import React from "react";
import axios from "axios";
import base_url from "./api_config";

class MobileApp extends React.Component {
	state = { qr_code: "", is_rented: true };

	handleQrChange = e => {
		this.setState({ qr_code: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
		axios
			.patch(base_url + "/zone/slot-qr/" + this.state.qr_code + "/", {
				is_empty: false
			})
			.then(res => {
				console.log(res);
				this.setState({ qr_code: "" });
				alert(res.data.message);
			})
			.catch(error => {
				console.log(error);
				alert("There is an error in updating zone");
			});
	};

	handleStartRide = () => {
		this.setState({ is_rented: true });
	};

	handleEndRide = () => {
		this.setState({ is_rented: false });
	};
	render() {
		return (
			<div className="MobileApp">
				<h1>MobileApp</h1>
				<hr />
				{this.state.is_rented ? (
					<div>
						<div>You have rented a bike</div>
						<button onClick={this.handleEndRide}>End Ride</button>
					</div>
				) : (
					<button onClick={this.handleStartRide}>Start Ride</button>
				)}
				<form onSubmit={this.handleSubmit} style={{ marginTop: 100 }}>
					<input
						type="text"
						value={this.state.qr_code}
						onChange={this.handleQrChange}
					/>
					<button>Send QR Data</button>
					<br />
				</form>
			</div>
		);
	}
}

// class MobileApp extends React.Component {
//   state = {};
// }

export default MobileApp;
