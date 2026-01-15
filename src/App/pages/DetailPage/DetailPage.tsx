import React, { useState, useEffect } from "react";
import RecipeIntroSection from "./components/RecipeIntroSection";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";
import { type RecipeDirectionType } from "./components/RecipeDetailSection/RecipeDirections";
import Loader from "@components/Loader";
import Text from "@components/Text";
import styles from "./DetailPage.module.scss";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getRecipeByDocumentId, type Recipe } from "@api/recipes";

export type DetailPageProps = {
  className?: string;
};

export type Ingredient = {
  ingredient: string;
  amount: number;
  unit: string;
};

export type Direction = {
  step: number;
  instruction: string;
};

export type Ingredients = Ingredient[];

export type Equipment = string[];

export type Directions = RecipeDirectionType[];

const DetailPage: React.FC<DetailPageProps> = ({ className }) => {
  const { documentId } = useParams<{ documentId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeMeta, setRecipeMeta] = useState<{ term: string; description: string }[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [directions, setDirections] = useState<RecipeDirectionType[]>([]);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        if (!documentId) throw new Error("ID is missing");
        const data = await getRecipeByDocumentId(documentId);
        const recipe = data;
        setRecipe(recipe);

        setRecipeMeta([
          { term: "Подготовка", description: `${recipe.preparationTime ?? "—"} минут` },
          { term: "Время приготовления", description: `${recipe.cookingTime ?? "—"} минут` },
          { term: "Общее время", description: `${recipe.totalTime ?? "—"} минут` },
          { term: "Лайки", description: recipe.likes ?? "—" },
          { term: "Количество порций", description: `${recipe.servings ?? "—"}` },
          { term: "Оценка", description: recipe.rating ? `${recipe.rating}/5` : "—" },
        ]);

        const details = recipe.recipe_detail[0];

        const ingredientsList = details.ingredients.map((i: Ingredient) => {
          const unitPart = i.unit ? ` ${i.unit}` : "";
          return `${i.amount}${unitPart} ${i.ingredient}`;
        });
        setIngredients(ingredientsList);
        setEquipments(details.equipment);
        setDescription(details.description.text);

        const directionsList = details.directions.map((d: Direction) => ({
          title: `Step ${d.step}`,
          content: d.instruction,
        }));

        setDirections(directionsList);
      } catch (err) {
        throw new Error(`Failed to fetch recipe: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [documentId]);

  return (
    <div className={clsx(styles["detail-page"], className)}>
      <div className={styles["detail-page__inner"]}>
        {isLoading ? (
          <div className={styles["detail-page__loader-wrapper"]}>
            <Loader color="var(--color-brand)" />
          </div>
        ) : !recipe ? (
          <Text
            tag="p"
            view="p-20"
            color="primary"
          >
            Рецептов не найдено
          </Text>
        ) : (
          <>
            <RecipeIntroSection
              title={recipe.name}
              image={recipe.images}
              data={recipeMeta}
              summary={<span dangerouslySetInnerHTML={{ __html: description }} />}
            />
            <RecipeDetailSection
              ingredients={ingredients}
              equipments={equipments}
              directions={directions}
            ></RecipeDetailSection>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
