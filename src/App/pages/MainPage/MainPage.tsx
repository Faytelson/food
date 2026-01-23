import React from "react";
import styles from "./MainPage.module.scss";
import clsx from "clsx";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return <div className={clsx(className, styles["main-page"])}>Главная страница</div>;
};

export default MainPage;
