import React from "react";
import Text from "@components/Text";
import styles from "./IntroSection.module.scss";
import clsx from "clsx";

export type IntroImage = {
  url: string
  title: string;
};

export type IntroSectionProps = {
  className?: string;
  image: IntroImage;
  children: React.ReactNode;
};

const IntroSection: React.FC<IntroSectionProps> = ({ className, image, children }) => {
  return (
    <section className={clsx(className, styles["intro-section"])}>
      <div className={styles["intro-section__img-container"]}>
        <img
          src={image.url}
          alt={image.title}
          loading="eager"
          className={styles["intro-section__img"]}
        />
      </div>
      <Text
        tag="h1"
        view="p-20"
        className={styles["intro-section__title"]}
      >
        {children}
      </Text>
    </section>
  );
};

export default IntroSection;
