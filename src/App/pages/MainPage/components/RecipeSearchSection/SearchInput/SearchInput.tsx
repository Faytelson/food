import React from "react";
import Input from "../Input";
import SearchIcon from "@components/icons/SearchIcon";
import styles from "./SearchInput.module.scss";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles["search-input"]}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter dishes"
        className={styles["search-input__input-field"]}
      />
      <button
        type="button"
        onClick={onChange}
        className={styles["search-input__button"]}
      >
        <SearchIcon className={styles["search-input__search-icon"]}></SearchIcon>
      </button>
    </div>
  );
};

export default SearchBar;
