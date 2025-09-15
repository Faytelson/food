import React from "react";
import ButtonBack from "@components/ButtonBack";
import Text from "@components/Text";
import RecipeMetaList from "./RecipeMetaList";
import RecipeDescription from "./RecipeDescription";
import styles from "./RecipeIntroSection.module.scss";
import clsx from "clsx";

export type RecipeIntroImage = {
  src: string;
  alt: string;
  id: number;
};

export type RecipeMeta = {
  prep: number;
  cooking: number;
  total: number;
  likes: number;
  servings: number;
  ratings: boolean;
};

export type RecipeIntroSectionProps = {
  className?: string;
  title: string;
  image: RecipeIntroImage;
  data: RecipeMeta;
  summary: React.ReactNode;
};

const RecipeIntroSection: React.FC<IntroSectionProps> = ({
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
        <div className={styles["recipe-intro-section__img-container"]}>
          <img
            src={image.url}
            alt={image.name}
            loading="eager"
            className={styles["recipe-intro-section__img"]}
          />
        </div>
        <RecipeMetaList
          className={styles["recipe-intro-section__meta-list"]}
          items={data}
        ></RecipeMetaList>
        <RecipeDescription className={styles["recipe-intro-section__description"]} content={summary}></RecipeDescription>
      </section>
    </section>
  );
};

export default RecipeIntroSection;
