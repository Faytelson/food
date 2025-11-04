import supabase from "./baseClient";

export type RecipeImage = {
  id: number;
  alt: string;
  url: string;
};

export type RecipeCategory = {
  id: number;
  name: string;
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
  images: RecipeImage;
  category: RecipeCategory;
};

export type RecipesResponse = {
  data: Recipe[];
  // meta: {
  //   pagination: {
  //     total: number;
  //     page: number;
  //     pageSize: number;
  //     pageCount: number;
  //   };
  // };
};

export const fetchRecipes = async (category?: number): Promise<Recipe[]> => {
  let query = supabase.from("recipes").select("*, images(*), categories(*)");

  if (category) {
    query = query.eq("category_id", category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};

export const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};

// export const getRecipeByDocumentId = async (documentId: string) => {
//   const query = qs.stringify(
//     {
//       populate: ["ingradients", "equipments", "directions.image", "images", "category"],
//     },
//     { encodeValuesOnly: true },
//   );

//   const response = await api.get(`/recipes/${documentId}?${query}`);
//   return response.data;
// };
