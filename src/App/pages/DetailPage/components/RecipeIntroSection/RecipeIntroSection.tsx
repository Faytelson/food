import React from "react";
import ButtonBack from "@components/ButtonBack";
import Text from "@components/Text";
import RecipeMetaList from "./RecipeMetaList";
import RecipeDescription from "./RecipeDescription";
import styles from "./RecipeIntroSection.module.scss";
import clsx from "clsx";

export type RecipeIntroSectionProps = {
  className?: string;
  imageUrl?: string;
};

const fakeRecipeMeta = [
  { term: "Preparation", description: "45 min" },
  { term: "Cooking", description: "50 min" },
  { term: "Servings", description: "4 people" },
  { term: "Difficulty", description: "Medium" },
  { term: "Rating", description: "2/5" },
  { term: "Calories", description: "550 kcal per serving" },
];

const RecipeIntroSection: React.FC<IntroSectionProps> = ({ className }) => {
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
          Pancake Breakfast Casserole
        </Text>
      </header>
      <section className={styles["recipe-intro-section__about"]}>
        <div className={styles["recipe-intro-section__img-container"]}>
          <img
            src="https://i.ibb.co/qMztp7n2/food-page-intro.png"
            alt="test"
            loading="eager"
            className={styles["recipe-intro-section__img"]}
          />
        </div>
        <RecipeMetaList items={fakeRecipeMeta}></RecipeMetaList>
        <RecipeDescription
          content={
            <>
              Pancake Breakfast Casserole takes around 9 hours and 20 minutes from beginning to end.
              One portion of this dish contains approximately 13g of protein, 19g of fat, and a
              total of 499 calories. For $2.33 per serving, this recipe covers 19% of your daily
              requirements of vitamins and minerals. This recipe serves 8. It works well as a main
              course. 3369 people were glad they tried this recipe. It is brought to you by
              Foodnetwork. It is a good option if you're following a lacto ovo vegetarian diet. If
              you have sugar, baking soda, eggs, and a few other ingredients on hand, you can make
              it. It is perfect for Christmas. Taking all factors into account, this recipe earns a
              spoonacular score of 65%, which is pretty good. Similar recipes are Pancake Breakfast
              Casserole, Pancake Breakfast Casserole, and Pancake Breakfast Casserole.
            </>
          }
        ></RecipeDescription>
      </section>
    </section>
  );
};

export default RecipeIntroSection;
