import React from "react";
import IntroSection from "./components/IntroSection";
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
      <IntroSection image={introImages}>
        Find the perfect food and <Link to="/drink-ideas">drink ideas</Link> for every occasion,
        from <Link to="/weeknight-dinners">weeknight dinners</Link> to{" "}
        <Link to="/holiday-feasts">holiday feasts</Link>.
      </IntroSection>
      <RecipeSearchSection></RecipeSearchSection>
    </div>
  );
};

export default MainPage;
