import React from "react";
import Text from "@components/Text";
import styles from "./Card.module.scss";
import clsx from "clsx";

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <article
      className={clsx(styles.card, className)}
      onClick={onClick}
    >
      <div className={styles["card__image-section"]}>
        <img
          src={image}
          alt="Карточка"
          className={styles["card__image"]}
        />
      </div>

      <div className={styles["card__content-section"]}>
        {captionSlot && (
          <div className={styles["card__caption-slot"]}>
            <Text
              view="p-14"
              tag="p"
              weight="medium"
              color="secondary"
            >
              {captionSlot}
            </Text>
          </div>
        )}

        <div className={styles["card__title"]}>
          <Text
            view="p-20"
            tag="h3"
            weight="medium"
            color="primary"
            maxLines={2}
          >
            {title}
          </Text>
        </div>

        <div className={styles["card__subtitle"]}>
          <Text
            view="p-16"
            tag="p"
            color="secondary"
            maxLines={3}
          >
            {subtitle}
          </Text>
        </div>

        <footer className={styles["card__footer"]}>
          {contentSlot && (
            <div className={styles["card__content-slot"]}>
              <Text
                view="p-18"
                tag="p"
                weight="bold"
                color="accent"
                maxLines={3}
              >
                {contentSlot}
              </Text>
            </div>
          )}

          {actionSlot && <div className={styles["card__action-slot"]}>{actionSlot}</div>}
        </footer>
      </div>
    </article>
  );
};

export default Card;
