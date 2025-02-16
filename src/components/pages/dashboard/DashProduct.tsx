import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../../comp_util/Loader/Loading";
import Product from "../../comp_util/product/Product";
import { useProductStore } from "../../../../store/authStore";
import Button from "../../comp_util/button/Button";

interface DashProductProps {
  accessToken: string | null;
  baseURL: string;
}
const DashProduct: React.FC<DashProductProps> = ({ baseURL, accessToken }) => {
  const [loading, setLoading] = React.useState(false);
  const [moreLoading, setMoreLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const productData = useProductStore((state) => state.productData);
  const setProductData = useProductStore((state) => state.setProductData);

  useEffect(() => {
    if (!accessToken) return;
    if (page === 1) setLoading(true);
    else setMoreLoading(true);

    fetch(`${baseURL}/product/seller?page=${page}&limit=10`, {
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
          setProductData([...(productData || []), ...data.products]);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (page === 1) setLoading(false);
        else setMoreLoading(false);
      });
  }, [accessToken, page]);

  const maxHeight = window.outerHeight;

  if (loading) return <Loading />;
  return (
    <div className="max-w-[500px]">
      <h1 className="text-2xl font-bold mb-5">Products</h1>
      <div
        className="overflow-y-auto rounded-r-lg "
        style={{ maxHeight: maxHeight - 100, height: "100%" }}
      >
        {productData?.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {productData?.length > 0 && (
        <Button
          onClick={() => setPage(page + 1)}
          name="load more"
          className="my-10"
          loading={moreLoading}
        />
      )}
    </div>
  );
};

export default DashProduct;
