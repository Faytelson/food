import React from "react";
import IntroSection from "./components/IntroSection";
import SearchSection from "./components/SearchSection";
import styles from "./MainPage.module.scss";
import clsx from "clsx";
import { Link } from "react-router";
import IntroImage from "@assets/images/food_page_intro_lg.png";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles["main-page"])}>
      <IntroSection image={{ title: 'Main Intro', url: IntroImage }}>
        Find the perfect food and <Link to="/drink-ideas">drink ideas</Link> for every occasion,
        from <Link to="/weeknight-dinners">weeknight dinners</Link> to{" "}
        <Link to="/holiday-feasts">holiday feasts</Link>.
      </IntroSection>
      <SearchSection />
    </div>
  );
};

export default MainPage;
