import React, { useEffect } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsLoggedInStore,
  useOpenModelStore,
} from "../../../../store/authStore";
import { commonHeadersAndMethod } from "../../../utils/fn_utils";
import Loading from "../../comp_util/Loader/Loading";
import CartDataTemplate from "./util/CartDataTemplate";
import OrderPopup from "../../popup/order/OrderPopup";
import { ToastContainer } from "react-toastify";
import MissingCart from "./util/MissingCart";

const Cart: React.FC = () => {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const [carts, setCarts] = React.useState([]);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const [loading, setLoading] = React.useState(false);

  const isLoggedIn = useIsLoggedInStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!accessToken || !isLoggedIn) return;
    setLoading(true);
    fetch(`${baseURL}/cart-product`, {
      ...commonHeadersAndMethod({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCarts(data?.carts);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [accessToken, isLoggedIn]);

  const titleList = ["Product", "Price", "Quantity", "Total"];
  const openModel = useOpenModelStore((state) => state.openModel);

  if (loading || isLoggedIn === null) return <Loading />;
  if (!isLoggedIn || carts?.length === 0)
    return <MissingCart isLoggedIn={isLoggedIn} />;
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="light"
      />
      {openModel === "order" && (
        <OrderPopup setCarts={setCarts} carts={carts} />
      )}
      <div className="">
        <div>
          <h1 className="text-2xl font-semibold px-4 py-2">Cart</h1>
        </div>
        <hr />
        <div className="p-4">
          <table className="order-table w-[550px] max-[550px]:w-full mx-auto">
            <tr className="table-product-header">
              {titleList.map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
            {carts?.map((cart) => (
              <CartDataTemplate
                key={cart?._id}
                {...cart}
                setCarts={setCarts}
                carts={carts}
                baseURL={baseURL}
                accessToken={accessToken}
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
