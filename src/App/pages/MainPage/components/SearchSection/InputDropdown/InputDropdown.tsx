import React, { useEffect, useMemo, useRef, useState } from "react";
import Input from "../Input";
import ArrowDownIcon from "@assets/icons/arrow_down.svg?react";
import clsx from "clsx";
import styles from "./InputDropdown.module.scss";

export type Option = {
  key: number;
  value: string;
};

export type InputDropdownProps = {
  className?: string;
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  disabled?: boolean;
  getTitle: (value: Option | null) => string;
};

const InputDropdown: React.FC<InputDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const toggleOption = (option: Option) => {
    if (value?.key === option.key) {
      onChange(null);
    } else {
      onChange(option);
    }
    setIsOpen(false);
    setSearch("");
    setFocused(false);
  };

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => option.value.toLowerCase().includes(q));
  }, [options, search]);

  const inputValue = value ? (focused ? search : getTitle(value)) : "";

  return (
    <div
      ref={rootRef}
      className={clsx(styles["input-dropdown"], className)}
    >
      <Input
        value={inputValue}
        placeholder={getTitle(value)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon></ArrowDownIcon>}
        onClick={() => {
          if (disabled) return;
          setIsOpen((prev) => !prev);
        }}
        onChange={(value: string) => {
          setSearch(value);
          if (!isOpen) setIsOpen(true);
        }}
      />

      {isOpen && !disabled && (
        <ul
          role="listbox"
          className={styles["input-dropdown__list"]}
        >
          {filteredOptions.map((opt) => {
            const selected = value?.key === opt.key;
            return (
              <li
                key={opt.key}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  toggleOption(opt);
                }}
                className={clsx(styles["input-dropdown__option"], {
                  [styles["input-dropdown__option_selected"]]: selected,
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
