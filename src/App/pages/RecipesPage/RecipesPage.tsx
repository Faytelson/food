import React from "react";
import IntroSection from "./components/IntroSection";
import RecipeSearchSection from "./components/RecipeSearchSection";
import styles from "./RecipesPage.module.scss";
import clsx from "clsx";
import IntroImage from "@assets/images/food_page_intro_lg.png";

export type RecipesPageProps = {
  className?: string;
};

const RecipesPage: React.FC<RecipesPageProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles["recipes-page"])}>
      <IntroSection image={{ title: "Recipes Intro", url: IntroImage }}>
        Найдите идеальное блюдо и напитки для любого случая — от ужинов в будни до праздничных
        застолий
      </IntroSection>
      <RecipeSearchSection />
    </div>
  );
};

export default RecipesPage;
