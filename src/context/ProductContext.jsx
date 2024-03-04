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
  const [product, setProduct] = useState("");
  const [errors, setErrors] = useState([]);

  const signin = async (product) => {
    try {
      const res = await productRequest(product);
      setProduct(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <ProductContext.Provider
      value={{
        signin,
        product,
        errors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};