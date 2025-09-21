import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./Favorites.module.scss";
import { favoritesStore } from "@stores/FavoritesStore";

import Text from "@components/Text";
import ButtonBack from "@components/ButtonBack";

export type FavoritesPageProps = {
  className?: string;
};

const Favorites: React.FC<FavoritesPageProps> = ({ className }) => {
  useEffect(() => {
    favoritesStore.fetchFavorites();
  }, []);

  useEffect(() => {}, []);

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
          {favoritesStore.favorites.map((f) => {
            return (
              <div
                key={f.id}
                className={styles["favorites__item"]}
              >
                {f.id} {f.recipe}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
