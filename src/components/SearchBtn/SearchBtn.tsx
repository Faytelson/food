import SearchIcon from "@components/icons/SearchIcon";
import styles from "./SearchBtn.module.scss";
import clsx from "clsx";

export type SearchBtnProps = {
  onSearch: () => void;
  className?: string;
};

const SearchBtn = ({ onSearch, className }: SearchBtnProps) => {
  return (
    <button
      type="button"
      onClick={onSearch}
      className={styles["search-btn"]}
    >
      <SearchIcon className={clsx(styles["search-btn__icon"], className)}></SearchIcon>
    </button>
  );
};

export default SearchBtn;
