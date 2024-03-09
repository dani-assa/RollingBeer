import React, { createContext, useState, useContext, useEffect } from "react";
import { productRequest } from "../api/product";
import { alertCustom } from '../utils/alertCustom/alertCustom';

export const ProductContext = createContext();

export const useProductAuth = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("..");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [errors, setErrors] = useState("");

  const signin = async (product) => {
    try {
      const res = await productRequest(product);
    } catch (error) {
      setErrors(error.response.data.message || alertCustom('Upps', 'Ha ocurrido un error.', 'error'));
    }
  };

  useEffect(() => {
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
