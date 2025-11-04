import { useState, useId } from "react";
import Input from "@app/pages/MainPage/components/RecipeSearchSection/Input";
import clsx from "clsx";
import styles from "./ComboBox.module.scss";

export type ComboBoxProps = {
  items: { key: number; value: string }[] | null;
  placeholder: string;
  isLoading?: boolean;
  onValueChange: (value: string) => void;
  className?: string;
};

const ComboBox = ({
  items = null,
  placeholder,
  isLoading = false,
  onValueChange,
  className,
}: ComboBoxProps) => {
  const listId = useId();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsOpen(!!newValue);
    onValueChange(newValue);
  };

  return (
    <div
      className={clsx(styles["combo-box"], className)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={listId}
    >
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles["combo-box__input"]}
      />

      <ul
        role="listbox"
        id={listId}
        className={styles["combo-box__list"]}
      >
        {isOpen && isLoading && (
          <li
            role="option"
            aria-disabled="true"
            className={styles["combo-box__list-item"]}
          >
            Loading...
          </li>
        )}

        {isOpen &&
          !isLoading &&
          (items && items?.length > 0 ? (
            items?.map((item) => {
              return (
                <li
                  key={item.key}
                  onMouseDown={() => {
                    setValue(item.value);
                    setIsOpen(false);
                    onValueChange(item.value);
                  }}
                  role="option"
                  className={styles["combo-box__list-item"]}
                >
                  {item.value}
                </li>
              );
            })
          ) : (
            <li
              role="option"
              aria-disabled="true"
              className={styles["combo-box__list-item"]}
            >
              No matching results
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ComboBox;
