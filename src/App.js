import Main from "./Main.js";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { ProviderContext } from "./web3/ProviderContext";

export default function App() {
	const [provider, setProvider] = useState();
	return (
		<Router>
			<div className="App">
				<ProviderContext.Provider value={{ provider, setProvider }}>
					<NavBar />
					<Main />
					<Footer />
				</ProviderContext.Provider>
			</div>
		</Router>
	);
}
