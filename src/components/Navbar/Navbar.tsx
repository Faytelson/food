import React from "react";
import Text from "@components/Text";
import { Link } from "react-router";
import styles from "./Navbar.module.scss";
import clsx from "clsx";

export type NavLink = {
  label: string;
  href: string;
};

export type NavbarProps = {
  className?: string;
  navLinks: NavLink[];
};

const Navbar = ({ className, navLinks }: NavbarProps) => {
  return (
    <nav className={clsx(className, styles.navbar)}>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={styles["navbar__link"]}
        >
          <Text
            className={styles["navbar__text"]}
            view="p-16"
            weight="medium"
            color="primary"
          >
            {link.label}
          </Text>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
