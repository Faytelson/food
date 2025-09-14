import React from "react";
import RecipeComponentList from "./RecipeComponentsList";
import RecipeDirections from "./RecipeDirections";
import clsx from "clsx";
import styles from "./RecipeDetailSection.module.scss";

type RecipeDetailSectionProps = {
  className?: string;
};

const RecipeDetailSection: React.FC<RecipeDetailSectionProps> = ({ className }) => {
  // test
  // Лист 1: ингредиенты
  const fakeIngredients = [
    "1 1/2 tsps baking powder 12 pcs",
    "2 cups sugar 1 pcs",
    "3 cups flour 1 pcs",
    "1 tsp salt 1 pcs",
    "200 g butter 1 pcs",
    "1 cup milk 1 pcs",
  ];

  // Лист 2: вспомогательные предметы
  const fakeSupplies = [
    "Plastic Wrap 6 pcs",
    "Baking Sheet 2 pcs",
    "Mixing Bowl 3 pcs",
    "Whisk 1 pcs",
    "Measuring Cups 4 pcs",
    "Spatula 2 pcs",
  ];

  const fakeDirections = [
    {
      title: "Step 1",
      content: "Preheat the oven to 180°C (350°F) and line a baking tray with parchment paper.",
    },
    {
      title: "Step 2",
      content:
        "In a large bowl, whisk together flour, baking powder, and salt until well combined.",
    },
    {
      title: "Step 3",
      content: "In a separate bowl, beat the butter and sugar until light and fluffy.",
    },
    {
      title: "Step 4",
      content: "Gradually add the eggs, mixing well after each addition.",
    },
    {
      title: "Step 5",
      content:
        "Fold the dry ingredients into the wet mixture, then pour the batter into the prepared tray.",
    },
    {
      title: "Step 6",
      content:
        "Bake for 40–45 minutes or until a toothpick inserted into the center comes out clean.",
    },
  ];

  return (
    <section className={clsx(styles.recipeDetailSection, className)}>
      <RecipeComponentList
        title="Ingredients"
        items={fakeIngredients}
      ></RecipeComponentList>
      <RecipeComponentList
        title="Equipment"
        items={fakeSupplies}
      ></RecipeComponentList>

      <RecipeDirections items={fakeDirections} />
    </section>
  );
};

export default RecipeDetailSection;
