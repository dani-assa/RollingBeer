import axios from "./axios";

export const productRequest = (product) => axios.post(`/api/product`, product);

export const verifyTokenRequest = () => axios.get('/product/verifyToken');