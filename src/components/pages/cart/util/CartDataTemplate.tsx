import React from "react";
import { ProductProps } from "../../../../utils/types";
import CrossButton from "../../../comp_util/button/CrossButton";
import { commonHeadersAndMethod } from "../../../../utils/fn_utils";
import { toast } from "react-toastify";
import Button from "../../../comp_util/button/Button";
import {
  useOpenModelStore,
  useProductStore,
} from "../../../../../store/authStore";

interface CartDataTemplateProps {
  _id: string;
  product: ProductProps;
  quantity: number | string;
  carts: any;
  setCarts: any;
  baseURL: string;
  accessToken: string | null;
}
const CartDataTemplate: React.FC<CartDataTemplateProps> = ({
  _id,
  product,
  quantity,
  carts,
  setCarts,
  baseURL,
  accessToken,
}) => {
  const price = parseFloat(product?.price as string);
  const [increaseQuantity, setIncreaseQuantity] = React.useReducer(
    (_prev: number, next: number) => {
      if (next < 1) return 1;
      return next;
    },
    parseInt(quantity as string)
  );

  const updateQuantity = (quantity: number) => {
    fetch(`${baseURL}/cart-product/update/${_id}`, {
      ...commonHeadersAndMethod({ accessToken }),
      method: "POST",
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "success") {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleIncreaseQuantity = () => {
    setIncreaseQuantity(increaseQuantity + 1);
    updateQuantity(increaseQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    setIncreaseQuantity(increaseQuantity - 1);
    updateQuantity(increaseQuantity - 1);
  };

  const handleDeleteCart = () => {
    fetch(`${baseURL}/cart-product/delete/${_id}`, {
      ...commonHeadersAndMethod({ accessToken }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const updatedCarts = carts.filter((cart: any) => cart._id !== _id);
          setCarts(updatedCarts);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setProductId = useProductStore((state) => state.setProductId);
  return (
    <tr>
      <td className="table-product-name">
        <div>
          <CrossButton onClick={handleDeleteCart} />
          <p>{product?.name}</p>
        </div>
      </td>
      <td className="table-product-price">&#8377;{price}</td>
      <td className="table-product-quantity">
        <div>
          <div onClick={handleDecreaseQuantity}>-</div>
          <p>{increaseQuantity}</p>
          <div onClick={handleIncreaseQuantity}>+</div>
        </div>
      </td>
      <td className="table-product-total">
        <div>
          <p className="">&#8377;{price * increaseQuantity}</p>
          <Button
            name="Order"
            className="ml-auto"
            onClick={() => {
              setOpenModel("order");
              setProductId(_id);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default CartDataTemplate;
