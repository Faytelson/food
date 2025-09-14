import api from "./axios";

export type RecipeImage = {
  id: number;
  name: string;
  url: string;
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

export const getRecipes = async (query = ""): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>(`/recipes${query}`);
  return response.data;
};
