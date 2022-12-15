import React from "react";
import { Button, message, Form, Input } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function (props) {
	const [validToken, setValidToken] = useState(null);
	const { pathname, hash, key } = useLocation();
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	const token = pathname.split("/").pop();
	const email = pathname.split("/").at(-2);
	useEffect(() => {
		axios
			.post(
				process.env.REACT_APP_BASE_URL +
					"/api/user/check_reset_password_token/",
				{ email: email, token: token }
			)
			.then((response) => {
				if (response.status === 200) {
					setValidToken(true);
				}
			})
			.catch((err) => {
				setValidToken(false);
			});
	}, []);
	const onFinish = () => {
		messageApi.open({
			type: "loading",
			content: "Please wait!",
		});
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/user/change_password/", {
				email: email,
				token: token,
				password: document.getElementById("basic_password-1").value,
			})
			.then((response) => {
				if (response.status === 200) {
					messageApi.open({
						type: "success",
						content: "Password changed successfully!",
					});
					setTimeout(function () {
						if (newState == -1) {
							navigate("/login");
						}
					}, 5000);
				}
			})
			.catch((err) => {
				messageApi.open({
					type: "error",
					content: "Could not change password, please try again later",
				});
			});
	};

	const onFinishFailed = () => {
		messageApi.open({
			type: "error",
			content: "Failed!",
		});
	};
	return (
		<div className="new-password-container" style={{ width: "100%" }}>
			{validToken === null ? (
				<LoadingSpinner color="white" />
			) : validToken === true ? (
				<>
					{contextHolder}
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						style={{ padding: "10%" }}
					>
						<Form.Item
							label="New password"
							name="password-1"
							id="password-1"
							rules={[
								{ required: true, message: "Please input your password!" },
								() => ({
									validator(_, value) {
										if (!value || value.length >= 8) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("Password is less than 8 characters!")
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							label="New password (again)"
							name="password-2"
							id="password-2"
							dependencies={["password-1"]}
							rules={[
								{
									required: true,
									message: "Please input your password again!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password-1") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error(
												"The two passwords that you entered do not match!"
											)
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item className="centerDiv">
							<Button type="default" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</>
			) : (
				<div className="centerDiv" style={{ height: "70vh" }}>
					<h1>
						Invalid Request or Email address, please try to reset your password
						again
					</h1>
				</div>
			)}
		</div>
	);
}
