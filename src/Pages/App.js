import React, { useState, useEffect } from "react";

/******************
IMPORT STYLES FILES
******************/
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/App.css";
import "../Styles/Loader.css";
import "../Styles/SampleCard.css";
import "../Styles/MediaQuery.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

/****************
IMPORT COMPONENTS 
****************/
import Loader from "../Components/Loader";
import SampleCard from "./../Components/SampleCard";

/************************
IMPORT CAROUSEL FUNCTIONS 
*************************/
import {previousImg} from './../Functions/Carousel';
import {nextImg} from './../Functions/Carousel';

function App() {
  const [imagesData, setImagesData] = useState([]);  //returned images from backend
  const [isLoaded, setLoading] = useState(false); //loading first
  const [currentIndex, setCurrentIndex] = useState(null); //current images's index

  /**********************
   USER ZOOMS IN AN IMAGE
  **********************/
  const cardClicked = (data) => {
    setCurrentIndex(data);
  };

  /*****************************
   HANDLE CLICKING PREVIOUS ICON
  *****************************/
  const previousImage = () => {
    setCurrentIndex(previousImg(currentIndex,imagesData.length));
  };

  /***************************
    HANDLE CLICKING NEXT ICON
  ****************************/
  const nextImage = () => {
    setCurrentIndex(nextImg(currentIndex,imagesData.length));
  };
  
  /*************************
  HANDLE CLICKING CLOSE ICON
  **************************/
  const closeCarousel = () => {
    setCurrentIndex(null);
  };

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
          <div className="row app__main-section">
            {imagesData.map((item, index) => {
              return (
                <div
                  key={item.uuid}
                  className="app__main-section__img col-12 col-sm-8 col-md-6 col-lg-3 col-xl-4"
                >
                  <SampleCard
                    cardClicked={(data) => cardClicked(data)}
                    data={{ ...item, index }}
                  />
                </div>
              );
            })}
          </div>
          {currentIndex !== null && (
            <>
              <div className="app-carousel">
                <i
                  className="fa-solid fa-angles-left"
                  onClick={() => previousImage()}
                ></i>
                <div className={`app-carousel__img-container`}>
                  <div
                    className="app-carousel__img"
                    style={{
                      backgroundImage: `url("${imagesData[currentIndex].url}")`,
                    }}
                  ></div>
                  <p>{imagesData[currentIndex].name}</p>
                </div>
                <i
                  className="fa-solid fa-angles-right"
                  onClick={() => nextImage()}
                ></i>
              </div>
              <div className="app-carousel-close">
                <i
                  className="fa-solid fa-rectangle-xmark"
                  onClick={() => closeCarousel()}
                ></i>
              </div>
              <div className="app-carousel__counter">
                image {currentIndex + 1} / {imagesData.length}
              </div>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
