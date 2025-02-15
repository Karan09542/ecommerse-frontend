import React from "react";

interface OrderRowProps {
  _id: string;
  quantity: string;
  createdAt: string;
  paymentStatus: string;
  deliveryStatus: string;
  product: any;
}
const OrderRow: React.FC<OrderRowProps> = ({
  _id,
  quantity,
  createdAt,
  paymentStatus,
  deliveryStatus,
  product,
}) => {
  const { price } = product;
  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "text-yellow-600";
      case "delivered":
        return "text-green-600";
      case "canceled":
        return "text-red-600";
      case "shipped":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };
  const formatOrderId = (orderId: string) => {
    const prefix =
      orderId.slice(0, 7) +
      "-" +
      orderId.slice(7, 14) +
      "-" +
      orderId.slice(14, 21);
    return prefix;
  };
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{formatOrderId(_id)}</td>
      <td className="py-2 px-4 border">{product.name}</td>
      <td className="py-2 px-4 border">{createdAt.split("T")[0]}</td>
      <td className="py-2 px-4 border">
        ₹{parseInt(quantity) * parseInt(price)}
      </td>
      <td className="py-2 px-4 border text-blue-600">{paymentStatus}</td>
      <td
        className={`py-2 px-4 border ${getDeliveryStatusColor(
          deliveryStatus
        )} capitalize`}
      >
        {deliveryStatus}
      </td>
      <td className="py-2 px-4 border">Kahani Express</td>
      <td className="py-2 px-4 border">
        <button className="px-3 active:bg-blue-600/80 cursor-pointer  py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          View
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
