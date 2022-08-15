import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

export default function PrivateRoute({ Component }) {
	let { user } = useContext(AuthContext);
	return user ? <Component /> : <Navigate to="/login" />;
}
