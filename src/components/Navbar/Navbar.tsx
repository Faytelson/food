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
  onClick: () => void;
};

const Navbar = ({ className, navLinks, onClick }: NavbarProps) => {
  return (
    <nav className={clsx(className, styles.navbar)}>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={styles["navbar__link"]}
          onClick={onClick}
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
