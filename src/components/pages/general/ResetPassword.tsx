import React from "react";
import InputField from "../../comp_util/input-field/InputField";
import { useNavigate, useSearchParams } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorMessage from "../../comp_util/message/ErrorMessage";
import { toast, ToastContainer } from "react-toastify";
import { useBaseURLStore } from "../../../../store/authStore";
import { CgSpinner } from "react-icons/cg";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const onSubmit: SubmitHandler<any> = (data) => {
    setLoading(true);
    fetch(`${baseURL}/user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data.password, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success(data.message);
          reset();
          navigate("/", {
            replace: true,
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
      <div className="fixed w-full h-screen z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[var(--site-gray)] p-10 rounded max-w-[400px] w-full">
          <h1 className="text-xl mb-5">Reset Password</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="[&>:first-child]:mb-5"
          >
            <div>
              <InputField
                label="password"
                register={register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password should be minimum 8 characters",
                  },
                })}
                type="password"
              />
              {errors.password && (
                <ErrorMessage message={String(errors.password.message)} />
              )}
            </div>
            <div>
              <InputField
                label="confirm password"
                register={register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
              />
              {errors.confirmPassword && (
                <ErrorMessage
                  message={String(errors.confirmPassword.message)}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-[var(--site-color)] mt-5 text-white px-5 py-2 rounded flex items-center justify-center gap-2"
            >
              Reset Password{" "}
              {loading && (
                <CgSpinner size={21} color="white" className="animate-spin" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
