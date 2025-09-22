import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { recipeStore } from "@stores/RecipeStore";
import styles from "./DetailPage.module.scss";
import clsx from "clsx";

import RecipeIntroSection from "./components/RecipeIntroSection";
import RecipeDetailSection from "./components/RecipeDetailSection/RecipeDetailSection";
import Loader from "@components/Loader";

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

  return (
    <section className={clsx(styles["detail-page"], className)}>
      {recipeStore.isLoading ? (
        <div className={styles["detail-page__loader"]}>
          <Loader size="l"></Loader>
        </div>
      ) : (
        <div className={styles["detail-page__inner"]}>
          <RecipeIntroSection
            title={recipeStore.recipe?.name || "Unknown Recipe"}
            image={recipeStore.recipe?.images && recipeStore.recipe.images[0]}
            data={recipeStore.recipeMeta}
            summary={
              <span
                dangerouslySetInnerHTML={{
                  __html: recipeStore.recipe?.summary ?? "Summary not available",
                }}
              />
            }
          />
          <RecipeDetailSection
            ingredients={recipeStore.ingredients}
            equipments={recipeStore.equipments}
            directions={recipeStore.directions}
          ></RecipeDetailSection>
        </div>
      )}
    </section>
  );
};

export const DetailPage = observer(DetailPageBase);
export default DetailPage;
