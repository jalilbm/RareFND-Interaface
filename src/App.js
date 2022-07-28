import NavBar from './components/Navbar';
import Carousel from './components/Carousel';
import HomeCards from './components/CardGrid';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Carousel />
      <HomeCards />
    </div>
  );
}
