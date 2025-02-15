import { NavigateOptions, To } from "react-router";
import { toast } from "react-toastify";
import { ProductProps } from "./types";

type FetchHandlerProps = {
  baseURL: string;
  accessToken: string | null;
  //   setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: (accessToken: string | null) => void;
  navigate: (to: To, options?: NavigateOptions) => void;
};
export const handleLogout = ({
  baseURL,
  accessToken,
  setAccessToken,
  navigate,
}: FetchHandlerProps): void => {
  fetch(`${baseURL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setAccessToken(null);
        navigate("/", { state: { toastMessage: data.message } });
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => console.log(error));
};

export const handleDeleteProduct = async (
  productId: string,
  baseURL: string,
  accessToken: string | null,
  productData: ProductProps[],
  setProductData: (productData: ProductProps[]) => void
): Promise<boolean> => {
  let isOk = false;
  try {
    const res = await fetch(`${baseURL}/product/delete/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (data.status === "success") {
      isOk = true;
      toast.success(data.message);
      setProductData(productData?.filter((item) => item._id !== productId));
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(`error in delete product`, error);
    isOk = false;
  } finally {
    return isOk;
  }
};
