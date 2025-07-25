import { Route, Routes, Outlet } from "react-router-dom";
import Header from "../components/header";
import MainPage from "../pages/MainPage";
import CoffeesPage from "../pages/CoffeesPage";
import IngredientsPage from "../pages/IngredientsPage";
import DetailedCoffeePage from "../pages/DetailedCoffeePage";
import DetailedIngredientPage from "../pages/DetailedIngredientPage";


const LayoutWithHeader = () => (
  <>
    <Header />
    <main><Outlet /></main>
  </>
);


const LayoutWithoutHeader = () => (
  <main><Outlet /></main>
);

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutWithHeader />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/coffees" element={<CoffeesPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Route>

      <Route element={<LayoutWithoutHeader />}>
        <Route path="/coffees/:id" element={<DetailedCoffeePage />} />
        <Route path="/ingredients/:id" element={<DetailedIngredientPage/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;
