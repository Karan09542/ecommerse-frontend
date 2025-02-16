import React from "react";
import { useSearchParams } from "react-router";

const SearchLeft: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min, setMin] = React.useState<number>(
    parseInt(searchParams.get("price[gte]") || "")
  );
  const [max, setMax] = React.useState<number>(10_00_000);

  const minMaxList = [
    {
      type: "number",
      placeholder: "Min",
      step: 100,
      value: min,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setMin(value);
        if (value < 0) return;
        else {
          setSearchParams((prev) => {
            if (value <= 0) {
              prev.delete("price[gte]");
              return prev;
            }
            prev.set("price[gte]", `${value}`);
            return prev;
          });
        }
      },
      className: min < 0 ? "ring-red-500" : "",
    },
    {
      type: "number",
      placeholder: "Max",
      step: 100,
      value: max,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setMax(value);
        if (value < 0) return;
        else {
          setSearchParams((prev) => {
            if (value <= 0) {
              prev.delete("price[lte]");
              return prev;
            }
            prev.set("price[lte]", `${value}`);
            return prev;
          });
        }
      },
      className: max < 0 ? "ring-red-500" : "",
    },
  ];
  return (
    <div className="bg-white slick-shadow">
      {/* Filters - Top */}
      <div>
        <h1 className="filter-heading">Filters</h1>
        <hr />
      </div>
      {/* Filters - Price */}
      <div className="mb-5">
        <h2 className="filter-subheading">Price</h2>
        <div className="flex items-center gap-x-5 px-4">
          {minMaxList.map((item) => (
            <input
              key={item?.placeholder}
              {...item}
              className={`price-filter w-full ${item?.className}`}
            />
          ))}
        </div>
        {/* <input
            type="number"
            placeholder="Min"
            className={`price-filter w-full ${min < 0 ? "ring-red-500" : ""}`}
            step={100}
            value={min}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setMin(value);
              if (value < 0) return;
              else {
                setSearchParams((prev) => {
                  if (value <= 0) {
                    prev.delete("price[gte]");
                    return prev;
                  }
                  prev.set("price[gte]", `${value}`);
                  return prev;
                });
              }
            }}
          />
          
          <input
            type="number"
            placeholder="Max"
            className="price-filter w-full"
          /> */}
        {/* </div> */}
      </div>
      <hr />
    </div>
  );
};

export default SearchLeft;
