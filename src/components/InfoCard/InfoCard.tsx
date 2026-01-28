import Text from "@components/Text";
import clsx from "clsx";
import styles from "./InfoCard.module.scss";

export type InfoCardProps = {
  text: string;
  children: React.ReactNode;
  className?: string;
};

const InfoCard = ({ text, children, className }: InfoCardProps) => {
  return (
    <article className={clsx(styles["info-card"], className)}>
      {children}
      <Text
        view="button"
        className={styles["info-card__text"]}
      >
        {text}
      </Text>
    </article>
  );
};

export default InfoCard;
