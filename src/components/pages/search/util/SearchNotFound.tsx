import React from "react";
import searchNotFoundImage from "../../../../assets/img/search/search-not-found.png";
const SearchNotFound: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={searchNotFoundImage} alt="search not found" />
      <div className="text-center">
        <h1 className="text-[1.625rem] font-bold text-[var(--text-21)] mt-5 mb-[0.625rem]">
          Sorry, no results found!
        </h1>
        <p className="text-[1.25rem] text-[var(--text-gray)]">
          Please check the spelling or try searching for something else
        </p>
      </div>
    </div>
  );
};

export default SearchNotFound;
