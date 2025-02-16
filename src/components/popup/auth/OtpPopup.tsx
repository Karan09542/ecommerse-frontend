import React from "react";
import { useOpenModelStore, useOtpStore } from "../../../../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import CrossButton from "../../comp_util/button/CrossButton";

// `--> icon
import { MdCopyAll } from "react-icons/md";

interface OtpPopupProps {
  isCopyIcon?: boolean;
}
const OtpPopup: React.FC<OtpPopupProps> = ({ isCopyIcon = true }) => {
  const otp = useOtpStore((state) => state.otp);
  const setOtp = useOtpStore((state) => state.setOtp);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);

  const handleClose = () => {
    setOtp("");
    setOpenModel(null);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="fixed bg-black/75 w-full h-screen z-10">
        <div className="absolute bg-white left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full p-5 rounded">
          <CrossButton onClick={handleClose} className="-ml-2" />
          <h1 className="text-lg font-semibold text-[var(--site-color)]">
            An Email has been sent to your email address Please enter the OTP on
            the email
          </h1>
          {/* ram */}

          <p
            onClick={() => {
              navigator.clipboard.writeText(`${otp}`);
              toast.success("Copied to clipboard");
            }}
            className="text-2xl font-bold mt-2 bg-blue-500 text-white py-2 px-4 mx-auto rounded w-fit cursor-pointer active:bg-blue-600 flex items-center gap-x-1"
          >
            {otp} {isCopyIcon && <MdCopyAll size={16} />}
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpPopup;
