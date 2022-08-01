import Category from './pages/Category';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Project from './pages/Project';
import {useEffect} from 'react'
import ArtImage from './assets/carousel/Art.jpg';


export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/art" element={<Category image={ArtImage} title="Arts"/>} />
        <Route exact path="/design-and-tech" element={<Category image={ArtImage} title="Design And Tech"/>} />
        <Route exact path="/film" element={<Category image={ArtImage} title="Film" />} />
        <Route exact path="/all" element={<Category image={ArtImage} title="All Categories" />} />
        <Route exact path="/project" element={<Project />} />
      </Routes>
    </div>
  )
}

