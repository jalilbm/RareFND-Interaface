
import CategoryGridCard from '../../components/CategoryGridCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Category() {
  console.log("mmmmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmn")
  const [categoryData, setCategoryData] = useState({})
  const [categoryProjects, setCategoryProjects] = useState({})
  const categoryName = window.location.pathname.split('/').at(-1).replace(new RegExp('-', 'g'), " ")
  useEffect(() => {
    axios.get(
      "http://localhost:8000/api/category/"
    )
    .then((response) => {
      const data = response.data.categories
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === categoryName) {
          setCategoryData({
            title: data[i].name,
            image: "http://127.0.0.1:8000" + data[i].image
          })
          break
        }
      };
    })
    .then( () => {
      axios.get(
        `http://localhost:8000/api/project/category/${categoryName}/`
      )
      .then((response) => {
        setCategoryProjects(response.data.projects)
      })
  })
  }, [window.location.pathname])
  return (
    <div>
      <CategoryGridCard
        image={categoryData.image}
        title={categoryData.title}
        categoryProjects={categoryProjects}
      />
    </div>
  );
  }