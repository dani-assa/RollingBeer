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
import Menu from "./components/Admin/Menu";
import ProductAdminV2 from "./components/Admin/ProductAdminV2";
<<<<<<< HEAD
<<<<<<< HEAD

=======
import AdminV2 from "./pages/AdminV2";
>>>>>>> d7ecbaf9607c2ac7497508d01db21cab26901f5f
=======

>>>>>>> b793d11c0512d0a10621f332e241943f390a8866

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <main>
            <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
              
=======
              <Route path="/adminv2/products" element={<ProductAdminV2 />} />
>>>>>>> d7ecbaf9607c2ac7497508d01db21cab26901f5f
=======
>>>>>>> b793d11c0512d0a10621f332e241943f390a8866
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listado" element={<ListadoDeProd />} />
              <Route path="/profile" element={<Profile />} />
              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/productos" element={<ProductAdminV2/>} />
              </Route>
<<<<<<< HEAD
<<<<<<< HEAD
=======
              <Route path="/adminv2" element={<AdminV2 />} />
>>>>>>> d7ecbaf9607c2ac7497508d01db21cab26901f5f
=======
>>>>>>> b793d11c0512d0a10621f332e241943f390a8866
            </Routes>
          </main>
          <Menu />
          <NavigationBar />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
