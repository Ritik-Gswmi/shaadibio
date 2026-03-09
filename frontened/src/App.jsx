import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { BiodataProvider } from "./context/BiodataContext";

function App() {
  return (
    <BiodataProvider>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BiodataProvider>
  );
}

export default App;