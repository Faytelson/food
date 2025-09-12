import React from "react";
import Text from "@components/Text";
import styles from "./PageIntro.module.scss";
import clsx from "clsx";

export type ImageVariant = {
  avif?: string;
  webp?: string;
  fallback: string;
};

export type IntroImage = {
  sm: ImageVariant;
  lg: ImageVariant;
  title: string;
};

export type PageIntroProps = {
  className?: string;
  image: IntroImage;
  children: React.ReactNode;
};

const PageIntro: React.FC<PageIntroProps> = ({ className, image, children }) => {
  return (
    <section className={clsx(className, styles["page-intro"])}>
      <div className={styles["page-intro__img-container"]}>
        <picture className={styles["page-intro__picture"]}>
          {/* mobile */}
          {image.sm.avif && (
            <source
              media="(max-width: 424px)"
              type="image/avif"
              srcSet={image.sm.avif}
            />
          )}
          {image.sm.webp && (
            <source
              media="(max-width: 424px)"
              type="image/webp"
              srcSet={image.sm.webp}
            />
          )}
          <source
            media="(max-width: 424px)"
            srcSet={image.sm.fallback}
          />

          {/* desktop */}
          {image.sm.avif && (
            <source
              media="(min-width: 425px)"
              type="image/avif"
              srcSet={image.lg.avif}
            />
          )}
          {image.sm.webp && (
            <source
              media="(min-width: 425px)"
              type="image/webp"
              srcSet={image.lg.webp}
            />
          )}
          <img
            src={image.lg.fallback}
            alt={image.title}
            loading="eager"
            className={styles["page-intro__img"]}
          />
        </picture>
      </div>
      <Text
        tag="h1"
        view="p-20"
        className={styles["page-intro__title"]}
      >
        {children}
      </Text>
    </section>
  );
};

export default PageIntro;
