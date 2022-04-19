import React, { useState, useEffect } from "react";

/************
 STYLES FILES
*************/
import "../Styles/App.css";
import "../Styles/Loader.css";
import "../Styles/SampleCard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
/**********
 COMPONENTS 
***********/
import Loader from "../Components/Loader";
import SampleCard from "./../Components/SampleCard";

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
          <h1 className="app__main-title">
            <i>Gallery</i>
          </h1>
          <div className="app__main-section">
            {imagesData.map((item, index) => {
              return (
                <div key={item.uuid} className="app__main-section__img">
                  <SampleCard
                    data={{ ...item, index }}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
