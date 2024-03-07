import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import axios from 'axios';
import ProductModalV2 from './ProductModalV2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { alertCustom, alertConfirm } from '../../components/alertCustom/alertCustom';
import Pagination from '../pagination/Pagination';
import Menu from './Menu';

const URL_BASE = import.meta.env.VITE_URL_BASE;
const itemsPerPage = 5;

const ProductAdminV2 = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false); 

  const getAllProduct = async() => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${URL_BASE}/product/getAll`);
      setProducts(data);
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al traer los usuarios', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  const deleteProduct = async (_id) => {
    try {
      setIsLoading(true);
      alertConfirm('Estas seguro?', 'Estas por eliminar el producto de manera definitiva', 'warning', 'Eliminar', async () => {
        await axios.delete(`${URL_BASE}/product/delete/${_id}`);
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
      await axios.patch(`${URL_BASE}/product/visible/${_id}`, {visible: !target.checked});
      getAllProduct();
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
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
    <Container>
      <Button variant="primary" size="sm" onClick={handleShowMenuModal} className="float-end">
        <AddIcon/>
      </Button>
      <h3 className="mt-5 mb-4 text-center">Administrar menú</h3>
      <Row className="justify-content-center">
        <Col>
          {isLoading
            ? <LoadingScreen />
            : (
              <Table striped bordered variant='dark' className="mt-3">
                <thead>
                  <tr>
                    <th className="text-center">Imagen</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  { paginatedProducts &&
                    paginatedProducts.map((product, i) => (
                      <tr key={i}>
                        <td className="text-center"><img src={product.image} alt="Producto" style={{ width: '50px', height: '50px' }} /></td>
                        <td className="text-center">{product.name}</td>
                        <td className="text-center"><Form.Check checked={!product.visible} onChange={(e) => disabledProduct(e, product._id)}/> </td>
                        <td className="text-center">
                          <Col>
                            <Button variant='danger' size='sm' onClick={() => deleteProduct(product._id)}><DeleteIcon fontSize='small'/></Button>
                            <ProductModalV2
                              product={product} 
                              setIsLoading={setIsLoading} 
                              setChangeFlag={setChangeFlag}
                              paginatedProducts={paginatedProducts}
                            />
                          </Col>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            )
          }
        </Col>
        <Pagination
          pageCount={Math.ceil(products.length / itemsPerPage)}
          handlePageChange={handlePageChange}
        />
      </Row>
      {/* Modal de Menu */}
      <Menu show={showMenuModal} handleCloseModal={handleCloseMenuModal} />
    </Container>
  )
};

export default ProductAdminV2;
