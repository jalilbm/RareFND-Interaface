import Category from "./pages/Category";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Project from "./pages/Project";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignupPage";

export default function Main() {
	return (
		<div className="main">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/home" element={<Home />} />
				<Route path="/category/:categoryname" element={<Category />} />
				<Route exact path="/project/:id" element={<Project />} />
				<Route exact path="/about" element={<About />} />
				<Route exact path="/programs" element={<Programs />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}
