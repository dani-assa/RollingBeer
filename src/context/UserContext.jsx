import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, verifyTokenRequest } from "../api/user";
import Cookies from "js-cookie";
import axios from "../api/axios";
export const UserContext = createContext();

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuhtProvider");
  }
  return context;
};

const normalizarUsuario = (usuario) => {
  if ("id" in usuario && !("_id" in usuario)) {
    usuario._id = usuario.id;
    delete usuario.id;
  }
  return usuario;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userChangeFlag, setUserChangeFlag] = useState(false);

  const triggerUserUpdate = () => {
    setUserChangeFlag((prevFlag) => !prevFlag);
  };

  const signup = async (user) => {
    try {
      //const res = await registerRequest(user);
      const res = await axios.post(`user/create`,user)
      const usuarioNormalizado = normalizarUsuario(res.data);
      setUser(usuarioNormalizado);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await axios.post("user/login", user);
      const usuarioNormalizado = normalizarUsuario(res.data);
      setUser(usuarioNormalizado);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        const usuarioNormalizado = normalizarUsuario(res.data);
        setIsAuthenticated(true);
        setUser(usuarioNormalizado);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <UserContext.Provider
      value={{
        signup,
        signin,
        user,
        loading,
        isAuthenticated,
        errors,
        logout,
        triggerUserUpdate,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
