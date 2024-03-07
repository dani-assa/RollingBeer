import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form, Table } from 'react-bootstrap';
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
// import { alertCustom } from '../../../utils/alertCustom';
import axios from 'axios';
import ProductModalV2 from './ProductModalV2';
const URL_BASE = import.meta.env.VITE_URL_BASE;



const ProductAdminV2= () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);


  const getAllProduct = async() => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${URL_BASE}/product/getAll`);
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      // alertCustom('Upps', 'Ha ocurrido un error al traer los usuarios', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${URL_BASE}/delet/${id}`);
      getAllProduct();
    } catch (error) {
      // alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const disabledProduct = async ({target}, id) => {
    try {
      setIsLoading(true);
      await axios.patch(`${URL_BASE}/product/${id}`, {disabled: !target.checked});
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

  return (
    <Container>
      <Row>
        <h1>Administrador de usuarios</h1>
        <Col>
          {isLoading
            ? <LoadingScreen />
            : (
              <Table striped bordered variant='dark'>
                <thead>
                  <tr>
                    <th className="text-center">id</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Apellido</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  { products &&
                    products.map((product, i) => (
                      <tr key={i}>
                        <td className="text-center">{product._id}</td>
                        <td className="text-center">{product.name}</td>
                        <td className="text-center">{product.price}</td>
                        {/* <td className="text-center"><Form.Check checked={!product.disabled} onChange={(e) => disabledUser(e, user.id)}/> </td> */}
                        <td className="text-center">
                          <Col>
                            <Button variant='danger' size='sm' onClick={() => deleteUser(product._id)}>Eliminar</Button>
                            <ProductModalV2
                            product={product} 
                            setIsLoading={setIsLoading} 
                            setChangeFlag={setChangeFlag}
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
      </Row>
    </Container>
  )
};

export default ProductAdminV2