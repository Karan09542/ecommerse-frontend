import React from "react";
import { ProductProps } from "../../../utils/types";
import Slider from "react-slick";
import SamplePrevArrow from "../slick/SamplePrevArrow";
import SampleNextArrow from "../slick/SampleNextArrow";
import { decorateDate } from "../../../utils/fn_utils";

// `--> edit delete icon
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "../button/Button";
import {
  useOpenModelStore,
  useProductStore,
} from "../../../../store/authStore";
const Product: React.FC<ProductProps> = ({
  _id,
  name,
  description,
  price,
  rating,
  images,
  numReviews,
  category,
  updatedAt,
  createdAt,
  stock,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow isHidable={true} currentSlide={currentSlide} />,
    nextArrow: (
      <SampleNextArrow
        isHidable={true}
        currentSlide={currentSlide}
        totalSlide={images?.length}
        slideToShow={1}
      />
    ),
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };
  const setInitializeProduct = useProductStore(
    (state) => state.setInitializeProduct
  );
  const setIsToUpdate = useProductStore((state) => state.setIsToUpdate);

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setProductId = useProductStore((state) => state.setProductId);
  return (
    <div className="">
      <div className="max-w-[400px] border border-[var(--hr-color)] mb-3 p-4 rounded relative">
        <h1 className="text-lg">{name}</h1>
        {/* edit delete button */}
        <div className="absolute right-1 -top-2 flex flex-col z-10">
          {/* edit */}
          <Button
            name={<FaPencil size={14} />}
            className="rounded-full p-2.5"
            onClick={() => {
              setInitializeProduct({
                _id,
                name,
                description,
                price,
                rating,
                images,
                numReviews,
                category,
                updatedAt,
                createdAt,
                stock,
              });
              setIsToUpdate(true);
            }}
          />
          {/* delete */}
          <Button
            name={<RiDeleteBin6Fill size={14} />}
            className="rounded-full p-2.5"
            onClick={() => {
              setOpenModel("confirm product delete");
              setProductId(_id || "");
            }}
          />
        </div>

        {/* image slider */}
        <Slider {...settings} className="px-5 max-w-[400px] rounded">
          {images?.map((item, index) => (
            <div
              className="px-10 py-5 flex h-[200px] object-contain w-[300px]"
              key={index}
            >
              <img
                src={item}
                className="h-full m-auto"
                alt={`product-${index + 1}`}
              />
            </div>
          ))}
        </Slider>
        {/* product details */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-md font-light [&>p>span:first-child]:font-semibold [&>p>span:nth-child(2)]:text-[var(--site-color)]">
          <p>
            <span>Price</span> : <span>{price}</span>
          </p>
          <p>
            <span>Stock</span> : <span>{stock}</span>
          </p>
          <p>
            <span>Category</span> : <span>{category}</span>
          </p>
          <p>
            <span>Rating</span> : <span>{rating}</span>
          </p>
          <p>
            <span>Num of Reviews</span> : <span>{numReviews}</span>
          </p>
          <p>
            <span>Created At</span> :{" "}
            <span>{decorateDate(createdAt || "")}</span>
          </p>
          <p>
            <span>Updated At</span> :{" "}
            <span>{decorateDate(updatedAt || "")}</span>
          </p>
          <p>
            <span>Description</span> : <span>{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
