import api from "./axios";
import qs from "qs";

export type RecipeImage = {
  id: number;
  name: string;
  url: string;
};

export type RecipeCategory = {
  id: number;
  documentId?: string;
  title: string;
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
  category?: RecipeCategory;
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

export const getRecipes = async (query = ""): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>(`/recipes${query}`);
  return response.data;
};

export const getRecipeByDocumentId = async (documentId: string) => {
  const query = qs.stringify(
    {
      populate: ["ingradients", "equipments", "directions.image", "images", "category"],
    },
    { encodeValuesOnly: true },
  );

  const response = await api.get(`/recipes/${documentId}?${query}`);
  return response.data;
};
