import React from "react";
import IntroSection from "./components/IntroSection";
import Header from "@components/Header";
import RecipeSearchSection from "./components/RecipeSearchSection";
import styles from "./MainPage.module.scss";
import clsx from "clsx";
import { introImages } from "./images";
import { Link } from "react-router";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles["main-page"])}>
      <Header></Header>
      <main className={styles["main-page__content"]}>
        <IntroSection image={introImages}>
          Find the perfect food and <Link to="/">drink ideas</Link> for every occasion, from{" "}
          <Link to="/">weeknight dinners</Link> to <Link to="/">holiday feasts</Link>.
        </IntroSection>
        <RecipeSearchSection></RecipeSearchSection>
      </main>
    </div>
  );
};

export default MainPage;
