
import CategoryGridCard from '../../components/CategoryGridCard';

export default function Category(props){
    return (
      <div className="App">
        <CategoryGridCard image={props.image} title={props.title}/>
      </div>
    );
  }