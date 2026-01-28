import Text from "@components/Text";
import clsx from "clsx";
import styles from "./Footer.module.scss";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles["footer__container"]}>
        <Text className={styles["footer__info"]} >Блог Натальи Русановой, 2018 - 2026.</Text>
        <Text className={styles["footer__info"]}>Макет: KTS, разработка: Darya Faytelson.</Text>
      </div>
    </footer>
  );
};

export default Footer;
