// src/api/recipes.ts
import api from "./axios";

export type RecipeImage = {
  id: number;
  name: string;
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
  };
};

export type Recipe = {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  rating: number;
  calories: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  likes: number;
  vegetarian: boolean;
  images?: RecipeImage[];
};

export type RecipesResponse = {
  data: Recipe[];
  meta: {
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  };
};

export const getRecipes = async (page = 1, pageSize = 10): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>("/recipes", {
    params: {
      populate: ["images"],
      pagination: { page, pageSize },
    },
  });
  return response.data;
};
