import React, { useEffect } from "react";
import SearchLeft from "./SearchLeft";
import SearchRight from "./SearchRight";
import { ProductProps } from "../../../utils/types";
import { useSearchParams } from "react-router";
import { useBaseURLStore } from "../../../../store/authStore";
import Loading from "../../comp_util/Loader/Loading";
import SearchNotFound from "./util/SearchNotFound";
import { ToastContainer } from "react-toastify";

const Search: React.FC = () => {
  const baseURL = useBaseURLStore((state) => state.baseURL);

  const [results, setResults] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    setLoading(true);
    let query = "";
    [...searchParams].forEach((param, index) => {
      query += `${param[0]}=${param[1]}${
        [...searchParams].length - 1 === index ? "" : "&"
      }`;
    });
    fetch(`${baseURL}/search-product/?${query}&page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setResults(data.results || []);
          // setResults((prev) => [...prev, ...(data.results || [])]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, page]);
  const maxWidth = window.outerWidth;
  const resultsLength = results?.length;
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
      <div
        className={`mx-auto ${loading ? "opacity-50" : ""} ${
          resultsLength > 0 ? "mt-8" : "slick-shadow m-4 p-[3.125rem] bg-white"
        }`}
        style={{ maxWidth: resultsLength > 0 ? maxWidth - 200 : maxWidth - 30 }}
      >
        {resultsLength > 0 ? (
          <div className="grid grid-cols-[270px_1fr] gap-x-5 mt-8 mx-2">
            <SearchLeft />
            {loading ? <Loading /> : <SearchRight results={results} />}
          </div>
        ) : (
          <SearchNotFound />
        )}
      </div>
    </>
  );
};

export default Search;
