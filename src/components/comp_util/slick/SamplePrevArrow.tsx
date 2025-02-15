import { IoIosArrowBack } from "react-icons/io";
import { ArrowProps } from "../../../utils/types";
import React from "react";

const SamplePrevArrow: React.FC<
  ArrowProps & {
    isHidable?: boolean;
    currentSlide?: number;
  }
> = ({ style, onClick, currentSlide, isHidable }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`bg-white absolute left-0 top-1/2 -translate-y-1/2 z-10 h-[88px] w-[40px] slick-shadow rounded-r-sm duration-200 transition-all flex ${
        isHidable ? (currentSlide === 0 ? "hidden" : "block") : ""
      }`}
    >
      <IoIosArrowBack
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

export default SamplePrevArrow;
