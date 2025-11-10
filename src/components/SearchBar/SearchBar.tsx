import React, { useState, useRef, useCallback, useMemo, type InputHTMLAttributes } from "react";
import ComboBox, { type ComboBoxItems } from "@components/ComboBox";
import SearchBtn from "@components/SearchBtn";
import { debounce } from "@utils/debounce";
import clsx from "clsx";
import styles from "./SearchBar.module.scss";

export type SearchBarProps = {
  className?: string;
  getListItems: (query: string) => Promise<ComboBoxItems>;
  onSearch: (query: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

const SearchBar: React.FC<SearchBarProps> = ({ className, getListItems, onSearch, ...rest }) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ComboBoxItems | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const queryIdRef = useRef(0);

  const handleOnChange = (value: string) => {
    setValue(value);

    const v = value.trim();
    if (v === "") {
      onSearch("");
    }
    debouncedSearchItems(v);
  };

  const searchItems = useCallback(
    async (query: string) => {
      queryIdRef.current++;
      const thisQueryId = queryIdRef.current;
      setItems(null);
      setIsLoading(true);

      query = query.trim();

      try {
        const data = await getListItems(query);
        if (thisQueryId !== queryIdRef.current) return;

        if (data && data.length > 0) setItems(data);
        else setItems([{ id: -1, name: "Совпадений не найдено" }]);
      } catch (error) {
        throw new Error("Не удалось загрузить список: " + error);
      } finally {
        setIsLoading(false);
      }
    },
    [getListItems],
  );

  const debouncedSearchItems = useMemo(() => debounce(searchItems, 1000), [searchItems]);

  return (
    <div className={clsx(styles["search-bar"], className)}>
      <ComboBox
        value={value}
        items={items}
        isLoading={loading}
        onChange={handleOnChange}
        onSelectItem={(v) => {
          setValue(v);
          setItems(null);
          onSearch(v);
        }}
        {...rest}
      />

      <SearchBtn
        onSearch={() => {
          onSearch(value);
        }}
      />
    </div>
  );
};

export default SearchBar;
