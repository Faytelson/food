import React from "react";
import clsx from "clsx";
import styles from "./Favorites.module.scss";
import { favoritesStore } from "@stores/FavoritesStore";

import Text from "@components/Text";
import ButtonBack from "@components/ButtonBack";
import CardList from "../MainPage/components/SearchSection/CardList";
import { observer } from "mobx-react-lite";

export type FavoritesPageProps = {
  className?: string;
};

const FavoritesBase: React.FC<FavoritesPageProps> = ({ className }) => {
  return (
    <section className={clsx(styles["favorites"], className)}>
      <div className={styles["favorites__inner"]}>
        <div className={styles["favorites__header"]}>
          <ButtonBack />
          <Text
            tag="h1"
            color="primary"
            weight="bold"
            view="title"
          >
            Favorites
          </Text>
        </div>

        <div className={styles["favorites__list"]}>
          <CardList recipes={favoritesStore.favorites.map((f) => f.recipe)}></CardList>
        </div>
      </div>
    </section>
  );
};

const Favorites = observer(FavoritesBase);
export default Favorites;
