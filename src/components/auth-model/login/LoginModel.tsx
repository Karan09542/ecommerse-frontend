import React from "react";
import LoginImage from "../../../assets/img/home/login_img.png";
import InputField from "../../comp_util/input-field/InputField";
import Text from "../../comp_util/Text";
import LeftRightButton from "../../comp_util/button/LeftRightButton";
import {
  getCountryCallingCode,
  getRegion,
  isValidMobileOrLandlineNumber,
  maxNumberLengthFromRegion,
} from "../../../utils/fn_utils";
import { Link, useSearchParams } from "react-router";
import ErrorMessage from "../../comp_util/message/ErrorMessage";
import emailValidator from "email-validator";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useOtpStore,
} from "../../../../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
const LoginModel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // input props
  interface inputProps {
    value: string;
    isError: boolean;
    message: string;
  }
  // input state
  const [input, setInput] = React.useState<inputProps>({
    value: "",
    isError: false,
    message: "",
  });

  const [password, setPassword] = React.useState<inputProps>({
    value: "",
    isError: false,
    message: "",
  });

  // country calling code state
  const [countryCallingCode, setCountryCallingCode] = React.useState<
    number | null
  >(null);
  const [countryCode, setCountryCode] = React.useState("");
  // get country calling code number
  React.useEffect(() => {
    (async () => {
      setCountryCallingCode(await getCountryCallingCode());
      setCountryCode(await getRegion());
    })();
  }, []);
  // delete search params
  const deleteSearchParams = (param: string) => {
    searchParams.delete(param);
    setSearchParams(searchParams);
  };

  // get button name, title and message
  const getButtonName = () => {
    if (searchParams.has("signup")) return "Create Account";
    if (searchParams.has("forgot")) return "Forgot Password";
    return "Login";
  };
  const getTitleMessage = () => {
    if (searchParams.has("signup"))
      return {
        title: "Looks like you're new here!",
        message: "Sign up with your mobile number to get started",
      };
    if (searchParams.has("forgot"))
      return {
        title: "Forgot Password?",
        message: "Enter your email address to reset your password",
      };
    return {
      title: "Login",
      message: "Get access to your Orders, Wishlist and Recommendations",
    };
  };

  const isFirstRender = React.useRef<boolean>(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isFirstRender.current) {
      if (/^\d+$/.test(value)) {
        const numberLength = maxNumberLengthFromRegion(countryCode);
        if (numberLength && e.target.value.length > numberLength) return;
      }
      return setInput((prev) => ({ ...prev, value }));
    }
    if (/^\d+$/.test(value)) {
      const numberLength = maxNumberLengthFromRegion(countryCode);
      if (numberLength && e.target.value.length > numberLength) return;
      setInput((prev) => ({ ...prev, value }));
      // validate mobile number
      if (
        countryCode === "IN" &&
        ![6, 7, 8, 9].includes(parseInt(e.target?.value?.[0]))
      ) {
        return setInput((prev) => ({
          ...prev,
          isError: true,
          message: "Please enter valid mobile number",
          value,
        }));
      } else {
        return setInput((prev) => ({
          ...prev,
          isError: false,
          message: "",
          value,
        }));
      }
    }
    // validate email
    if (value && !emailValidator.validate(value)) {
      setInput((prev) => ({
        ...prev,
        isError: true,
        message: "Please enter valid email",
        value,
      }));
    } else {
      setInput((prev) => ({ ...prev, isError: false, message: "", value }));
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value.length < 8 && value.length > 0) {
      setPassword({
        value,
        isError: true,
        message: "Password should be minimum 8 characters",
      });
    } else {
      setPassword({ value, isError: false, message: "" });
    }
  };

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const [loading, setLoading] = React.useState<boolean>(false);
  const setOtp = useOtpStore((state) => state.setOtp);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const clearInput = () => {
    setInput({ value: "", isError: false, message: "" });
    setPassword({ value: "", isError: false, message: "" });
  };
  const handleSubmit = () => {
    // first render set to false
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    if (!password.value && !searchParams.has("forgot")) {
      return setPassword((prev) => ({
        ...prev,
        isError: true,
        message: "Please enter password",
      }));
    }
    // handle input
    let value = input.value?.trim();
    if (!/\S/g.test(value)) {
      return setInput((prev) => ({
        ...prev,
        isError: true,
        message: "Please enter valid Email ID/Mobile number",
        value,
      }));
    }

    let data: { email?: string; mobile?: string } = {};
    if (value && value.includes("@")) {
      if (!emailValidator.validate(value)) return;
      data = { email: value };
    }
    if (
      value &&
      /^\d+$/.test(value) &&
      isValidMobileOrLandlineNumber(value, countryCode) &&
      !input.isError
    ) {
      data = { mobile: `${countryCallingCode}${value}` };
    }

    if (Object.keys(data).length === 0) return;
    if (data.mobile) {
      return toast.info("Please use only email");
    }

    // signup
    if (searchParams.has("signup")) {
      setLoading(true);

      fetch(`${baseURL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, password: password.value }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            deleteSearchParams("signup");
            clearInput();
            toast.success(data.message);
            setOtp(data.otp);
            setOpenModel("otp");
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          return;
        });
    }
    // forgot
    else if (searchParams.has("forgot")) {
      setLoading(true);
      fetch(`${baseURL}/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            clearInput();
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          return;
        });
    }
    // login
    else {
      setLoading(true);
      fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...data, password: password.value }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            clearInput();
            toast.success(data.message);
            setAccessToken(data.accessToken);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          return;
        });
    }
  };

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
      <div className="w-fit mx-auto mt-5">
        {/* h-[528px] */}
        <div className="grid grid-cols-[minmax(100px,336px)_minmax(100px,504px)] h-[540px] *:shadow-[0_0_3px_rgba(0,0,0,0.2),0_3px_7px_rgba(0,0,0,0.05)]">
          {/* left */}
          <div className="bg-[var(--site-color)]">
            {/* left top */}
            <div className=" text-white [&>h2]:text-[1.75rem] [&>h2]:font-semibold [&>p]:text-[1.125rem] [&>p]:text-[#DBDBDB] [&>h2]:mb-4 px-[2.0625rem] py-10">
              <h2>{getTitleMessage()?.title}</h2>
              <p>{getTitleMessage()?.message}</p>
            </div>
            {/* left bottom */}
            <div
              className={`flex w-full h-full box-border ${
                searchParams.get("signup") ? "pb-40" : "pb-20"
              }`}
            >
              <img src={LoginImage} alt="login-image" className="m-auto" />
            </div>
          </div>
          {/* right */}
          <div className="p-[56px_35px_16px] relative">
            {/* right top input */}
            <div>
              {/* email or mobile */}
              <InputField
                label={"Enter Email/Mobile number"}
                onChange={handleInputChange}
                value={input?.value}
                inputStyle={{
                  textIndent:
                    countryCallingCode && /^\d+$/g.test(input?.value)
                      ? countryCallingCode.toString().length + 1 + "em"
                      : "",
                  borderBottomWidth: input?.isError ? "2px" : "1px",
                }}
                borderColor={input?.isError ? "var(--text-error)" : ""}
                before={
                  <>
                    {/^\d+$/g.test(input?.value) && (
                      <span className="absolute top-1/2 -translate-y-1/2">
                        <span className="border-r border-[#c2c2c2]">{`+${countryCallingCode} `}</span>
                        &nbsp;
                      </span>
                    )}
                  </>
                }
              />
              {input?.isError && <ErrorMessage message={input?.message} />}
              {/* password */}
              {!searchParams.get("forgot") && (
                <InputField
                  label={"Password"}
                  type="password"
                  onChange={handlePasswordChange}
                  value={password?.value}
                  className="mt-7"
                  inputStyle={{
                    borderBottomWidth: password?.isError ? "2px" : "1px",
                  }}
                  borderColor={password?.isError ? "var(--text-error)" : ""}
                  after={
                    <span
                      onClick={() => {
                        setSearchParams({ forgot: "true" });
                        clearInput();
                      }}
                      role="button"
                      className="text-[var(--site-color)] absolute top-1/2 -translate-y-1/2 right-0 font-semibold cursor-pointer"
                    >
                      Forgot?
                    </span>
                  }
                />
              )}
              {password?.isError && (
                <ErrorMessage message={password?.message} />
              )}

              {/* terms & conditions  */}
              <Text
                text={
                  <>
                    By continuing, you agree to Flipkart's{" "}
                    <Link to="/pages/terms">Terms of Use</Link> and{" "}
                    <Link to="/pages/privacypolicy">Privacy Policy</Link> .
                  </>
                }
                className="[&>a]:text-[var(--site-color)] mt-8"
              />
              {/* login button  */}
              <LeftRightButton
                name={getButtonName()}
                className="bg-[var(--text-orange)] text-center items-center justify-center gap-3 py-3 text-[15px] mt-4"
                isRight={false}
                onClick={handleSubmit}
                RightIcon={loading ? CgSpinner : null}
                rightClassName="animate-spin text-white"
                rightIconProps={{ size: 18 }}
              />
              {/* existing user then login */}
              {searchParams.get("signup") && (
                <LeftRightButton
                  name="Existing User? Log in"
                  className="shadow-[0_2px_4px_rgba(0,0,0,0.2)] justify-center py-3 mt-4 rounded"
                  nameClassName="text-[var(--site-color)] font-semibold"
                  onClick={() => {
                    deleteSearchParams("signup");
                    clearInput();
                  }}
                />
              )}
            </div>
            {/* right bottom */}
            {!searchParams.get("signup") && (
              <div className="absolute bottom-7 left-0 w-full">
                <p
                  onClick={() => {
                    setSearchParams({ signup: "true" });
                    clearInput();
                  }}
                  role="button"
                  className="text-[var(--site-color)] font-semibold w-full text-center cursor-pointer"
                >
                  New to Flipkart? <span>Create an account</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModel;
