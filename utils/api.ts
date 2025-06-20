export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchRecipes(filters: any = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/recipes?${query}`);
  return res.json();
}

export async function fetchRecipeInfo(id: string) {
  const res = await fetch(`${API_URL}/recipes/info?id=${id}`);
  return res.json();
}