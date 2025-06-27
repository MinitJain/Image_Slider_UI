import { useEffect, useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const ImageSlider = ({ url, limit, page = 1 }) => {
  // url for images and limit
  const [images, setImages] = useState([]); //empty array of images
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // coding guide in video mentioned - whenver you are handling an API call, always use loading state

  const HandlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const HandleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      // set loading as true when we are trying to fetch the images
      const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      // fetch the url from API
      const data = await res.json();

      if (data) {
        setImages(data); // if data has been fetched then set Images = data
        setLoading(false); // if data has been found then set loading = false
      }
    } catch (e) {
      setErrorMessage(e.message); // if an error has been caught then set error message = error message from API
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url); // if there is some url(data), invoke the fetImages function to that url
  }, [url, page, limit]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        HandlePrev();
      } else if (e.key === "ArrowRight") {
        HandleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, images]);

  if (loading) {
    return <div>Loading data, Please Wait....</div>;
  } else if (errorMessage !== null) {
    return <div> Error occured {errorMessage} </div>;
  }

  return (
    <div className="container">
      <BsArrowLeftSquareFill
        onClick={HandlePrev}
        className="arrow arrow-left"
      />

      {images && images.length > 0
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.author}
              src={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}

      <BsArrowRightSquareFill
        onClick={HandleNext}
        className="arrow arrow-right"
      />

      <span className="circle-indicators">
        {images && images.length > 0
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              >
                {" "}
              </button>
            ))
          : null}
      </span>
      <h2 className="imageNumber">{`Image Number: ${currentSlide}`}</h2>
    </div>
  );
};

export default ImageSlider;
