import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	const [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const loginUser = async (email, password) => {
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/auth/token/", {
				email: email,
				password: password,
			})
			.then((response) => {
				if (response.status === 200) {
					setAuthTokens(response.data);
					setUser(jwt_decode(response.data.access));
					localStorage.setItem("authTokens", JSON.stringify(response.data));
					navigate("/");
				} else {
					alert("login failed");
				}
			})
			.catch(function (error) {
				alert("login failed");
			});
	};
	const logOut = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/login");
	};

	const updateToken = async () => {
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/auth/token/refresh/", {
				refresh: authTokens.refresh,
			})
			.then((response) => {
				if (response.status === 200) {
					setAuthTokens(response.data);
					setUser(jwt_decode(response.data.access));
					localStorage.setItem("authTokens", JSON.stringify(response.data));
				} else {
					logOut();
				}
			});
		if (loading) {
			setLoading(false);
		}
	};
	let contextData = {
		loginUser: loginUser,
		user: user,
		logOut: logOut,
		authTokens: authTokens,
	};

	useEffect(() => {
		if (authTokens) {
			if (loading) {
				updateToken();
			}
			let interval = setInterval(() => {
				if (authTokens) {
					updateToken();
				}
			}, 1000 * 60 * 4);
			return () => clearInterval(interval);
		} else {
			setLoading(false);
		}
	}, [authTokens, contextData]);
	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
