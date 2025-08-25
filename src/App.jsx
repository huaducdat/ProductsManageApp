import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ConfigProvider } from "antd";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/DashBoard" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
