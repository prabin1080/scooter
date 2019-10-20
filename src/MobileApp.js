import React from "react";
import axios from "axios";
import base_url from "./api_config";

class MobileApp extends React.Component {
	state = { qr_code: "", is_scooter_rented: false, booking_count: 0 };

	handleQrChange = e => {
		this.setState({ qr_code: e.target.value });
	};

	componentDidMount = () => {
		axios
			.get(base_url + "/zone/booking-details/", {})
			.then(res => {
				console.log(res);
				this.setState({ ...res.data });
			})
			.catch(error => {
				console.log(error);
			});
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
				if (res.data.hasOwnProperty("booking_count")) {
					this.setState({ booking_count: res.data.booking_count });
				}
				alert(res.data.message);
			})
			.catch(error => {
				console.log(error);
				alert("There is an error in updating zone");
			});
	};

	handleStartRide = () => {
		axios
			.patch(base_url + "/zone/booking-details/", {
				is_scooter_rented: true
			})
			.then(res => {
				console.log(res);
				this.setState({ is_scooter_rented: true });
				if (res.data.hasOwnProperty("booking_count")) {
					this.setState({ booking_count: res.data.booking_count });
				}
				// alert(res.data.message);
			})
			.catch(error => {
				console.log(error);
				alert("There is an error");
			});
	};

	handleEndRide = () => {
		axios
			.patch(base_url + "/zone/booking-details/", {
				is_scooter_rented: false
			})
			.then(res => {
				console.log(res);
				this.setState({ is_scooter_rented: false });
				if (res.data.hasOwnProperty("booking_count")) {
					this.setState({ booking_count: res.data.booking_count });
				}
				// alert("Ride Ended");
			})
			.catch(error => {
				console.log(error);
				alert("There is an error");
			});
	};
	render() {
		return (
			<div className="MobileApp">
				<h1>MobileApp</h1>
				<hr />
				<h4>Currently you have {this.state.booking_count} helmets</h4>
				{this.state.is_scooter_rented ? (
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
