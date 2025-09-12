import React from "react";
import PageIntro from "./components/PageIntro";
import Header from "@components/Header";
import styles from "./MainPage.module.scss";
import clsx from "clsx";
import { foodPageIntro } from "./images";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles["main-page"])}>
      <main className={styles["main-page__content"]}>
        <Header></Header>
        <PageIntro image={foodPageIntro}>
          Find the perfect food and <a href="#">drink ideas</a> for every occasion, from{" "}
          <a href="#">weeknight dinners</a> to <a href="#">holiday feasts</a>.
        </PageIntro>
      </main>
    </div>
  );
};

export default MainPage;
