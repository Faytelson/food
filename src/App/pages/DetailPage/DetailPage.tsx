import React, { useEffect } from "react";
import RecipeIntroSection from "./components/RecipeIntroSection";
import styles from "./DetailPage.module.scss";
import clsx from "clsx";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";
import { useParams } from "react-router-dom";
import { getRecipeByDocumentId } from "@api/recipes";
import { observer } from "mobx-react-lite";
import { recipeStore } from "@stores/RecipeStore";

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

export type DirectionText = {
  id: number;
  description: string;
};

const DetailPageBase: React.FC<DetailPageProps> = ({ className }) => {
  // const [loading, setLoading] = useState(true);
  const { documentId } = useParams<{ documentId: string }>();

  useEffect(() => {
    if (!documentId) return;

    recipeStore.setDocumentId(documentId);
    const fetchRecipe = async () => {
      try {
        if (!recipeStore.documentId) throw new Error("ID is missing");
        const data = await getRecipeByDocumentId(recipeStore.documentId);
        const recipe = data.data;
        recipeStore.setRecipe(recipe);

        recipeStore.setRecipeMeta([
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
        recipeStore.setIngredients(ingredientsList);

        recipeStore.setEquipments(recipe.equipments.map((e: EquipmentItem) => e.name));

        const directionsList = recipe.directions.map((d: DirectionText, index: number) => ({
          title: `Step ${index + 1}`,
          content: d.description,
        }));

        recipeStore.setDirections(directionsList);
      } catch (err) {
        throw new Error(`Failed to fetch recipe: ${err}`);
      } finally {
        // setLoading(false);
      }
    };

    fetchRecipe();
  }, [documentId]);

  if (!recipeStore.recipe) return <p>Recipe not found</p>;

  return (
    <div className={clsx(styles["detail-page"], className)}>
      <div className={styles["detail-page__inner"]}>
        <RecipeIntroSection
          title={recipeStore.recipe.name}
          image={recipeStore.recipe.images && recipeStore.recipe.images[0]}
          data={recipeStore.recipeMeta}
          summary={<span dangerouslySetInnerHTML={{ __html: recipeStore.recipe.summary }} />}
        />
        <RecipeDetailSection
          ingredients={recipeStore.ingredients}
          equipments={recipeStore.equipments}
          directions={recipeStore.directions}
        ></RecipeDetailSection>
      </div>
    </div>
  );
};

export const DetailPage = observer(DetailPageBase);
export default DetailPage;
