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
import Users from "./components/Admin/Users"
<<<<<<< HEAD
import Orders from "./pages/Orders";
=======
//import Orders from "./pages/orders";
>>>>>>> d8ffc90806a1f8d1f1af72dda571239983336561

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listado" element={<ListadoDeProd />} />
              <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
              <Route path="/orders" element={<Orders />} />
=======
              {/*<Route path="/orders" element={<Orders />} />*/}
>>>>>>> d8ffc90806a1f8d1f1af72dda571239983336561
              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/productos" element={<ProductAdminV2/>}/>
                <Route path="/admin/usuarios" element={<Users/>}/>
              </Route>
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
