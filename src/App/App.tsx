import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import MainPage from "@app/pages/MainPage";
// import DetailPage from "@app/pages/DetailPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<MainPage />}
          ></Route>
          <Route
            path="/detail"
            element={<div>element detail-page</div>}
          ></Route>
          <Route
            path="/recipes"
            element={<div>element Recipes</div>}
          ></Route>
          <Route
            path="/meals-categories"
            element={<div>element Meals Categories</div>}
          ></Route>
          <Route
            path="/products"
            element={<div>Products</div>}
          ></Route>
          <Route
            path="/menu-items"
            element={<div>element Menu Items</div>}
          ></Route>
          <Route
            path="/meal-planning"
            element={<div>element Meal Planning</div>}
          ></Route>
          <Route
            path="/drink-ideas"
            element={<div>element drink ideas</div>}
          ></Route>
          <Route
            path="/weeknight-dinners"
            element={<div>element weeknight dinners</div>}
          ></Route>
          <Route
            path="/holiday-feasts"
            element={<div>element holiday feasts</div>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
