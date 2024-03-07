import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ProductList from './ProductList';
import Pagination from './Pagination';
// import ProductModalEdit from './ProductModalEdit';
import ProductModalV2 from './ProductModalV2';
import MenuModal from './Menu';

const itemsPerPage = 6;
const URL_BASE = import.meta.env.VITE_URL_BASE;

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [changeFlag, setChangeFlag] = useState(false);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleVerMas = (product) => {
    setSelectedProduct(product);
    setCurrentModal('editProduct');
  };

  const handleShowModal = () => {
    setCurrentModal('addProduct');
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  const productsAll = async () => {
    try {
      setLoadings(true);
      const {data} = await axios.get(`${URL_BASE}/product/getAll`);
      setProducts(data);
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    productsAll();
  }, [changeFlag]);

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
      {currentModal === 'editProduct' && (
        <ProductModalV2
          product={products}
          show={true}
          handleCloseModal={handleCloseModal}
          setLoadings={setLoadings}
          setChangeFlag={setChangeFlag}
        />
      )}
      {currentModal === 'addProduct' && (
        <MenuModal
          show={true}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default ProductAdmin;

