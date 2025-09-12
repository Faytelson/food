import React from "react";
// import { a } from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.scss";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx(styles.header, className)}>
      <a
        href="/"
        className={styles["header__logo"]}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          className={styles["header__logo-img"]}
        />
        <p className={styles["header__logo-text"]}>MyApp</p>
      </a>

      <nav className={styles["header__nav"]}>
        <a
          href="/"
          className={styles["header__nav-item"]}
        >
          Recipes
        </a>
        <a
          href="/"
          className={styles["header__nav-item"]}
        >
          Meals Categories
        </a>
        <a
          href="/"
          className={styles["header__nav-item"]}
        >
          Products
        </a>
        <a
          href="/"
          className={styles["header__nav-item"]}
        >
          Menu Items
        </a>
        <a
          href="/"
          className={styles["header__nav-item"]}
        >
          Meal Planning
        </a>
      </nav>

      <div className={styles["header__tools"]}>
        <button className={styles["header__tool-btn"]}>🔍</button>
        <button className={styles["header__tool-btn"]}>⚙️</button>
      </div>
    </header>
  );
};

export default Header;
