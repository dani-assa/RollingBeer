import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import LoadingScreen from "../loadingScreen/LoadingScreen";
import axios from "../../api/axios"; 
import ProductModalV2 from './EditProductModal';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { alertCustom, alertConfirm } from '../../utils/alertCustom/alertCustom';
import Pagination from '../pagination/Pagination';
import Menu from './CreateProductModal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from '../../context/UserContext';

const itemsPerPage = 4;


const PanelMenuAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const {products, getAllProduct} = useAuth()
  

  const deleteProduct = async (_id, name) => {
    try {
      setIsLoading(true);
      alertConfirm('¿Estas seguro?', `Estas por eliminar el producto ${name} de manera definitiva.`, 'warning', 'Eliminar', async () => {
        await axios.delete(`product/delete/${_id}`);
        getAllProduct();
      });
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const disabledProduct = async ({target}, _id) => {
    try {
      setIsLoading(true);
      await axios.patch(`product/visible/${_id}`, {visible: target.checked});
      getAllProduct();
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (productId, currentState) => {
    try {
      setIsLoading(true);
      const isFavorite = !currentState; 
      await axios.patch(`product/favorite/${productId}`, { isFavorite });
      getAllProduct(); 
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductCreated = () => {
    getAllProduct(); 
  };
  

  useEffect(() => {
    getAllProduct()
  }, [changeFlag]);

  const offset = currentPage * itemsPerPage;
  const paginatedProducts = products.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleShowMenuModal = () => {
    setShowMenuModal(true);
  };

  const handleCloseMenuModal = () => {
    setShowMenuModal(false);
  };

  return (
    <Container fluid className="justify-content-center">
      <Button variant="primary" size="sm" onClick={handleShowMenuModal} className="float-end">
        <AddIcon/>
      </Button>
      <h3 className="mt-5 mb-4 text-center">Administración de Menú</h3>
      <Row className="justify-content-center">
      <Col>
        {isLoading ? (
          <LoadingScreen />
        ) : products.length === 0 ? (
          <p className="text-center">No hay productos para mostrar</p>
        ) : (
          <>
            <Table striped bordered variant='dark' className="mt-3">
              <thead>
                <tr>
                  <th className="text-center"><b>Imagen</b></th>
                  <th className="text-center"><b>Nombre</b></th>
                  <th className="text-center"><b>Estado</b></th>
                  <th className="text-center"><b>Acciones</b></th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts &&
                paginatedProducts.map((product, i) => (
                  <tr key={i}>
                    <td className="text-center"><img src={product.image} alt="Producto" style={{ width: '50px', height: '50px' }} /></td>
                    <td className="text-center">{product.name}</td>
                    <td className="text-center"><Form.Check checked={product.visible} onChange={(e) => disabledProduct(e, product._id)}/> </td>
                    <td className="text-center">
                      <Col>
                        <Button variant='danger' className='mx-1 mb-1' size='sm' onClick={() => deleteProduct(product._id, product.name)}><DeleteIcon fontSize='small'/></Button>
                        <Button variant='light' className='mb-1' size='sm' onClick={() => toggleFavorite(product._id, product.isFavorite)}>
                        {product.isFavorite ? 
                          <FavoriteIcon fontSize='small'  style={{ color: 'red' }} /> : 
                          <FavoriteBorderIcon fontSize='small' />
                        }
                        </Button>
                        <ProductModalV2
                          product={product} 
                          setIsLoading={setIsLoading} 
                          setChangeFlag={setChangeFlag}
                          paginatedProducts={paginatedProducts}
                        />
                      </Col>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              pageCount={Math.ceil(products.length / itemsPerPage)}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Col>
      </Row>
      <Menu show={showMenuModal} handleCloseModal={handleCloseMenuModal} onProductCreated={handleProductCreated} />
    </Container>
  )
};

export default PanelMenuAdmin;
