import { Outlet } from "react-router";
import Header from "@components/Header";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={styles["app-layout"]}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
