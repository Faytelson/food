import React from "react";
import Text from "@components/Text";
import InfoCard from "@components/InfoCard/InfoCard";
import clsx from "clsx";
import styles from "./InfoCardsBlock.module.scss";

export type InfoCardsBlockProps = {
  title: string;
  items: InfoItem[];
  className?: string;
};

export type InfoItem = {
  id: number;
  text: string;
  icon: React.ReactNode;
};

const InfoCardsBlock = ({ title, items, className }: InfoCardsBlockProps) => {
  return (
    <article className={clsx(className, styles["info-cards-block"])}>
      <Text
        tag="h2"
        view="title"
        className={styles["info-cards-block__title"]}
      >
        {title}
      </Text>

      <ul className={styles["info-cards-block__list"]}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles["info-cards-block__item"]}
          >
            <InfoCard text={item.text}>{item.icon}</InfoCard>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default InfoCardsBlock;
