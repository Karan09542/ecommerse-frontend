import { IoIosArrowForward } from "react-icons/io";
import { ArrowProps } from "../../../utils/types";
import React from "react";

const SampleNextArrow: React.FC<
  ArrowProps & {
    isHidable?: boolean;
    currentSlide?: number;
    totalSlide?: number;
    slideToShow?: number;
  }
> = ({
  style,
  onClick,
  currentSlide,
  isHidable,
  totalSlide = 0,
  slideToShow = 0,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`bg-white absolute right-0 top-1/2 -translate-y-1/2 z-10 h-[88px] w-[40px] slick-shadow rounded-l-sm duration-200 transition-all flex ${
        isHidable
          ? currentSlide === totalSlide - slideToShow
            ? "hidden"
            : "block"
          : ""
      }`}
    >
      <IoIosArrowForward
        className="p-2 m-auto"
        style={{
          ...style,
          right: "100px",
          zIndex: "15",
          height: "32px",
          width: "32px",
          opacity: "1",
          color: "var(--text-gray)",
        }}
      />
    </div>
  );
};

export default SampleNextArrow;
