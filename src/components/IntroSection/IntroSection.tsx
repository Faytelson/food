import React from "react";
import Text from "@components/Text";
import { type ImageDimensions } from "@app/pages/MainPage/components/PersonProfile";
import styles from "./IntroSection.module.scss";
import clsx from "clsx";

export type IntroImage = {
  dimensions: ImageDimensions;
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
          src={image.dimensions.imgUrl_sm}
          srcSet={`
            ${image.dimensions.imgUrl_xs} 320w,
            ${image.dimensions.imgUrl_sm} 600w,
            ${image.dimensions.imgUrl_lg} 1600w
          `}
          alt={image.title}
          loading="eager"
          className={styles["intro-section__img"]}
          fetchPriority="high"
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
