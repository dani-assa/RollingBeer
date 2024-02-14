import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
