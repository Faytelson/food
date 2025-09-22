import { makeAutoObservable, runInAction } from "mobx";
import { getRecipeByDocumentId } from "@api/recipes";
import { type Recipe } from "@api/recipes";

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

export type RecipeMeta = {
  term: string;
  description: string;
};

class RecipeStore {
  recipe: Recipe | null = null;
  recipeMeta: RecipeMeta[] = [];
  ingredients: string[] = [];
  equipments: string[] = [];
  directions: Direction[] = [];
  documentId: string = "";
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRecipeById() {
    if (!this.documentId) {
      throw new Error("ID is missing");
    }

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data = await getRecipeByDocumentId(this.documentId);
      const recipe = data.data;

      runInAction(() => {
        this.setRecipe(recipe);

        this.setRecipeMeta([
          {
            term: "Preparation",
            description: `${recipe.preparationTime ?? "—"} minutes`,
          },
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
        this.setIngredients(ingredientsList);

        this.setEquipments(recipe.equipments.map((e: EquipmentItem) => e.name));

        const directionsList = recipe.directions.map((d: DirectionText, index: number) => ({
          title: `Step ${index + 1}`,
          content: d.description,
        }));

        this.setDirections(directionsList);
      });
    } catch (err) {
      throw new Error(`Failed to fetch recipe: ${err}`);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setRecipe(recipe: Recipe | null) {
    this.recipe = recipe;
  }

  setRecipeMeta(meta: RecipeMeta[]) {
    this.recipeMeta = meta;
  }

  setIngredients(ingredients: string[]) {
    this.ingredients = ingredients;
  }

  setEquipments(equipments: string[]) {
    this.equipments = equipments;
  }

  setDirections(directions: Direction[]) {
    this.directions = directions;
  }

  setDocumentId(id: string) {
    this.documentId = id;
  }
}

export const recipeStore = new RecipeStore();
