import type React from "react";
import Card from "@components/Card";
import { type UUID } from "@api/recipes";
import { type CardProps } from "@components/Card";
import { useNavigate } from "react-router-dom";
import styles from "./RecipeList.module.scss";
import clsx from "clsx";

export type RecipeCard = CardProps & {
  documentId: UUID;
};

type RecipeListProps = {
  items: RecipeCard[];
  renderAction?: (item: RecipeCard) => React.ReactNode;
  className?: string;
};

const RecipeList = ({ items, className, renderAction }: RecipeListProps) => {
  const navigate = useNavigate();

  return (
    <ul className={clsx(styles["recipe-list"], className)}>
      {items.map((item) => (
        <li
          className={styles["recipe-list__item"]}
          key={item.title}
          onClick={() => {
            navigate(`/recipes/${item.documentId}`);
          }}
        >
          <Card
            className={styles["recipe-list__card"]}
            images={item.images}
            captionSlot={item.captionSlot}
            title={item.title}
            subtitle={item.subtitle}
            contentSlot={item.contentSlot}
          >
            {renderAction?.(item)}
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
