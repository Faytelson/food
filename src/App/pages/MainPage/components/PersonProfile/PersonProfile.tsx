import type React from "react";
import Description from "@components/Description";
import clsx from "clsx";
import styles from "./PersonProfile.module.scss";

export type ImageDimensions = { imgUrl_lg: string; imgUrl_sm: string; imgUrl_xs: string };
export type PersonProfileProps = {
  images: ImageDimensions;
  imgTitle: string;
  styleType?: "default" | "reverse";
  children?: React.ReactNode;
  className?: string;
};

const PersonProfile = ({
  images,
  imgTitle,
  styleType = "default",
  children,
  className,
}: PersonProfileProps) => {
  return (
    <article
      className={clsx(
        styles["person-profile"],
        className,
        styleType === "reverse" ? styles["person-profile_reverse"] : "",
      )}
    >
      <div className={styles["person-profile__img-container"]}>
        <img
          src={images.imgUrl_lg}
          srcSet={`
            ${images.imgUrl_xs} 320w,
            ${images.imgUrl_sm} 768w,
            ${images.imgUrl_lg} 1200w
          `}
          alt={imgTitle}
          loading="lazy"
          className={styles["person-profile__img"]}
        />
      </div>

      <Description>{children}</Description>
    </article>
  );
};

export default PersonProfile;
