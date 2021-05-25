import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";


function App() {
  const [images,setImages]=useState([])
  const[isLoading,setLoading]=useState(true)
  const[term,setTerm]=useState('')
  useEffect(()=>{
    setLoading(true)
    fetch(`https://pixabay.com/api/?key=21568865-bcfa69eefbf26879c6939fcbf&q=${term}&image_type=photo&pretty=true`)
    .then(res=>res.json())
    .then(data=>{
      setImages(data.hits)
      setLoading(false)
    })
    .catch(err=>console.log(err))
 
  },[term])
 const handleSubmit=(text)=>{
   
   setTerm(text)
 }
  return (
  
    <div className="container mx-auto">
      <ImageSearch handleSubmit={handleSubmit} />
      {!isLoading&&images.length===0&&  <h1 className="text-5xl text-center mx-auto mt-32">No images found</h1>  }
     {isLoading? 
      <h1 className="text-6xl text-center mx-auto mt-32">Loading.....</h1>
     :  <div className="grid grid-cols-3 gap-4">
          {
            images.map(image=>(
              <ImageCard  key={image.id} {...image} />
            ))
          }
      </div>}
    </div>
     
  );
}

export default App;
