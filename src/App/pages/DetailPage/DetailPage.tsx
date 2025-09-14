import React from "react";
import RecipeIntroSection from "./components/RecipeIntroSection";
import styles from "./DetaiPage.module.scss";
import clsx from "clsx";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";

export type DetailPageProps = {
  className?: string;
};

const DetailPage: React.FC<DetailPageProps> = ({ className }) => {
  return (
    <div className={clsx(styles["detail-page"], className)}>
      <RecipeIntroSection />
      <RecipeDetailSection></RecipeDetailSection>
    </div>
  );
};

export default DetailPage;
