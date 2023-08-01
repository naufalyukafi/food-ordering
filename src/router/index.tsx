import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { DashboardBroken, PokemonDetails, PokemonGrid } from "../components";
import FoodCard from "../components/FoodCard";
import Home from "../pages/Home";

const RootPage = lazy(
  () => import(/* webpackChunkName: 'RootPage' */ "../pages/RootPage")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <DashboardBroken />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Dashboard Skeleton</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<div>Details Skeleton</div>}>
            <PokemonDetails />
          </Suspense>
        ),
      },
    ],
  },
]);
