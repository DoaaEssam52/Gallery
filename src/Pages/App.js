import React, { useState, useEffect } from "react";

/************
 STYLES FILES
*************/
import "../Styles/App.css";
import "../Styles/Loader.css";

/**********
 COMPONENTS 
***********/
import Loader from "../Components/Loader";

function App() {
  const [imagesData, setImagesData] = useState([]);
  const [isLoaded, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      fetch(
        "https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy"
      )
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setLoading(true);
          setImagesData(data);
        })
        .catch((error) => console.log(error));
    }, [3000]);
  }, []);
  return (
    <div className="app">
      {isLoaded ? (
        <>
          <h1 className="app__main-title"><i>Gallery</i></h1>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
