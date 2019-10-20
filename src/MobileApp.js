import React from "react";
import axios from "axios";
import base_url from "./api_config";
import "./MobileApp.css";

class MobileApp extends React.Component {
	state = {
		qr_code: "",
		is_scooter_rented: false,
		count: 0,
		notification: null
	};

	showNotification = text => {
		this.setState({ notification: text });
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.setState({ notification: null });
		}, 3000);
	};

	handleQrChange = e => {
		this.setState({ qr_code: e.target.value });
	};

	componentDidMount = () => {
		axios
			.get(base_url + "/zone/booking-details/", {})
			.then(res => {
				console.log(res);
				console.log(res.data);
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
				if (res.data.hasOwnProperty("count")) {
					this.setState({ count: res.data.count });
				}
				this.showNotification(res.data.message);
			})
			.catch(error => {
				console.log(error);
				this.showNotification("There is an error in updating zone");
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
				this.showNotification("Your Ride has Started");
				if (res.data.hasOwnProperty("count")) {
					this.setState({ count: res.data.count });
				}
				// alert(res.data.message);
			})
			.catch(error => {
				console.log(error);
				this.showNotification(error.response.data.message);
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
				this.showNotification("Your Ride has Ended");
				if (res.data.hasOwnProperty("count")) {
					this.setState({ count: res.data.count });
				}
				// alert("Ride Ended");
			})
			.catch(error => {
				console.log(error.response.data);
				this.showNotification(error.response.data.message);
			});
	};
	render() {
		return (
			<div className="mobileApp">
				<h1>MobileApp</h1>
				<hr />
				<div className="mobileBox">
					{this.state.notification ? (
						<div className="notification">
							{this.state.notification}
						</div>
					) : null}
					<div className="rideSection">
						{this.state.is_scooter_rented ? (
							<div>
								<div>You have booked a Vogo</div>
								<button onClick={this.handleEndRide}>
									End Ride
								</button>
							</div>
						) : (
							<button onClick={this.handleStartRide}>
								Start Ride
							</button>
						)}
					</div>
					<form
						onSubmit={this.handleSubmit}
						style={{ marginTop: 100 }}
					>
						<input
							type="text"
							value={this.state.qr_code}
							onChange={this.handleQrChange}
						/>
						<button>Send QR Data</button>
						<br />
					</form>
					<h4>Currently you have {this.state.count} helmets</h4>
				</div>
			</div>
		);
	}
}

// class MobileApp extends React.Component {
//   state = {};
// }

export default MobileApp;
