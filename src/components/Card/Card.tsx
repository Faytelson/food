import React from "react";
import Text from "@components/Text";
import styles from "./Card.module.scss";
import clsx from "clsx";

export type CardImage = {
  url: string;
  alt: string;
  id?: number;
};

export type CardProps = {
  className?: string;
  images: CardImage;
  captionSlot?: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  images,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  children,
}) => {
  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles["card__image-section"]}>
        <img
          src={images.url}
          alt={images.alt}
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

          {children && <div className={styles["card__action-slot"]}>{children}</div>}
        </footer>
      </div>
    </article>
  );
};

export default Card;
