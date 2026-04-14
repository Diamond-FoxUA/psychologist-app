import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { PATHS } from "../variables";

import App from "../App";
const Home = lazy(() => import("../pages/Home"));
const Psychologists = lazy(() => import("../pages/Psychologists"));
const Favourites = lazy(() => import("../pages/Favorites"));
const NotFound = lazy(() => import("../pages/NotFound"));

import PulseLoader from "../context/PulseLoader/PulseLoader";

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          <PulseLoader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path={PATHS.psychologists} element={<Psychologists />}></Route>
          <Route path={PATHS.favourites} element={<Favourites />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
