import React, { useEffect } from "react";
import { cn } from "../../../utils/fn_utils.ts";
import { IoSearchSharp } from "react-icons/io5";
import { useLocation, useNavigate, useSearchParams } from "react-router";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}
const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  className,
}) => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = React.useState<string>(
    searchParams.get("searchText") || ""
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchText = searchParams.get("searchText");
    setInputValue(searchText || "");
    if (location.pathname === "/") {
      setInputValue("");
    }
  }, [location.pathname, searchParams.get("searchText")]);
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "bg-white py-1.5 rounded-[1px] flex items-center justify-between"
        )}
      >
        {/* input */}
        <div className="pl-4 w-full">
          <input
            type="text"
            placeholder={placeholder || "Search for products, brands and more"}
            className="w-full outline-none min-w-10 overflow-hidden text-ellipsis text-nowrap "
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                /\S/.test((e.target as HTMLInputElement).value)
              ) {
                navigate(
                  `/search?searchText=${(e.target as HTMLInputElement).value}`
                );
              }
            }}
          />
        </div>
        {/* search icon */}
        <div
          onClick={() => navigate(`/search?searchText=${inputValue}`)}
          className="cursor-pointer pl-2 pr-3"
        >
          <IoSearchSharp color="var(--site-color)" strokeWidth={3} size={22} />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
