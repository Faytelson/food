import { useState, useId } from "react";
import Input from "@components/Input";
import Loader from "@components/Loader";
import clsx from "clsx";
import styles from "./ComboBox.module.scss";

export type ComboBoxItems = { id: number; name: string }[] | null;

export type ComboBoxProps = {
  value: string;
  items: ComboBoxItems;
  isLoading: boolean;
  onChange: (v: string) => void;
  onSelectItem: (v: string) => void;
  className?: string;
};

const ComboBox = ({
  value,
  items = null,
  isLoading = false,
  onChange,
  onSelectItem,
  className,
  ...rest
}: ComboBoxProps) => {
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);

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
        onChange={(v) => {
          onChange(v);
          setIsOpen(true);
        }}
        className={styles["combo-box__input"]}
        {...rest}
      />

      <ul
        role="listbox"
        id={listId}
        className={clsx(
          styles["combo-box__list"],
          { [styles["combo-box__list_open"]]: isOpen },
          { [styles["combo-box__list_loading"]]: isLoading },
        )}
      >
        {isLoading && (
          <li
            key="loader"
            role="status"
            aria-live="polite"
            className={clsx(styles["combo-box__list-item"], styles["combo-box__list-item_loader"])}
          >
            <Loader
              size="s"
              color="var(--color-brand)"
            />
          </li>
        )}
        {items?.map((item) => {
          return (
            <li
              key={item.id}
              onMouseDown={() => {
                if (item.id === -1) {
                  setIsOpen(false);
                  return;
                }
                onSelectItem(item.name);
                setIsOpen(false);
              }}
              role="option"
              className={styles["combo-box__list-item"]}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ComboBox;
