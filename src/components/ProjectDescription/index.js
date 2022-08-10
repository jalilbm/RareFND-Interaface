import 'bootstrap/dist/css/bootstrap.css';


export default function ProjectDescription(props) {

  return (
    <div className="bg-white p-5">
      <h1 className="display-4 fw-bold text-center mb-5">Description</h1>
      <div dangerouslySetInnerHTML={{ __html: props.description }} style={{marginLeft: "80px"}}></div>
    </div>
  )
}
