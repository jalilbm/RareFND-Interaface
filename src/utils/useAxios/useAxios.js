import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function useAxios(props) {
	const { authTokens, setUser, setAuthTokens, logOut } =
		useContext(AuthContext);

	const axiosInstance = axios.create({
		baseURL,
		headers:
			props && props.headers
				? { ...props.headers, Authorization: `Bearer ${authTokens?.access}` }
				: { Authorization: `Bearer ${authTokens?.access}` },
	});

	axiosInstance.interceptors.request.use(async (req) => {
		const user = jwt_decode(authTokens.access);
		const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

		if (!isExpired) return req;

		const response = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
			refresh: authTokens.refresh,
		});

		localStorage.setItem("authTokens", JSON.stringify(response.data));

		setAuthTokens(response.data);
		setUser(jwt_decode(response.data.access));

		req.headers.Authorization = `Bearer ${response.data.access}`;
		return req;
	});

	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status === 401) logOut();
			return error;
		}
	);

	return axiosInstance;
}
