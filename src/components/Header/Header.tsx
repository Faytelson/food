import React, { useState } from "react";
// import { a } from "react-router-dom";
import Logo from "@components/Logo";
import Navbar from "@components/Navbar";
import ButtonTool from "@components/ButtonTool";
import clsx from "clsx";
import styles from "./Header.module.scss";

type HeaderProps = {
  className?: string;
};

export type Navlink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Recipes", href: "/recipes" },
  { label: "Meals Categories", href: "/meals-categories" },
  { label: "Products", href: "/products" },
  { label: "Menu Items", href: "/menu-items" },
  { label: "Meal Planning", href: "/meal-planning" },
];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const closeNavbar = () => setIsNavbarOpen(false);

  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles["header__inner"]}>
        <Logo className={styles["header__logo"]}>Food Client</Logo>

        <Navbar
          className={clsx(
            styles["header__navbar"],
            isNavbarOpen ? styles["header__navbar_open"] : "",
          )}
          navLinks={navLinks}
          onClick={closeNavbar}
        ></Navbar>

        <div className={styles["header__tools"]}>
          <ButtonTool
            variant="favorite"
            iconProps={{ width: 19, height: 19, color: "accent" }}
            onClick={() => {
              return "added to favorites";
            }}
          ></ButtonTool>
          <ButtonTool
            variant="profile"
            iconProps={{ width: 24, height: 24, color: "accent" }}
            onClick={() => {
              return "open profile";
            }}
          ></ButtonTool>
        </div>

        <button
          className={clsx(
            styles["header__burger"],
            isNavbarOpen ? styles["header__burger_active"] : "",
          )}
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="main-navigation"
          aria-expanded={isNavbarOpen}
          onClick={toggleNavbar}
        >
          <span className={styles["header__burger-line"]}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
