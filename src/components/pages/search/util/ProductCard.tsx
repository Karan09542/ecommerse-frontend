import React from "react";
import { ProductProps } from "../../../../utils/types";
import { cn } from "../../../../utils/fn_utils";
import { FaStar } from "react-icons/fa";
import {
  useAccessTokenStore,
  useBaseURLStore,
} from "../../../../../store/authStore";
import { toast } from "react-toastify";
import Button from "../../../comp_util/button/Button";

const ProductCard: React.FC<ProductProps & { className?: string }> = ({
  _id,
  name,
  description,
  price,
  // rating,
  images,
  // numReviews,
  // category,
  // updatedAt,
  // createdAt,
  stock,
  className,
}) => {
  const [loading, setLoading] = React.useState(false);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const handleAddToCart = (_id: string | undefined) => {
    setLoading(true);
    fetch(`${baseURL}/cart-product/add`, {
      // ...commonHeadersAndMethod({ accessToken }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        productId: _id,
        quantity: 1,
        paymentMethod: "COD",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      className={cn(
        "hover:shadow-lg overflow-hidden max-[820px]:max-w-full max-w-[350px] rounded-[5px] bg-white px-1",
        className
      )}
    >
      <div className="cursor-pointer group">
        <div className="h-[280px] flex items-center justify-center ">
          <img
            src={images?.[0]}
            alt="Product Image"
            className="product-image  max-w-[200px] w-full "
          />
        </div>
        <h3 className="product-name px-2 group-hover:text-[var(--site-color)] cursor-pointer ">
          {name}
        </h3>
      </div>
      <div className="product-info">
        <p className="product-description">{description}</p>
        <p className="product-price">{price}</p>
        <p className="product-rating">
          <span>
            4.5 <FaStar size={10} />
          </span>
          (120 reviews)
        </p>
        {/* <p className="product-category">Category: {category}</p> */}
        <p className="product-stock in-stock">In Stock ({stock})</p>
        {/* <button onClick={() => handleAddToCart(_id)} className="add-to-cart">
          Add to Cart
        </button> */}
        <Button
          name="Add to Cart"
          className="m-0 add-to-cart"
          onClick={() => handleAddToCart(_id)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProductCard;
