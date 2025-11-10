import React, { useEffect, useRef, useState } from "react";
import Input from "@components/Input";
import ArrowDownIcon from "@components/icons/ArrowDownIcon";
import clsx from "clsx";
import styles from "./InputDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type InputDropdownProps = {
  className?: string;
  options: Option[];
  selected: Option | null;
  placeholder: string;
  onChange: (value: Option | null) => void;
  disabled?: boolean;
};

const InputDropdown: React.FC<InputDropdownProps> = ({
  className,
  options,
  selected,
  placeholder,
  onChange,
  disabled = false,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const toggleOption = (option: Option) => {
    onChange(selected?.key === option.key ? null : option);
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={clsx(styles["input-dropdown"], className)}
    >
      <Input
        readOnly
        value={selected ? selected.value : ""}
        placeholder={placeholder}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        onClick={() => {
          if (disabled) return;
          setIsOpen((prev) => !prev);
        }}
        onChange={() => {}}
        className={styles["input-dropdown__input"]}
      />

      {isOpen && !disabled && (
        <ul
          role="listbox"
          className={styles["input-dropdown__list"]}
        >
          {options.map((opt) => {
            const selectedOption = selected?.key === opt.key;
            return (
              <li
                key={opt.key}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => toggleOption(opt)}
                className={clsx(styles["input-dropdown__option"], {
                  [styles["input-dropdown__option_selected"]]: selectedOption,
                })}
              >
                <span>{opt.value}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
