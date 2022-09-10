import "./Profile.css";
import PhoneInput from "react-phone-input-2";

export default function Profile() {
	return (
		<div className="container rounded bg-white mt-5 mb-5">
			<div className="row">
				<div className="col-md-5 border-right">
					<div className="d-flex flex-column align-items-center text-center p-3 py-5">
						<img
							className="rounded-circle mt-5"
							width="150px"
							src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						/>
						<span className="font-weight-bold">Edogaru</span>
						<span className="text-black-50">edogaru@mail.com.my</span>
						<span> </span>
					</div>
				</div>
				<div className="col-md-7 border-right">
					<div className="p-3 py-5">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h4 className="text-right">Profile Settings</h4>
						</div>
						<div className="row mt-2">
							<div className="col-md-6">
								<label className="labels">Name</label>
								<input
									type="text"
									className="form-control"
									placeholder="first name"
									value=""
								/>
							</div>
							<div className="col-md-6">
								<label className="labels">last name</label>
								<input
									type="text"
									className="form-control"
									value=""
									placeholder="surname"
								/>
							</div>
						</div>
						<div className="col-md-12">
							<label className="labels">Email</label>
							<input
								type="text"
								className="form-control"
								placeholder="enter email"
								value=""
							/>
						</div>
						<div className="row mt-3">
							<div className="col-md-12">
								<label className="labels">Mobile Number</label>
								<PhoneInput
									id="phonenumber"
									name="phone"
									classNameName="mt-1"
									inputStyle={{ width: "100%" }}
									placeholder="Enter Phone Number (Optional)"
									// value={formValues.phone}
									// onChange={(value) =>
									// 	setFormValues({ ...formValues, phone: value })
									// }
									inputProps={{
										name: "phone",
										// required: true,
										autoFocus: true,
									}}
								/>
							</div>
							<div className="col-md-12">
								<label className="labels">Address</label>
								<input
									type="text"
									className="form-control"
									placeholder="enter your address"
									value=""
								/>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-md-12">
								<label className="labels">Country</label>
								<input
									type="text"
									className="form-control"
									placeholder="country"
									value=""
								/>
							</div>
						</div>
						<div className="mt-5 text-center">
							<button className="btn btn-primary profile-button" type="button">
								Save Profile
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
