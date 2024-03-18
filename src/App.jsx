import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import ListadoDeProd from "./pages/ListadoDeProd";
import Admin from "./pages/Admin";
import ProtectedRouteAdmin from "./protectedRoute/ProtectedRouteAdmin";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Profile from "./pages/Profile";
import PanelMenuAdmin from "./components/Admin/PanelMenuAdmin";
import PanelUserAdmin from "./components/Admin/PanelUserAdmin"
import Informacion from "./pages/Informacion";

import NavbarCart from "./components/navigationBar/NavbarCart";


const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <main>
            <NavbarCart />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listado" element={<ListadoDeProd />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/informacion" element={<Informacion />} />
              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/productos" element={<PanelMenuAdmin/>}/>
                <Route path="/admin/usuarios" element={<PanelUserAdmin/>}/>
              </Route>
            </Routes>
          </main>
          <NavigationBar />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
