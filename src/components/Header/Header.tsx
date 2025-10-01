import React, { useState } from "react";
import { authStore } from "@stores/AuthStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import clsx from "clsx";
import styles from "./Header.module.scss";

import Logo from "@components/Logo";
import Navbar, { type NavLinkType } from "@components/Navbar";
import Modal from "@components/Modal";
import Text from "@components/Text";
import HeartIcon from "@assets/icons/heart.svg?react";
import ProfileIcon from "@assets/icons/user.svg?react";

type HeaderProps = {
  className?: string;
};

const navLinks: NavLinkType[] = [
  { label: "Recipes", href: "/" },
  { label: "Meals Categories", href: "/meals-categories" },
  { label: "Products", href: "/products" },
  { label: "Menu Items", href: "/menu-items" },
  { label: "Meal Planning", href: "/meal-planning" },
];

const HeaderBase: React.FC<HeaderProps> = ({ className }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const closeNavbar = () => setIsNavbarOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <Link
            to="/favorites"
            className={styles["header__tool-btn"]}
          >
            <HeartIcon />
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className={styles["header__tool-btn"]}
          >
            <ProfileIcon />
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {authStore.isAuth && (
            <>
              <p className={styles["reg-title"]}>Signed as {authStore.user?.username}</p>
              <button
                className={styles["reg-button"]}
                onClick={() => authStore.logout()}
              >
                Logout
              </button>
            </>
          )}

          {!authStore.isAuth && (
            <div className={styles["auth-forms"]}>
              <div>
                <Text
                  color="primary"
                  tag="h3"
                  weight="medium"
                  view="title"
                  className={styles["form-title"]}
                >
                  Register
                </Text>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const username = (e.currentTarget.username as HTMLInputElement).value;
                    const email = (e.currentTarget.email as HTMLInputElement).value;
                    const password = (e.currentTarget.password as HTMLInputElement).value;
                    authStore.register(username, email, password);
                  }}
                >
                  <input
                    className={styles.username}
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <input
                    className={styles.email}
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    className={styles.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />

                  <button
                    className={styles["button"]}
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </div>

              <div>
                <Text
                  tag="h4"
                  view="p-20"
                  color="primary"
                  weight="medium"
                >
                  Have an account?
                </Text>
                <Text
                  color="primary"
                  tag="h3"
                  weight="medium"
                  view="title"
                  className={styles["form-title"]}
                >
                  Login
                </Text>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const username = (e.currentTarget.username as HTMLInputElement).value;
                    const password = (e.currentTarget.password as HTMLInputElement).value;
                    authStore.login(username, password);
                  }}
                >
                  <input
                    className={styles.username}
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <input
                    className={styles.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />

                  <button
                    className={styles["button"]}
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          )}
        </Modal>

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

const Header = observer(HeaderBase);
export default Header;
