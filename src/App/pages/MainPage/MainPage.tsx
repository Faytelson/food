import React, { useEffect, useCallback, useState } from "react";
import IntroSection from "@components/IntroSection";
import IntroImage from "@assets/images/natalia_intro_lg.jpg";
import ProfileImage from "@assets/images/natalia_about.png";
import PersonProfile from "./components/PersonProfile";
import InfoCardsBlock from "@components/InfoCardsBlock";
import CheckIcon from "@components/icons/CheckIcon";
import HandsWithHeartIcon from "@components/icons/HandsWithHeartIcon";
import HeartIcon from "@components/icons/HeartIcon";
import LadleIcon from "@components/icons/LadleIcon";
import RecipeList from "@components/RecipeList";
import Loader from "@components/Loader";
import ClockIcon from "@components/icons/ClockIcon";
import ToggleFavorite from "@components/ToggleFavorite";
import Button from "@components/Button";
import FormLogin from "@components/FormLogin";
import Text from "@components/Text";
import { Link } from "react-router";
import { fetchNewRecipes } from "@api/newRecipes";
import { type Recipe } from "@api/recipes";
import { type RecipeCard } from "@components/RecipeList";
import { isUUID } from "@utils/isUUID";
import { useAuthContext } from "@context/auth/useAuthContext";
import { useModal } from "@context/modal/useModal";
import styles from "./MainPage.module.scss";
import clsx from "clsx";

export type MainPageProps = {
  className?: string;
};

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { session } = useAuthContext();
  const { openModal } = useModal();

  const getNewRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchNewRecipes();
      if (data) {
        setRecipes(data);
      }
    } catch (err) {
      throw new Error(`Failed to fetch: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewRecipes();
  }, [getNewRecipes]);

  const principles = [
    {
      id: 1,
      text: "Делаю вкусно, по-домашнему",
      icon: (
        <LadleIcon
          width={48}
          height={48}
          color="accent"
        />
      ),
    },
    {
      id: 2,
      text: "Прислушиваюсь к вашим пожеланиям",
      icon: (
        <HandsWithHeartIcon
          width={48}
          height={48}
          color="accent"
        />
      ),
    },
    {
      id: 3,
      text: "Соблюдаю санитарные нормы",
      icon: (
        <CheckIcon
          width={48}
          height={48}
          color="accent"
        />
      ),
    },
    {
      id: 4,
      text: "Храню свою репутацию хорошего кулинара",
      icon: (
        <HeartIcon
          width={40}
          height={40}
          color="accent"
        />
      ),
    },
  ];

  const recipeCards: RecipeCard[] = recipes
    .filter((r) => isUUID(r.documentId))
    .map((r) => {
      return {
        images: r.images,
        captionSlot: (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ClockIcon
              width={15}
              height={15}
              color="accent"
              style={{ position: "relative", top: "-1px" }}
            />
            {r.preparationTime} минут
          </span>
        ),
        title: r.name,
        subtitle: <span dangerouslySetInnerHTML={{ __html: r.summary }}></span>,
        contentSlot: <span>{Math.round(r.calories)} kcal</span>,
        documentId: r.documentId,
      };
    });

  return (
    <div className={clsx(className, styles["main-page"])}>
      {isLoading && (
        <div className={styles["main-page__loader-wrapper"]}>
          <Loader color="var(--color-brand)" />
        </div>
      )}

      <IntroSection image={{ title: "Наталия пробует суп", url: IntroImage }}>
        Я - Наталия Русановская, повар по призванию и по любви. Приглашаю вас окунуться в мир
        кулинарии вместе со мной!
      </IntroSection>

      <section className={styles["main-page__profile"]}>
        <PersonProfile
          imgUrl={ProfileImage}
          imgTitle="Наталья с пирогом собственного производства"
          styleType="reverse"
        >
          <p className={styles["main-page__profile-text"]}>
            С детства я любила готовить. Помню, как стояла на маленьком стуле на кухне у мамы и
            помогала ей резать овощи или замешивать тесто.
          </p>
          <p className={styles["main-page__profile-text"]}>
            Сначала кухня в моей жизни казалась просто увлечением, хобби, но с каждым рецептом, с
            каждым обедом, который я готовила для друзей и семьи, я чувствовала: это доставляет
            радость и мне самой, и людям вокруг. Потом я решила серьезно изучить кулинарию. Я
            поступила в пищевой колледж в Москве и закончила его. Там я получила профессиональные
            знания, но самое главное — я поняла, что готовка стала для меня не просто работой, а
            настоящим призванием. Каждый ингредиент, каждый рецепт — это способ выразить себя,
            заботу и внимание к людям.
          </p>
          <p className={styles["main-page__profile-text"]}>
            С тех пор я живу своей профессией неспешно, спокойно, с любовью к процессу. Не гонюсь за
            модой или трендами, а стараюсь делать то, что близко моему сердцу, что нравится мне и
            тем, кто пробует мои блюда.
          </p>
        </PersonProfile>
      </section>

      <section className={styles["main-page__principles"]}>
        <InfoCardsBlock
          title="Мои принципы: "
          items={principles}
        ></InfoCardsBlock>
      </section>

      <section className={styles["main-page__recipe-section"]}>
        <Text
          tag="h2"
          view="title"
        >
          Посмотрите мои новые рецепты:
        </Text>

        <RecipeList
          items={recipeCards}
          renderAction={(item) =>
            session && isUUID(session.id) ? (
              <ToggleFavorite
                userId={session.id}
                recipeId={item.documentId}
              ></ToggleFavorite>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(
                    <FormLogin title="Войдите в личный кабинет, чтобы сохранять рецепты"></FormLogin>,
                  );
                }}
              >
                Сохранить
              </Button>
            )
          }
        />

        <Link
          to="/recipes"
          className={styles["main-page__link"]}
        >
          Все рецепты
        </Link>
      </section>
    </div>
  );
};

export default MainPage;
