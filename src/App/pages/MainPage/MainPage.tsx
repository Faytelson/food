import React from "react";
import IntroSection from "./components/IntroSection";
import RecipeSearchSection from "./components/RecipeSearchSection";
import styles from "./MainPage.module.scss";
import clsx from "clsx";
import IntroImage from "@assets/images/food_page_intro_lg.png";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles["main-page"])}>
      <IntroSection image={{ title: "Main Intro", url: IntroImage }}>
        Найдите идеальное блюдо и напитки для любого случая — от ужинов в будни до праздничных
        застолий
      </IntroSection>
      <RecipeSearchSection />
    </div>
  );
};

export default MainPage;
