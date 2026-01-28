import supabase from "./baseClient";

export type UUID = string & { readonly __brand: unique symbol };

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
  documentId: UUID;
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
  total: number;
};

export const fetchRecipes = async (
  category?: string | null,
  search?: string,
  page: number = 1,
  pageSize: number = 12,
): Promise<RecipesResponse> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("recipes").select("*, images(*), categories(*)", { count: "exact" });
  if (category) {
    query = query.eq("category_id", category);
  }
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(`${error}`);
  }
  const totalPages = count ? Math.ceil(count / pageSize) : 1;

  return { data: data, total: totalPages };
};

export const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};

export const fetchRecipeNames = async (query: string) => {
  const { data, error } = await supabase
    .from("recipe_names")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};

export const getRecipeByDocumentId = async (documentId: UUID) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*, recipe_detail(*), images(*), categories(*)")
    .eq("documentId", documentId)
    .single();

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};
