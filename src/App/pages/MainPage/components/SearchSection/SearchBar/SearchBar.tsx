import React from "react";
import Input from "../Input";
import SearchIcon from "@assets/icons/search.svg?react";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className={styles["search-bar"]}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter dishes"
        className={styles["search-bar__input-field"]}
      />
      <button
        type="button"
        onClick={handleChange}
        className={styles["search-bar__button"]}
      >
        <SearchIcon className={styles["search-bar__search-icon"]} />
      </button>
    </div>
  );
};

export default SearchBar;
