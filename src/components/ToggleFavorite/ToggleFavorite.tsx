import { useState, useEffect } from "react";
import { getIsFavorite, addToFavorites, removeFromFavorites, type UUID } from "@api/favorites";
import Button from "@components/Button";
import styles from "./ToggleFavorite.module.scss";
import clsx from "clsx";

type ToggleFavoriteProps = {
  userId: UUID;
  recipeId: UUID;
  className?: string;
};

const ToggleFavorite = ({ userId, recipeId, className }: ToggleFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleStatus = async () => {
    setLoading(true);

    if (isFavorite) {
      const result = await removeFromFavorites(userId, recipeId);
      console.log(result);
      setIsFavorite(false);
    } else {
      const result = await addToFavorites(userId, recipeId);
      console.log(result);
      setIsFavorite(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!userId) return;

    const checkFavorite = async () => {
      setLoading(true);
      const result = await getIsFavorite(userId, recipeId);
      console.log(result);
      //   setIsFavorite(result);
      setLoading(false);
    };

    checkFavorite();
  }, [userId, recipeId]);

  return (
    <Button
      styleType={isFavorite ? "light" : "default"}
      className={clsx(className, styles["toggle-favorite"])}
      onClick={(e) => {
        e.stopPropagation();
        toggleStatus();
      }}
    >
      {isFavorite ? "Удалить" : "Сохранить"}
    </Button>
  );
};

export default ToggleFavorite;
