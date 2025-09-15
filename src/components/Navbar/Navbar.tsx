import React from "react";
import Text from "@components/Text";
import { NavLink } from "react-router";
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
        <NavLink
          key={link.label}
          to={link.href}
          className={({ isActive }) =>
            clsx(styles["navbar__link"], { [styles["navbar__link_active"]]: isActive })
          }
          onClick={onClick}
        >
          <Text
            className={styles["navbar__text"]}
            view="p-16"
            weight="medium"
          >
            {link.label}
          </Text>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
