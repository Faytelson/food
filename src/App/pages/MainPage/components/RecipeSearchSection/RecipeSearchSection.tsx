import React, { useState } from "react";
import MultiDropdown, { type Option } from "./MultiDropdown";
import Card, { type CardProps } from "./Card";
import clsx from "clsx";
import styles from "./RecipeSearchSection.module.scss";

export type RecipeSearchSectionProps = {
  className?: string;
};

const fakeCards: CardProps[] = [
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Breakfast",
    title: "Delicious Pancakes with Maple Syrup",
    subtitle: "Fluffy pancakes topped with fresh fruits and a drizzle of maple syrup.",
    contentSlot: "Cook: 15 min",
    actionSlot: <button>View Recipe</button>,
    onClick: () => console.log("Card 1 clicked"),
  },
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Lunch",
    title: "Grilled Chicken Salad",
    subtitle: "Healthy salad with grilled chicken, mixed greens, cherry tomatoes, and vinaigrette.",
    contentSlot: "Cook: 20 min",
    actionSlot: <button>View Recipe</button>,
    onClick: () => console.log("Card 2 clicked"),
  },
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Dinner",
    title: "Spaghetti Carbonara",
    subtitle: "Classic Italian pasta with creamy sauce, pancetta, and parmesan cheese.",
    contentSlot: "Cook: 20 min",
    actionSlot: <button>View Recipe</button>,
    onClick: () => console.log("Card 3 clicked"),
  },
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Dessert",
    title: "Chocolate Lava Cake",
    subtitle: "Rich chocolate cake with a gooey molten center, perfect for chocolate lovers.",
    contentSlot: "Cook: 12 min",
    actionSlot: <button>View Recipe</button>,
    onClick: () => console.log("Card 4 clicked"),
  },
];

// test data
const categories: Option[] = [
  { key: "1", value: "Breakfast" },
  { key: "2", value: "Lunch" },
  { key: "3", value: "Dinner" },
];

const RecipeSearchSection = ({ className }) => {
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  const getTitle = (value: Option[]) => {
    if (value.length === 0) return "Select categories";
    return value.map((v) => v.value).join(", ");
  };

  const handleChange = (value: Option[]) => {
    setSelectedCategories(value);
  };

  return (
    <section className={clsx(className, styles["recipe-search-section"])}>
      <form
        role="search"
        aria-label="Recipe search"
        className={styles["recipe-search-section__form"]}
      >
        <div className={styles["recipe-search-section__search"]}>{/* здесь будет поиск */}</div>
        <div className={styles["recipe-search-section__categories"]}>
          <MultiDropdown
            options={categories}
            value={selectedCategories}
            onChange={handleChange}
            getTitle={getTitle}
          ></MultiDropdown>
        </div>
      </form>

      <section aria-labelledby="search-results">
        <ul className={styles["recipe-search-section__list"]}>
          {fakeCards.map((card) => {
            return (
              <li
                className={styles["recipe-search-section__item"]}
                key={card.title}
              >
                <Card
                  image={card.image}
                  captionSlot={card.captionSlot}
                  title={card.title}
                  subtitle={card.subtitle}
                  contentSlot={card.contentSlot}
                  onClick={card.onClick}
                  actionSlot={card.actionSlot}
                ></Card>
              </li>
            );
          })}
        </ul>
      </section>

      <nav aria-label="Pagination"></nav>
    </section>
  );
};

export default RecipeSearchSection;
