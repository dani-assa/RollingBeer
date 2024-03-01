import axios from "./axios";

export const productRequest = (product) => axios.post(`/product`, product);

export const verifyTokenRequest = () => axios.get('/product/verifyToken');