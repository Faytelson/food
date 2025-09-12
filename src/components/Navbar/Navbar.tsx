import React from "react";
import Text from "@components/Text";
import styles from "./Navbar.module.scss";
import clsx from "clsx";

export type NavLink = {
  label: string;
  href: string;
};

export type NavbarProps = {
  className?: string;
  navLinks: NavLink[];
  onClick: () => void;
};

const Navbar = ({ className, navLinks, onClick }: NavbarProps) => {
  return (
    <nav className={clsx(className, styles.navbar)}>
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={styles["navbar__link"]}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <Text
            className={styles["navbar__text"]}
            view="p-16"
            weight="medium"
            color="primary"
          >
            {link.label}
          </Text>
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
