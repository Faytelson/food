import React from "react";
import IntroSection from "@components/IntroSection";
import RecipeSearchSection from "./components/RecipeSearchSection";
import styles from "./RecipesPage.module.scss";
import clsx from "clsx";
import IntroImage from "@assets/images/food_page_intro_lg.png";

export type RecipesPageProps = {
  className?: string;
};

const RecipesPage: React.FC<RecipesPageProps> = ({ className }) => {
  return (
    <main className={clsx(className, styles["recipes-page"])}>
      <IntroSection
        image={{ title: "Recipes Intro", url: IntroImage }}
        className={styles["recipes-page__intro-section"]}
      >
        Я подготовила для вас свои лучшие рецепты: здесь собраны блюда от будничных обедов до
        праздничных застолий
      </IntroSection>
      <RecipeSearchSection />
    </main>
  );
};

export default RecipesPage;
