import React, { useState } from "react";
import Logo from "@components/Logo";
import Navbar, { type NavLink } from "@components/Navbar";
import ButtonOpenModal from "@components/ButtonOpenModal";
import ProfileIcon from "@components/icons/ProfileIcon";
import ProfileSuccessIcon from "@components/icons/ProfileSuccessIcon";
import AuthGate from "@components/AuthGate";
import { useAuthContext } from "@context/auth/useAuthContext";
import clsx from "clsx";
import styles from "./Header.module.scss";

type HeaderProps = {
  className?: string;
};

const navLinks: NavLink[] = [{ label: "Рецепты", href: "/" }];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { session } = useAuthContext();

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
          <AuthGate />
          {session ? (
            <ButtonOpenModal
              modalType="logout"
              icon={
                <ProfileSuccessIcon
                  width={24}
                  height={24}
                  color="accent"
                />
              }
            />
          ) : (
            <ButtonOpenModal
              modalType="login"
              icon={
                <ProfileIcon
                  width={24}
                  height={24}
                  color="accent"
                />
              }
            />
          )}
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
