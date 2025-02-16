import React, { useEffect } from "react";
import InputField from "../../comp_util/input-field/InputField";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../../comp_util/button/Button";
import ErrorMessage from "../../comp_util/message/ErrorMessage";
import Slider from "react-slick";
import CrossButton from "../../comp_util/button/CrossButton";
import SampleNextArrow from "../../comp_util/slick/SampleNextArrow";
import SamplePrevArrow from "../../comp_util/slick/SamplePrevArrow";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useProductStore,
} from "../../../../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import { BsUpload } from "react-icons/bs";
import DashProduct from "./DashProduct";
import { ProductProps } from "../../../utils/types";
import ConfirmProductDeletePopup from "../../popup/seller/ConfirmProductDeletePopup";

const Dashboard: React.FC = () => {
  const initializeProduct = useProductStore((state) => state.initializeProduct);
  const isToUpdate = useProductStore((state) => state.isToUpdate);
  const setIsToUpdate = useProductStore((state) => state.setIsToUpdate);
  const productData = useProductStore((state) => state.productData);
  const setProductData = useProductStore((state) => state.setProductData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
    getValues,
  } = useForm({
    defaultValues: initializeProduct,
  });
  useEffect(() => {
    reset(initializeProduct);
  }, [initializeProduct, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const images = watch("images");
  const inputList = [
    // product name
    {
      label: "Product Name",
      name: "name",
      type: "text",
      register: register("name", {
        required: { value: true, message: "Required" },
        validate: (value) =>
          /\S/.test(value || "") || "Product Name is Required",
      }),
    },
    // description
    {
      label: "Description",
      name: "description",
      type: "text",
      register: register("description", {
        required: { value: true, message: "Required" },
        validate: (value) =>
          /\S/.test(value || "") || "Description is Required",
      }),
    },
    // price
    {
      label: "Price",
      name: "price",
      type: "number",
      register: register("price", {
        required: { value: true, message: "Required" },
        validate: (value) =>
          (value as number) >= 0 || "Price must be positive number",
      }),
    },
    // stock
    {
      label: "Stock",
      name: "stock",
      type: "number",
      register: register("stock", {
        required: { value: true, message: "Required" },
        validate: (value) =>
          (value as number) >= 0 || "Stock must be positive number",
      }),
    },
    // category
    {
      label: "Category",
      name: "category",
      type: "text",
      register: register("category", {
        required: { value: true, message: "Required" },
        validate: (value) => /\S/.test(value || "") || "Category is Required",
      }),
    },
    // brand
    {
      label: "Brand",
      name: "brand",
      type: "text",
      register: register("brand", {
        validate: (value) => {
          if (value === "") return true;
          else {
            return /\S/.test(value || "") || "Brand is not empty";
          }
        },
      }),
    },
  ];

  // add product
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (formData: ProductProps) => {
    setLoading(true);
    if (isToUpdate) return handleUpdate();
    fetch(`${baseURL}/product/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setProductData([
            {
              ...formData,
              _id: data._id,
              updatedAt: `${new Date()}`,
              createdAt: `${new Date()}`,
            },
            ...(productData || []),
          ]);
          reset();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const [maxWidth, setMaxWidth] = React.useState(0);
  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(window.outerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  const resizeImageToBase64 = async (
    file: any,
    maxWidth: number,
    maxHeight: number,
    index: number
  ) => {
    return new Promise((_resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file?.[0]);
      img.onload = async () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Use createImageBitmap for high-quality scaling
        const bitmap = await createImageBitmap(img);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Enable high-quality scaling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          ctx.drawImage(bitmap, 0, 0, width, height);

          // Convert canvas to Base64
          const base64String = canvas.toDataURL(file.type);
          setValue(`images.${index}`, base64String, { shouldValidate: true });
        }
      };
      img.onerror = reject;
    });
  };

  const [type, setType] = React.useState({ 0: "file" });
  // convert image to base64
  useEffect(() => {
    if (images) {
      images?.forEach((item: File | string, index: number) => {
        if (typeof item === "object") {
          resizeImageToBase64(item, 300, 300, index);
        }
      });
    }
  }, [images, setValue, watch]);

  const handleUpdate = () => {
    fetch(`${baseURL}/product/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...getValues() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          reset(getValues());
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

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
      {openModel === "confirm product delete" && <ConfirmProductDeletePopup />}
      <div className="mx-auto" style={{ maxWidth: maxWidth }}>
        <h1 className="text-2xl font-semibold px-4 py-2">Dashboard</h1>
        <hr />

        <div
          className={`grid grid-cols-2 gap-2 mt-7 px-10 max-w-[1500px] mx-auto`}
        >
          <DashProduct baseURL={baseURL} accessToken={accessToken} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* normal inputs */}
            {inputList.map((item) => (
              <div key={item?.label} className="mb-3">
                <InputField
                  label={item?.label}
                  register={item?.register}
                  type={item?.type}
                />
                {errors[item?.name as keyof ProductProps] && (
                  <ErrorMessage
                    message={errors[item?.name as keyof ProductProps]?.message}
                    className="mb-4"
                  />
                )}
              </div>
            ))}
            <div>
              {/* image slider */}
              <Slider {...settings} className="px-5">
                {images?.map((item: string, index: number) => (
                  <div
                    key={`image-${index}`}
                    className="relative p-1 h-[200px] "
                  >
                    <img
                      src={item}
                      alt={`image-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <CrossButton
                      className="absolute top-2 right-2"
                      onClick={() => remove(index)}
                    />
                  </div>
                ))}
              </Slider>
              {/* input image */}
              {fields.map((item, index) => (
                <div key={item?.id} className="flex gap-1 items-center">
                  <InputField
                    type={type?.[index as keyof typeof type]}
                    register={register(`images.${index}`)}
                    className="grow"
                  />
                  <CrossButton className="" onClick={() => remove(index)} />
                </div>
              ))}
              {/* image add button */}
              <div className="flex">
                {/* add image via url */}
                <Button
                  type="button"
                  name="Add Img Url"
                  className="bg-green-500 active:bg-green-400"
                  onClick={() => {
                    append("");
                    setType((prev) => ({ ...prev, [fields.length]: "url" }));
                  }}
                />
                {/* add image locally */}
                <Button
                  type="button"
                  name={<BsUpload size={18} strokeWidth={0.5} />}
                  className="bg-blue-500 active:bg-blue-600 px-3"
                  onClick={() => {
                    append("");
                    setType((prev) => ({ ...prev, [fields.length]: "file" }));
                  }}
                />
              </div>
            </div>
            {/* buttons */}
            <div className="flex gap-3">
              {/* submit */}
              {!isToUpdate && (
                <Button name="Submit" type="submit" loading={loading} />
              )}
              {/* reset */}
              <Button
                type="reset"
                name="Reset"
                className="bg-red-500 active:bg-green-400"
                onClick={() => {
                  console.log(images);
                  images?.map((_item: File | string, index: number) =>
                    remove(index)
                  );
                  if (isToUpdate) {
                    reset();
                    setIsToUpdate(false);
                  }
                }}
              />
              {/* update */}
              {isToUpdate && (
                <Button
                  type="submit"
                  name="Update"
                  className="bg-green-500 active:bg-green-400"
                  loading={loading}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
