import React from "react";
import Button from "../../comp_util/button/Button";
import CrossButton from "../../comp_util/button/CrossButton";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useProductStore,
} from "../../../../store/authStore";
import { handleDeleteProduct } from "../../../utils/fetch_handler";

const ConfirmProductDeletePopup = () => {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  //   product id
  const productId = useProductStore((state) => state.productId);
  const setProductId = useProductStore((state) => state.setProductId);
  //   product data
  const productData = useProductStore((state) => state.productData);
  const setProductData = useProductStore((state) => state.setProductData);
  // base url and access token
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  //   handle close
  const handleClose = () => {
    setOpenModel(null);
    setProductId("");
  };
  return (
    <div className="fixed-container z-20">
      <div className="absolute-to-fixed">
        <CrossButton onClick={handleClose} />
        <h1 className="text-2xl">
          Are you sure you want to delete this product from your store?
        </h1>
        <div className="flex gap-x-3">
          <Button
            name="Yes"
            onClick={async () => {
              const isOk = await handleDeleteProduct(
                productId,
                baseURL,
                accessToken,
                productData,
                setProductData
              );
              if (isOk) handleClose();
            }}
          />
          <Button name="No" onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmProductDeletePopup;
