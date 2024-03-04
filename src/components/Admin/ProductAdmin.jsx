import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingScreen from '../loadingScreen/LoadingScreen.jsx';
import axios from 'axios';

const URL_BASE = import.meta.env.VITE_URL_BASE;

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [errors, setErrors] = useState([]);

  const productsAll = async () => {
    try {
      setLoadings(true);
      const response = await axios.get(`${URL_BASE}/product/getAll`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    productsAll();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            {loadings ? (
              <LoadingScreen />
            ) : (
              <ul>
                {products.map((product, i) => (
                  <li key={i}>{product.name}</li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductAdmin;
