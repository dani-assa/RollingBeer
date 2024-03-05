// ProductProvider.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { productRequest } from "../api/product";

export const ProductContext = createContext();

export const useProductAuth = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductAuth must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [errors, setErrors] = useState("");

  const signin = async (product) => {
    try {
      // Aquí debes enviar la solicitud al servidor con los datos del producto
      // y manejar la respuesta según corresponda
      const res = await productRequest(product);
      console.log(res.data); // Verifica la respuesta en la consola
    } catch (error) {
      // Aquí puedes manejar los errores de la solicitud
      console.error("Error al crear producto:", error);
      setErrors(error.response.data.message || "Error al crear producto");
    }
  };

  useEffect(() => {
    // Limpia los errores después de un tiempo determinado
    const timer = setTimeout(() => {
      setErrors("");
    }, 3500);
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <ProductContext.Provider
      value={{
        signin,
        errors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
