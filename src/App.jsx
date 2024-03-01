import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext"; // Importar ProductProvider
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/footer/Footer";
import NavbarV1 from "./components/navbar/NavbarV1";
import NavbarV2 from "./components/navbar/NavbarV2";
import ListadoDeProd from "./pages/ListadoDeProd";
import Admin from "./pages/Admin";
import ProtectedRouteAdmin from "./protectedRoute/ProtectedRouteAdmin";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Profile from "./pages/Profile";
import Menu from "./components/Admin/Menu"; // Asegúrate de importar Menu correctamente

const App = () => {
  return (
    <UserProvider>
      <ProductProvider> {/* Envolver en ProductProvider */}
        <BrowserRouter>
          {/* <NavbarV1 /> */}
          {/* <NavbarV2 /> */}
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listado" element={<ListadoDeProd />} />
              <Route path="/profile" element={<Profile />} />
              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </main>
          <Menu /> 
          <NavigationBar />
          {/* <Footer /> */}
        </BrowserRouter>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
