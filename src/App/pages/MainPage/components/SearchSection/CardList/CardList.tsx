import { type Recipe } from "@api/recipes";
import styles from "./CardList.module.scss";

import Card, { type CardProps } from "../Card/Card";
import Button from "../Button";
import ClockIcon from "@components/icons/ClockIcon";
import { Link } from "react-router-dom";

export type CardWithId = CardProps & { documentId: string };
export type CardListProps = {
  recipes: Recipe[];
};
const CardList = ({ recipes }: CardListProps) => {
  const recipeCards = recipes.map((r) => {
    const imageData = {
      url: r.images?.[0]?.url ?? "",
      alt: r.images?.[0]?.name ?? "Recipe Image",
      id: r.images?.[0]?.id,
    };

    return {
      image: imageData,
      captionSlot: (
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ClockIcon
            width={15}
            height={15}
            color="accent"
            style={{ position: "relative", top: "-1px" }}
          />
          {r.preparationTime} minutes
        </span>
      ),
      title: r.name,
      subtitle: <span dangerouslySetInnerHTML={{ __html: r.summary }}></span>,
      contentSlot: <span>{Math.round(r.calories)} kcal</span>,
      actionSlot: <Button onClick={(e) => e.stopPropagation()}>Save</Button>,
      documentId: r.documentId,
    };
  });

  return (
    <ul className={styles["card-list"]}>
      {recipeCards.map((card) => {
        return (
          <li
            className={styles["card-list__item"]}
            key={card.title}
          >
            <Link to={`/recipes/${card.documentId}`}>
              <Card
                className={styles["card-list__card"]}
                image={card.image}
                captionSlot={card.captionSlot}
                title={card.title}
                subtitle={card.subtitle}
                contentSlot={card.contentSlot}
                actionSlot={card.actionSlot}
              ></Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
