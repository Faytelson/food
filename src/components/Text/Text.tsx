import * as React from "react";
import clsx from "clsx";
import "./Text.scss";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: "title" | "button" | "p-20" | "p-18" | "p-16" | "p-14";
  /** Html-тег */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Начертание шрифта */
  weight?: "normal" | "medium" | "bold";
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: "primary" | "secondary" | "accent";
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const viewStyles: Record<NonNullable<TextProps["view"]>, string> = {
  title: "text_view_title",
  button: "text_view_button",
  "p-20": "text_view_p-20",
  "p-18": "text_view_p-18",
  "p-16": "text_view_p-16",
  "p-14": "text_view_p-14",
};

const weightStyles: Record<NonNullable<TextProps["weight"]>, string> = {
  normal: "text-normal",
  medium: "text-medium",
  bold: "text-bold",
};

const colorStyles: Record<NonNullable<TextProps["color"]>, string> = {
  primary: "text_color_primary",
  secondary: "text_color_secondary",
  accent: "text_color_accent",
};

const Text: React.FC<TextProps> = ({
  tag = "p",
  view,
  weight,
  color,
  maxLines,
  className,
  children,
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const classes = clsx(
    "text",
    view && viewStyles[view],
    weight && weightStyles[weight],
    color && colorStyles[color],
    className,
  );

  const style: React.CSSProperties = maxLines
    ? {
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }
    : {};

  return (
    <Tag
      className={classes}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default Text;
