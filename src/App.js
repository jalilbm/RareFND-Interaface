import Main from './Main.js';
import NavBar from './components/Navbar';
import { BrowserRouter as Router } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Main />
      </div>
    </Router>
  );
}
