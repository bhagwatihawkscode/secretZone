import React, { useState } from "react";
import "./Profile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const images = [
  {
    src: "https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg",
    alt: "Image 1",
  },
  { src: "https://i.redd.it/tc0aqpv92pn21.jpg", alt: "Image 2" },
  {
    src: "https://wharferj.files.wordpress.com/2015/11/bio_north.jpg",
    alt: "Image 3",
  },
  { src: "https://images7.alphacoders.com/878/878663.jpg", alt: "Image 2" },

  {
    src: "https://da.se/app/uploads/2015/09/simon-december1994.jpg",
    alt: "Image 2",
  },
];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const previousImage = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const nextImage = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="image-carousel">
      <div className="image-containers">
        <img src={images[index].src} alt={images[index].alt} />
      </div>

      <div className="controls">
        <button
          onClick={previousImage}
          style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "none" }}
        >
          <ArrowBackIcon />
        </button>
        <button
          onClick={nextImage}
          style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "none" }}
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
