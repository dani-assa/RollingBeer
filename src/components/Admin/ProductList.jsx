import React from 'react';
import { Col, Button } from 'react-bootstrap';
import LoadingScreen from '../../loadingScreen/LoadingScreen';

const ProductList = ({ products, loadings, paginatedProducts, handleVerMas }) => {
  return (
    <Col>
      {loadings || paginatedProducts.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <ul>
            {paginatedProducts.map((product, i) => (
              <div key={i} className='d-flex justify-content-between mb-3'>
                <div className="d-flex align-items-center">
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  {product.name}
                </div>
                <div>
                  <Button variant="primary" onClick={() => handleVerMas(product)}>Ver más</Button>
                </div>
              </div>
            ))}
          </ul>
        </>
      )}
    </Col>
  );
};

export default ProductList;
