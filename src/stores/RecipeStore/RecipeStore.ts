import { makeAutoObservable } from "mobx";
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

  constructor() {
    makeAutoObservable(this);
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
