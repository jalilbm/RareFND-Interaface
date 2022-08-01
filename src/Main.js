import Category from './pages/Category';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Project from './pages/Project';
import {useEffect} from 'react'
import ArtImage from './assets/carousel/Art.jpg';
import DesignAndTech from './assets/carousel/gazel.jpg';
import FilmImage from './assets/carousel/lens.jpg';
import AllCategories from './assets/carousel/allCategories.jpg';

export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/art" element={<Category image={ArtImage} title="Arts"/>} />
        <Route exact path="/design-and-tech" element={<Category image={DesignAndTech} title="Design And Tech"/>} />
        <Route exact path="/film" element={<Category image={FilmImage} title="Film" />} />
        <Route exact path="/all" element={<Category image={AllCategories} title="All Categories" />} />
        <Route exact path="/project" element={<Project />} />
      </Routes>
    </div>
  )
}

