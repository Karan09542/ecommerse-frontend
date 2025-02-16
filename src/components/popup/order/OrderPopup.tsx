import React from "react";
import { cn, commonHeadersAndMethod } from "../../../utils/fn_utils";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useProductStore,
} from "../../../../store/authStore";
import CrossButton from "../../comp_util/button/CrossButton";
import { useForm } from "react-hook-form";
import InputField from "../../comp_util/input-field/InputField";
import ErrorMessage from "../../comp_util/message/ErrorMessage";
import Button from "../../comp_util/button/Button";
import { toast } from "react-toastify";

interface OrderPopupProps {
  className?: string;
  setCarts: (carts: any) => void;
  carts: any;
}
const OrderPopup: React.FC<OrderPopupProps> = ({
  className,
  carts,
  setCarts,
}) => {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const productId = useProductStore((state) => state.productId);
  const setProductId = useProductStore((state) => state.setProductId);
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    setProductId("");
    setOpenModel(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const onSubmit = (formData: object) => {
    setLoading(true);
    fetch(`${baseURL}/order-product/add`, {
      ...commonHeadersAndMethod({ accessToken }),
      body: JSON.stringify({
        productId,
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          const updatedCarts = carts?.filter(
            (cart: any) => cart._id !== productId
          );
          setCarts(updatedCarts);
          handleClose();
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
    <>
      <div className={cn("fixed-container", className)}>
        <div className="absolute-to-fixed max-w-[500px] w-full px-0 [&>div]:px-8">
          <div className="flex items-center justify-between mb-1">
            <CrossButton onClick={handleClose} className="-ml-2" />
            <h1 className="text-2xl">Order</h1>
          </div>
          <hr />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 px-8 [&>div]:mb-3"
          >
            {/* delivery address */}
            <div>
              <InputField
                label="Delivery Address"
                register={register("deliveryAddress", {
                  required: {
                    value: true,
                    message: "Delivery Address is required",
                  },
                })}
              />
              {errors?.deliveryAddress && (
                <ErrorMessage
                  message={`${errors.deliveryAddress.message || ""}`}
                />
              )}
            </div>
            {/* payment method */}
            <div className="mt-4">
              <select
                {...register("paymentMethod", {
                  required: {
                    value: true,
                    message: "Payment Method is required",
                  },
                })}
                className="w-full border-b border-gray-300 py-2 focus:outline-[var(--site-color)]"
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="COD">Cash on Delivery</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              {errors?.paymentMethod && (
                <ErrorMessage
                  message={String(errors?.paymentMethod.message || "")}
                />
              )}
            </div>

            {/* order button */}
            <Button
              name="Order"
              type="submit"
              className="w-full mt-5"
              loading={loading}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderPopup;
