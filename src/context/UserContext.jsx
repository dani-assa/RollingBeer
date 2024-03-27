import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, verifyTokenRequest } from "../api/user";
import Cookies from "js-cookie";
import axios from "../api/axios";
export const UserContext = createContext();
import { alertCustom } from "../utils/alertCustom/alertCustom.js";

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
  const [products, setProducts] = useState([]);
  const [userChangeFlag, setUserChangeFlag] = useState(false);
  const [cart, setCart] = useState([]);

  const triggerUserUpdate = () => {
    setUserChangeFlag((prevFlag) => !prevFlag);
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
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
      Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.includes("La cuenta está desactivada.")
      ) {
        alertCustom(
          "Upps",
          "La cuenta está deshabilitada. Por favor, contacte al administrador.",
          "error"
        );
      } else {
        setErrors(error.response.data);
        alertCustom(
          "Upps",
          "Ocurrió un error al iniciar sesión. Por favor, intente nuevamente.",
          "error"
        );
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`product/getAll`);
      setProducts(res.data);
    } catch (error) {
      setErrors(
        error.response.data.message ||
          alertCustom("Upps", "Ha ocurrido un error.", "error")
      );
    }
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productExists = currentCart.find(
        (item) => item._id === product._id
      );
      if (productExists) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product._id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
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
        getAllProduct,
        products,
        addToCart,
        cart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
