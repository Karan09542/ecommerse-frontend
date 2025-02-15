import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import LoginModel from "./LoginModel";
import { useOpenModelStore } from "../../../../store/authStore";
import Loading from "../../comp_util/Loader/Loading";

const LazyOtpPopup = React.lazy(() => import("../../popup/auth/OtpPopup"));
const AuthenticateModel: React.FC = () => {
  const openModel = useOpenModelStore((state) => state.openModel);
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

      {openModel === "otp" && (
        <Suspense fallback={<Loading />}>
          <LazyOtpPopup />
        </Suspense>
      )}
      <LoginModel />
    </>
  );
};

export default AuthenticateModel;
