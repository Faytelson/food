import type React from "react";
import Description from "@components/Description";
import clsx from "clsx";
import styles from "./PersonProfile.module.scss";

export type PersonProfileProps = {
  imgUrl: string;
  imgTitle: string;
  styleType?: "default" | "reverse";
  children?: React.ReactNode;
  className?: string;
};

const PersonProfile = ({
  imgUrl,
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
          src={imgUrl}
          alt={imgTitle}
          loading="eager"
          className={styles["person-profile__img"]}
        />
      </div>

      <Description>{children}</Description>
    </article>
  );
};

export default PersonProfile;
