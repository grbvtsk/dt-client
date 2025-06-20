"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../utils/api";
import { useSearchParams } from "next/navigation";

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [title, setTitle] = useState("All Recipes");

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const area = searchParams.get("area");
  const ingredient = searchParams.get("ingredient");

  useEffect(() => {
    const filters: Record<string, string> = {};
    if (category) {
      filters.category = category;
      setTitle(`Recipes in category: ${category}`);
    } else if (area) {
      filters.area = area;
      setTitle(`Recipes from: ${area}`);
    } else if (ingredient) {
      filters.ingredient = ingredient;
      setTitle(`Recipes with: ${ingredient}`);
    } else {
      setTitle("All Recipes");
    }

    fetchRecipes(filters).then((data) => setRecipes(data.meals || []));
  }, [category, area, ingredient]);

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-[#5B2A86]">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((meal) => (
          <Link href={`/${meal.idMeal}`} key={meal.idMeal}>
            <div className="bg-[#f8f0ff] hover:bg-[#ebd9ff] border border-[#5B2A86] rounded-xl p-4 cursor-pointer shadow-sm transition duration-200">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-xl w-full object-cover shadow-md"
              />
              <h2 className="mt-3 font-semibold text-[#5B2A86] text-lg">
                {meal.strMeal}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
