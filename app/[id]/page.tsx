import { fetchRecipeInfo, fetchRecipes } from "../../utils/api";
import Link from "next/link";

interface RecipeInfoPageProps {
  params: { id: string };
}

export default async function RecipeInfoPage({ params }: RecipeInfoPageProps) {
  const id = params.id;

  const { meals } = await fetchRecipeInfo(id);
  const recipe = meals?.[0];

  const sidebar = recipe?.strCategory
    ? await fetchRecipes({ category: recipe.strCategory })
    : { meals: [] };

  const ingredients = Array.from({ length: 20 })
    .map((_, i) => {
      const name = recipe[`strIngredient${i + 1}`];
      const measure = recipe[`strMeasure${i + 1}`];
      return name ? `${name} - ${measure}` : null;
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white text-black p-6 rounded-xl shadow-sm">
      <div className="flex-1">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-xl w-full max-w-md shadow-md"
        />
        <h1 className="text-4xl font-bold mt-4 text-[#5B2A86]">{recipe.strMeal}</h1>

        <Link
          href={`/?area=${recipe.strArea}`}
          className="text-[#5B2A86] hover:underline text-base mt-2 inline-block"
        >
          {recipe.strArea}
        </Link>

        <p className="mt-6 whitespace-pre-line text-base">{recipe.strInstructions}</p>

        <h2 className="mt-8 font-semibold text-2xl text-[#5B2A86]">Ingredients</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {ingredients.map((ing, i) => {
            if (!ing) return null;
            const name = ing.split(" - ")[0];
            return (
              <li key={i}>
                <Link href={`/?ingredient=${name}`} className="text-[#5B2A86] hover:underline">
                  {ing}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="w-64 hidden md:block bg-[#B794F4] p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center text-black">
          More in {recipe.strCategory}
        </h3>
        <ul className="space-y-2">
          {sidebar.meals?.map((meal: any) => (
            <li key={meal.idMeal}>
              <Link
                href={`/?category=${recipe.strCategory}`}
                className="block px-3 py-2 bg-white text-[#5B2A86] rounded hover:bg-[#f3e8ff] hover:underline"
              >
                {meal.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
