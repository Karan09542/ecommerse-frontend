import React from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
} from "../../../../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import CrossButton from "../../comp_util/button/CrossButton";
import outSideClose from "../../../hooks/outSideClose";
import Button from "../../comp_util/button/Button";

const SellerStarterPopup: React.FC = () => {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const [loading, setLoading] = React.useState(false);

  // fetch continue to become a seller
  const handleContinueToBecomeASeller = () => {
    setLoading(true);
    fetch(`${baseURL}/user/update-role/seller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setOpenModel(null);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  const ref = React.useRef(null);
  outSideClose({ setState: setOpenModel, ref, arg: null });
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
      <div className="fixed-container z-20">
        <div ref={ref} className="absolute-to-fixed">
          <CrossButton className="pb-2" onClick={() => setOpenModel(null)} />
          <h1 className="text-center text-[var(--site-color)] text-xl">
            Make a seller account click to continue
          </h1>
          <Button
            name="Continue"
            onClick={handleContinueToBecomeASeller}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default SellerStarterPopup;
