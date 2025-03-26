import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-left" />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta por defecto - Redireccionar a login */}
        <Route path="/" element={<Login />} />

        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
