import { Route, Routes, Outlet } from "react-router-dom";
import Header from "../components/header";
import MainPage from "../pages/MainPage";
import CoffeesPage from "../pages/CoffeesPage";
import IngredientsPage from "../pages/IngredientsPage";



const LayoutWithHeader = () => (
  <>
    <Header />
    <main><Outlet /></main>
  </>
);


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutWithHeader />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/coffees" element={<CoffeesPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
