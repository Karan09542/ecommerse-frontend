import React, { useEffect } from "react";
import OrderRow from "./util/OrderRow";
import {
  useAccessTokenStore,
  useBaseURLStore,
} from "../../../../store/authStore";
import { commonHeadersAndMethod } from "../../../utils/fn_utils";
import Loading from "../../comp_util/Loader/Loading";

const OrderHistory: React.FC = () => {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    fetch(`${baseURL}/order-product`, {
      ...commonHeadersAndMethod({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setOrders(data.orders);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken]);

  const titleList = [
    "Order ID",
    "Product",
    "Placed",
    "Total Amount",
    "Payment",
    "Status",
    "Service",
    "Actions",
  ];
  if (loading) return <Loading />;
  if (orders?.length === 0)
    return <h1 className="px-4 py-5 text-2xl text-center">No Order Found</h1>;
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold px-4 py-2">Order History</h1>
      </div>
      <hr />
      <div className="p-4">
        <table className="w-[900px] max-[900px]:w-full max-[900px]:px-4 mx-auto bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {titleList.map((title) => (
                <th className="py-3 px-4 border">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <OrderRow key={order._id} {...order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
