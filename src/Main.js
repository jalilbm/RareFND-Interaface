import Category from './pages/Category';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Project from './pages/Project';
import {useEffect} from 'react'


export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/project" element={<Project />} />
      </Routes>
    </div>
  )
}

