import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ConfigProvider } from "antd";
import DashBoard from "./components/DashBoard";
import ProductDetailPage from "./components/ProductDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/DashBoard" element={<DashBoard />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;
