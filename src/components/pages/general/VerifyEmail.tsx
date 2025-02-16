import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import {
  useAccessTokenStore,
  useBaseURLStore,
} from "../../../../store/authStore";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = React.useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  async function handleOTP(otp: string | number) {
    setLoading(true);
    if (otp?.toString()?.length === 6) {
      const token = searchParams.get("token");
      await fetch(`${baseURL}/user/signup/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otp, verificationToken: token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setAccessToken(data.accessToken);
            navigate("/", {
              state: { toastMessage: data.message },
            });
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    } else toast.error("Enter a valid OTP");
  }

  useEffect(() => {
    if (otp?.toString()?.length === 6) handleOTP(otp);
  }, [otp]);
  return (
    <div className="fixed w-full h-screen z-10">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[var(--site-gray)] p-10 rounded">
        <div className="[&>div>input:nth-child(even)]:mt-2">
          <h1 className="text-2xl font-semibold text-[var(--site-color)] mb-5">
            Verify Email
          </h1>
          <p className="mb-5 text-[var(--text-gray)]">
            Enter the OTP for verification
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>&nbsp;&nbsp;</span>}
            renderInput={(props) => {
              props.style = {
                width: "40px",
                height: "40px",
                textAlign: "center",
                borderRadius: "3px",
              };
              return (
                <input
                  // style={{
                  //   width: "40px",
                  //   height: "40px",
                  //   padding: "10px",
                  //   margin: "5px",
                  // }}
                  {...props}
                  className="border border-[var(--site-color)] font-medium text-[var(--text-21)] outline-none"
                />
              );
            }}
          />
          <div className="flex items-center justify-center mt-4">
            {loading && (
              <CgSpinner
                size={21}
                color="var(--site-color)"
                className="animate-spin"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
