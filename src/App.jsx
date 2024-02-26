import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
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

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        {/* <NavbarV1 /> */}
        <NavbarV2 />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listado" element={<ListadoDeProd />} />
            <Route element={<ProtectedRouteAdmin />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
