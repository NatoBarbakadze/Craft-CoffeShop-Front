import { Route, Routes, Outlet } from "react-router-dom";
import Header from "../components/header";
import MainPage from "../pages/MainPage";



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
      </Route>
    </Routes>
  );
};

export default AppRouter;
