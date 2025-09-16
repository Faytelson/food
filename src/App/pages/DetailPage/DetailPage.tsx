import React, { useState, useEffect } from "react";
import RecipeIntroSection from "./components/RecipeIntroSection";
import styles from "./DetailPage.module.scss";
import clsx from "clsx";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";
import { useParams } from "react-router-dom";
import { getRecipeByDocumentId, type Recipe } from "@api/recipes";

export type DetailPageProps = {
  className?: string;
};

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

export type EquipmentItem = {
  id: number;
  name: string;
};

export type Direction = {
  title: string;
  content: string;
};

const DetailPage: React.FC<DetailPageProps> = ({ className }) => {
  const { documentId } = useParams<{ documentId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // const [loading, setLoading] = useState(true);
  const [recipeMeta, setRecipeMeta] = useState<{ term: string; description: string }[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!documentId) throw new Error("ID is missing");
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

        const ingredientsList = recipe.ingradients.map((i: Ingredient) => {
          const unitPart = i.unit ? ` ${i.unit}` : "";
          return `${i.amount}${unitPart} ${i.name}`;
        });
        setIngredients(ingredientsList);

        setEquipments(recipe.equipments.map((e: EquipmentItem) => e.name));

        const directionsList = recipe.directions.map((d: Direction, index: number) => ({
          title: `Step ${index + 1}`,
          content: d.description,
        }));

        setDirections(directionsList);
        // setSummary(recipe.summary);
      } catch (err) {
        throw new Error(`Failed to fetch recipe: ${err}`);
      } finally {
        // setLoading(false);
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
          image={recipe.images && recipe.images[0]}
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
