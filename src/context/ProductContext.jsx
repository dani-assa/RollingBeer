import React, { createContext, useState, useContext, useEffect } from "react";
import { productRequest } from "../api/product";
import axios from "../api/axios";
import { alertCustom } from '../utils/alertCustom/alertCustom';


export const ProductContext = createContext();

export const useProductAuth = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuhtProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [errors, setErrors] = useState("");

  const signin = async (product) => {
    try {
      // const res = await productRequest(product);
      const res = await axios.post(`/product/create`, product);
      if (res.status === 200 || res.status === 201) {
        alertCustom('Éxito', 'Producto creado exitosamente', 'success');
      } else {      
        alertCustom('Upps', 'El producto se creó, pero se recibió un código de estado inesperado.', 'warning');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ha ocurrido un error.';
      alertCustom('Upps', errorMessage, 'error');
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
