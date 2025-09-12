import React from "react";
import IntroSection from "./components/IntroSection";
import Header from "@components/Header";
import RecipeSearchSection from "./components/RecipeSearchSection";
import styles from "./MainPage.module.scss";
import clsx from "clsx";
import { introImages } from "./images";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles["main-page"])}>
      <Header></Header>
      <main className={styles["main-page__content"]}>
        <IntroSection image={introImages}>
          Find the perfect food and <a href="#">drink ideas</a> for every occasion, from{" "}
          <a href="#">weeknight dinners</a> to <a href="#">holiday feasts</a>.
        </IntroSection>
        <RecipeSearchSection></RecipeSearchSection>
      </main>
    </div>
  );
};

export default MainPage;
