import { type RouteObject } from "react-router";
import App from "@app/App";
import MainPage from "@app/pages/MainPage";
import RecipesPage from "@app/pages/RecipesPage";
import DetailPage from "@app/pages/DetailPage";
import FavoritesPage from "@app/pages/FavoritesPage";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/recipes/:documentId",
        element: <DetailPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
];
