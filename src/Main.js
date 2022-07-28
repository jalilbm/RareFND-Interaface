import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';


export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

