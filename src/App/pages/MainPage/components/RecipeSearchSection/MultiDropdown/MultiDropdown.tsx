import React, { useEffect, useMemo, useRef, useState } from "react";
import Input from "../Input";
import ArrowDownIcon from "@components/icons/ArrowDownIcon";
import clsx from "clsx";
import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);

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

  // useEffect(() => {
  //   const onKey = (e: KeyboardEvent) => {
  //     if (!isOpen) return;
  //     if (e.key === 'Escape') {
  //       setIsOpen(false);
  //       setSearch('');
  //       inputRef.current?.blur();
  //     } else if (e.key === 'Backspace' && search === '') {
  //       if (value.length > 0) {
  //         onChange(value.slice(0, value.length - 1));
  //       }
  //     }
  //   };
  //   document.addEventListener('keydown', onKey);
  //   return () => document.removeEventListener('keydown', onKey);
  // }, [isOpen, search, value, onChange]);

  const toggleOption = (option: Option) => {
    const exists = value.some((v) => v.key === option.key);
    const next = exists ? value.filter((v) => v.key !== option.key) : [...value, option];
    onChange(next);
    setSearch("");
  };

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => option.value.toLowerCase().includes(q));
  }, [options, search]);

  const inputValue = focused ? search : value.length > 0 ? getTitle(value) : "";

  return (
    <div
      ref={rootRef}
      className={clsx(styles["multi-dropdown"], className)}
    >
      <Input
        // ref={inputRef as any}
        value={inputValue}
        placeholder={getTitle(value)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary"></ArrowDownIcon>}
        onFocus={() => {
          if (disabled) return;
          setFocused(true);
          setIsOpen(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onChange={(value: string) => {
          setSearch(value);
          if (!isOpen) setIsOpen(true);
        }}
        // onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        //   if (e.key === 'Enter') {
        //     e.preventDefault();
        //     if (filteredOptions.length > 0) {
        //       toggleOption(filteredOptions[0]);
        //       setSearch('');
        //     }
        //   }
        // }}
      />

      {isOpen && !disabled && (
        <ul
          role="listbox"
          aria-multiselectable
          className={styles["multi-dropdown__list"]}
        >
          {filteredOptions.map((opt) => {
            const selected = value.some((v) => v.key === opt.key);
            return (
              <li
                key={opt.key}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  toggleOption(opt);
                }}
                className={clsx(styles["multi-dropdown__option"], {
                  [styles["multi-dropdown__option_selected"]]: selected,
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

export default MultiDropdown;
