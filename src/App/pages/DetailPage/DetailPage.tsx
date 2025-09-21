import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { recipeStore } from "@stores/RecipeStore";
import styles from "./DetailPage.module.scss";
import clsx from "clsx";

import RecipeIntroSection from "./components/RecipeIntroSection";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";

export type DetailPageProps = {
  className?: string;
};

const DetailPageBase: React.FC<DetailPageProps> = ({ className }) => {
  const { documentId } = useParams<{ documentId: string }>();

  useEffect(() => {
    if (!documentId) return;

    recipeStore.setDocumentId(documentId);
    recipeStore.fetchRecipeById();
  }, [documentId]);

  if (!recipeStore.recipe) return <p>Recipe not found</p>;

  return (
    <div className={clsx(styles["detail-page"], className)}>
      <div className={styles["detail-page__inner"]}>
        <RecipeIntroSection
          title={recipeStore.recipe.name}
          image={recipeStore.recipe.images && recipeStore.recipe.images[0]}
          data={recipeStore.recipeMeta}
          summary={<span dangerouslySetInnerHTML={{ __html: recipeStore.recipe.summary }} />}
        />
        <RecipeDetailSection
          ingredients={recipeStore.ingredients}
          equipments={recipeStore.equipments}
          directions={recipeStore.directions}
        ></RecipeDetailSection>
      </div>
    </div>
  );
};

export const DetailPage = observer(DetailPageBase);
export default DetailPage;
