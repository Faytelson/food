import React, { useState, useEffect } from "react";
import RecipeIntroSection from "./components/RecipeIntroSection";
import styles from "./DetaiPage.module.scss";
import clsx from "clsx";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";
import { useParams } from "react-router-dom";
import { getRecipeByDocumentId } from "@api/recipes";

export type DetailPageProps = {
  className?: string;
};

const DetailPage: React.FC<DetailPageProps> = ({ className }) => {
  const { documentId } = useParams<{ documentId: string }>();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipeMeta, setRecipeMeta] = useState<{ term: string; description: string }[]>([]);
  const [ingredients, setIngredients] = useState(null);
  const [equipments, setEquipments] = useState(null);
  const [directions, setDirections] = useState(null);
  // const [summary, setSummary] = useState<React.ReactNode>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeByDocumentId(documentId);
        const recipe = data.data;
        setRecipe(recipe);

        setRecipeMeta([
          { term: "Preparation", description: `${recipe.preparationTime ?? "—"} minutes` },
          { term: "Cooking", description: `${recipe.cookingTime ?? "—"} minutes` },
          { term: "Total", description: `${recipe.totalTime ?? "—"} minutes` },
          { term: "Likes", description: recipe.likes ?? "—" },
          { term: "Servings", description: `${recipe.servings ?? "—"} servings` },
          { term: "Rating", description: recipe.rating ? `${recipe.rating}/5` : "—" },
        ]);

        const ingredientsList = recipe.ingradients.map((i) => {
          const unitPart = i.unit ? ` ${i.unit}` : "";
          return `${i.amount}${unitPart} ${i.name}`;
        });
        setIngredients(ingredientsList);

        setEquipments(recipe.equipments.map((e) => e.name));

        const directionsList = recipe.directions.map((d, index) => ({
          title: `Step ${index + 1}`,
          content: d.description,
        }));
        setDirections(directionsList);
        // setSummary(recipe.summary);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [documentId]);

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className={clsx(styles["detail-page"], className)}>
      <div className={styles["detail-page__inner"]}>
        <RecipeIntroSection
          title={recipe.name}
          image={recipe.images[0]}
          data={recipeMeta}
          summary={<span dangerouslySetInnerHTML={{ __html: recipe.summary }} />}
        />
        <RecipeDetailSection
          ingredients={ingredients}
          equipments={equipments}
          directions={directions}
        ></RecipeDetailSection>
      </div>
    </div>
  );
};

export default DetailPage;
