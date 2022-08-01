import Main from './Main.js';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}
