import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { PATHS } from "../variables";

const Home = lazy(() => import("../pages/public/Home"));
const Psychologists = lazy(() => import("../pages/public/Psychologists"));
const Favourites = lazy(() => import("../pages/private/Favorites"));
const NotFound = lazy(() => import("../pages/public/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={PATHS.home} element={<Home />}></Route>
        <Route path={PATHS.psychologists} element={<Psychologists />}></Route>
        <Route path={PATHS.favourites} element={<Favourites />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}
