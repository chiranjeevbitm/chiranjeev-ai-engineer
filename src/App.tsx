import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PortfolioScroll from "./pages/PortfolioScroll";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<PortfolioScroll />} />
      </Route>
    </Routes>
  );
}