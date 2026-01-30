import React from "react";
import IntroSection from "@components/IntroSection";
import RecipeSearchSection from "./components/RecipeSearchSection";
import styles from "./RecipesPage.module.scss";
import clsx from "clsx";
import IntroImageLG from "@assets/images/food_page_intro_lg.png";
import IntroImageSM from "@assets/images/food_page_intro_sm.png";
import IntroImageXS from "@assets/images/food_page_intro_xs.png";

export type RecipesPageProps = {
  className?: string;
};

const RecipesPage: React.FC<RecipesPageProps> = ({ className }) => {
  return (
    <main className={clsx(className, styles["recipes-page"])}>
      <IntroSection
        image={{
          title: "Картинка с разными блюдами",
          dimensions: { imgUrl_lg: IntroImageLG, imgUrl_sm: IntroImageSM, imgUrl_xs: IntroImageXS },
        }}
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
