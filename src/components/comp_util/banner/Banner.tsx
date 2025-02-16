import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cn, handlePriceLabel } from "../../../utils/fn_utils";
import SamplePrevArrow from "../slick/SamplePrevArrow";
import SampleNextArrow from "../slick/SampleNextArrow";
import { ImageObj } from "../../../utils/types";

interface BannerProps {
  className?: string;
  sliderClassName?: string;
  sliderItemClassName?: string;
  imageList?: ImageObj[];

  isProducts?: boolean;
  title?: string;
  autoplay?: boolean;
  isDots?: boolean;
  infiniteScroll?: boolean;
  noOfImageShow?: number;
  width?: number | string;
  height?: number | string;
  imageWidth?: number | string;
  imageHeight?: number | string;
}

const Banner: React.FC<BannerProps> = ({
  className,
  sliderClassName,
  sliderItemClassName,
  imageList = [],
  isProducts = false,
  title,
  autoplay = false,
  isDots = false,
  noOfImageShow = 1,
  width,
  height,
  // imageWidth,
  imageHeight,
  infiniteScroll = false,
}) => {
  const calculateSlidesToShow = () => {
    const width = window.innerWidth;
    const maxSlides = Math.floor(width / 264); // Calculate how many 101px slides can fit
    return Math.max(1, maxSlides); // Ensure at least one slide is shown
  };

  const [slidesToShow, setSlidesToShow] = React.useState(calculateSlidesToShow);
  const [currentSlide, setCurrentSlide] = React.useState(0); // Track the current slide

  React.useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(calculateSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const settings = {
    dots: isDots,
    infinite: infiniteScroll,
    speed: 500,
    slidesToShow: !isProducts ? noOfImageShow : slidesToShow,
    slidesToScroll: 1,
    prevArrow: (
      <SamplePrevArrow isHidable={isProducts} currentSlide={currentSlide} />
    ),
    nextArrow: (
      <SampleNextArrow
        isHidable={isProducts}
        currentSlide={currentSlide}
        totalSlide={imageList.length}
        slideToShow={slidesToShow}
      />
    ),
    autoplay: autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    afterChange: (index: number) => setActiveIndex(index),
    customPaging: function (i: number) {
      return (
        <div
          className={`rounded-full mt-1 bg-gray-300 h-1  ${
            activeIndex === i ? "w-[48px]" : ""
          }`}
        >
          <div
            className={`rounded-full h-1 ${
              activeIndex === i ? "slick-active-dot" : ""
            }`}
          ></div>
        </div>
      );
    },
    beforeChange: (_: number, newIndex: number) => {
      if (isProducts) setCurrentSlide(newIndex);
    },
  };

  return (
    <div className={cn("", className)}>
      {title && <h1 className={`text-[22px] font-semibold mb-4`}>{title}</h1>}
      <Slider {...settings} className={`${sliderClassName}`}>
        {imageList?.map((item, index) => (
          <div
            onClick={item?.onClick}
            key={`banner-${index}`}
            className={`cursor-pointer w-full ${sliderItemClassName}`}
            style={{
              width,
              height,
            }}
          >
            {!isProducts ? (
              <img
                src={item?.image}
                alt={`banner-${index}`}
                style={{
                  width: "100%",
                  height: imageHeight,
                }}
              />
            ) : (
              <div className="flex flex-col items-center px-4 py-4">
                <img
                  src={item?.image}
                  alt={`banner-${index}`}
                  className="hover:scale-110 transition-all"
                />
                {item?.name && (
                  <div
                    style={{ minWidth: 0, maxWidth: 150 }}
                    className="text-center mt-2 px-4 text-[#1F1F1F] text-sm"
                  >
                    <p className="text-dot">{item?.name}</p>
                    <p className="fonts-semibold">
                      {handlePriceLabel(item?.type, item?.price || "")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
