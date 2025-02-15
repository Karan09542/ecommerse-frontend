import React from "react";
import ProductCard from "./util/ProductCard";
import { ProductProps } from "../../../utils/types";

interface SearchRightProps {
  results: ProductProps[];
}
const SearchRight: React.FC<SearchRightProps> = ({ results }) => {
  return (
    <div>
      <div className="grid slick-shadow max-[820px]:[&>div]:mx-auto max-[820px]:grid-cols-1 max-[820px]:mx-auto max-[1008px]:grid-cols-2 max-[1300px]:grid-cols-3 grid-cols-4 gap-1 border-t border-[var(--hr-color)]">
        {results?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SearchRight;
