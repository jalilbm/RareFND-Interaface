import Main from "./Main.js";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { ProviderContext } from "./web3/ProviderContext";
import { AuthProvider } from "./Context/AuthContext/index.js";
import ScrollToTop from "./Context/ScrollToTop/index.js";

export default function App() {
	const [provider, setProvider] = useState();
	return (
		<div className="App" style={{ fontFamily: "Calibri" }}>
			<ScrollToTop />
			<AuthProvider>
				<ProviderContext.Provider value={{ provider, setProvider }}>
					<NavBar />
					<Main />
					<Footer />
				</ProviderContext.Provider>
			</AuthProvider>
		</div>
	);
}
