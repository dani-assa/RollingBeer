import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"; 
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import UserModal from "./UserModal";
import Pagination from '../pagination/Pagination';

const itemsPerPage = 4;
const URL_BASE = import.meta.env.VITE_URL_BASE;

const UsersAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const isAuthenticated = useAuth();
  const [showMenuModal, setShowMenuModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_BASE}/user/getAll`); 
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); 
      setProducts(products.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const offset = currentPage * itemsPerPage;
  const paginatedProducts = products.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Container fluid className="justify-content-center">
      <Button variant="primary" size="sm" onClick={handleShowModal} className="float-end">
        <AddIcon/>
      </Button>
      <h3 className="mt-5 mb-4 text-center">Administración de Usuarios</h3>
      <Row className="justify-content-center">
        <Col>
          {loading
            ? <LoadingScreen />
            : (
              <Table striped bordered variant='dark' className="mt-3">
                <thead>
                  <tr>
                    <th className="text-center">Nombre y Apellido</th>
                    <th className="text-center">Usuario</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  { paginatedProducts.map((user, i) => (
                      <tr key={i}>
                        <td className="text-center">{user.name}</td>
                        <td className="text-center">{user.userName}</td>
                        <td className="text-center">
                          <Form.Check checked={!user.visible} onChange={(e) => disabledProduct(e, user._id)} />
                        </td>
                        <td className="text-center">
                          <Button variant='danger' size='sm' onClick={() => handleDeleteUser(user.id)}>
                            <DeleteIcon fontSize='small'/>
                          </Button>
                          {/* Lógica para editar usuario */}
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
      <UserModal show={showModal} onHide={handleCloseModal} />
      {/* Menu modal */}
    </Container>
  )
};

export default UsersAdmin;
