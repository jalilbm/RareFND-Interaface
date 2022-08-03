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
        <Route exact path="/art" element={<Category category_name='art'/>} />
        <Route exact path="/design-and-tech" element={<Category category_name='design and tech'/>} />
        <Route exact path="/film" element={<Category category_name='film' />} />
        <Route exact path="/all" element={<Category category_name='all' />} />
        <Route exact path="/project/:id" element={<Project />} />
      </Routes>
    </div>
  )
}

