import React from "react";
import { ArrowLeft } from "../assets/Svg";

export default function Search({
  search,
  setSearch,
  placeholder = "Ox",
  onSearchClick,
}) {
  return (
    <div className="flex al-ce jc search-container">
      <div className="flex al-ce jc search-input-container">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={setSearch}
          placeholder={placeholder}
        />
      </div>
      <div className="search-icon" onClick={onSearchClick}>
        Search
        <ArrowLeft />
      </div>
    </div>
  );
}
