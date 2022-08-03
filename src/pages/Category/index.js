
import CategoryGridCard from '../../components/CategoryGridCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Category(props) {  
  const [categoryData, setCategoryData] = useState({})
  const [categoryProjects, setCategoryProjects] = useState({})
  useEffect(() => {
    axios.get(
      "http://localhost:8000/api/category/"
    )
    .then((response) => {
      const data = response.data.categories
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === props.category_name) {
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
        `http://localhost:8000/api/project/category/${props.category_name}/`
      )
      .then((response) => {
        setCategoryProjects(response.data.projects)
      })
  })
  }, [])
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