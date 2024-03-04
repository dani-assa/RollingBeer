import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import LoadingScreen from '../loadingScreen/LoadingScreen.jsx'
const URL_BASE = import.meta.env.VITE_URL_BASE;
import axios from 'axios';

const ProductAdmin = () => {

  const [products, setProducts] = useState([]);
  const [loadings, setLoadings] = useState(false);
  
  const productsAll = async () => {
    
    try {
      setLoadings(true);

      const products = await axios.get(`${URL_BASE}/products`);
      console.log(products);
      setProducts(products);
    } catch (error) {
      setErrors(error.response.products);
    } finally{
      setLoadings(false);
    };
  };

  return (
    <>
    <Container>
      <Row>
        <Col>
          {
            loadings ? <LoadingScreen/> : (
              <ul>
                {
                products && products.map((product, i) => (
                  <li>{product.name}</li>
                ))}
              </ul>
            )
          } 
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default ProductAdmin ;