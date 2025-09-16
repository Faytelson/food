import { type RouteObject } from "react-router";
import App from "@app/App";
import MainPage from "@app/pages/MainPage";
import DetailPage from "@app/pages/DetailPage";

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
        path: "/recipes/:documentId",
        element: <DetailPage />,
      },
    ],
  },
];
