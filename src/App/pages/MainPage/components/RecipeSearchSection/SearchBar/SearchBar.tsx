import React, { useState } from "react";
import Input from "../Input";
import SearchIcon from "@components/icons/SearchIcon";
import clsx from "clsx";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  items: { key: number; value: string }[];
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className={styles["search-bar"]}>

      <button
        type="button"
        onClick={handleChange}
        className={styles["search-bar__button"]}
      >
        <SearchIcon className={styles["search-bar__search-icon"]}></SearchIcon>
      </button>
    </div>
  );
};

export default SearchBar;
