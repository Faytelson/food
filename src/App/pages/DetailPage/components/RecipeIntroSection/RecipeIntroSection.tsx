import React from "react";
import ButtonBack from "@components/ButtonBack";
import Text from "@components/Text";
import RecipeMetaList from "./RecipeMetaList";
import RecipeDescription from "./RecipeDescription";
import styles from "./RecipeIntroSection.module.scss";
import { type RecipeImage } from "@api/recipes";
import clsx from "clsx";

export type RecipeMeta = {
  term: string;
  description: string;
};

export type RecipeIntroSectionProps = {
  className?: string;
  title: string;
  image?: RecipeImage;
  data: RecipeMeta[];
  summary: React.ReactNode;
};

const RecipeIntroSection: React.FC<RecipeIntroSectionProps> = ({
  className,
  title,
  image,
  data,
  summary,
}) => {
  return (
    <section className={clsx(className, styles["recipe-intro-section"])}>
      <header className={styles["recipe-intro-section__header"]}>
        <ButtonBack className={styles["recipe-intro-section__button-back"]}></ButtonBack>
        <Text
          view="title"
          tag="h1"
          color="primary"
          weight="bold"
        >
          {title}
        </Text>
      </header>
      <section className={styles["recipe-intro-section__about"]}>
        {image && (
          <div className={styles["recipe-intro-section__img-container"]}>
            <img
              src={image.url}
              alt={image.alt}
              loading="eager"
              className={styles["recipe-intro-section__img"]}
            />
          </div>
        )}
        <RecipeMetaList
          className={styles["recipe-intro-section__meta-list"]}
          items={data}
        ></RecipeMetaList>
        <RecipeDescription
          className={styles["recipe-intro-section__description"]}
          content={summary}
        ></RecipeDescription>
      </section>
    </section>
  );
};

export default RecipeIntroSection;
