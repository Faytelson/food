import { useState, useEffect } from "react";
import { getIsFavorite, addToFavorites, removeFromFavorites } from "@api/favorites";
import { type UUID } from "@api/recipes";
import Button from "@components/Button";

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
      try {
        await removeFromFavorites(userId, recipeId);
        setIsFavorite(false);
      } catch (err) {
        if (err) throw err;
      }
    } else {
      try {
        await addToFavorites(userId, recipeId);
        setIsFavorite(true);
      } catch (err) {
        if (err) throw err;
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!userId) return;

    const checkFavorite = async () => {
      setLoading(true);
      const result = await getIsFavorite(userId, recipeId);
      setIsFavorite(result);
      setLoading(false);
    };

    checkFavorite();
  }, [userId, recipeId]);

  return (
    <Button
      styleType={isFavorite ? "light" : "default"}
      loading={loading}
      className={className}
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
