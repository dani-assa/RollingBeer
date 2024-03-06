import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ProductList from './ProductList';
import Pagination from './Pagination';
import ProductModal from './ProductModalEdit';

const itemsPerPage = 9;
const URL_BASE = import.meta.env.VITE_URL_BASE;

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleVerMas = (product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
    setShowModal(true); // Mostrar el modal
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const productsAll = async () => {
    try {
      setLoadings(true);
      const response = await axios.get(`${URL_BASE}/product/getAll`);
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

  const offset = currentPage * itemsPerPage;
  const paginatedProducts = products.slice(offset, offset + itemsPerPage);

  return (
    <Container className="vh-100">
      <Row className="mb-5">
        <Col>
          <Button variant="primary" size="sm" onClick={handleShowModal}>
            Agregar
          </Button>
        </Col>
      </Row>
      <Row>
        <ProductList
          products={products}
          loadings={loadings}
          paginatedProducts={paginatedProducts}
          handleVerMas={handleVerMas}
        />
        <Pagination
          pageCount={Math.ceil(products.length / itemsPerPage)}
          handlePageChange={handlePageChange}
        />
      </Row>
      <ProductModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        product={selectedProduct} // Pasa el producto seleccionado al modal
      />
    </Container>
  );
};

export default ProductAdmin;
