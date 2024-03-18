import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from "../../api/axios"; 
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import UserModal from "./UserModal";
import Pagination from '../pagination/Pagination';
import { alertCustom, alertConfirm } from '../../utils/alertCustom/alertCustom';

const itemsPerPage = 4;

const UsersAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useAuth();
  const [changeFlag, setChangeFlag] = useState(false);

 
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user/getAll`); 
        const filteredUsers = response.data.filter(user => user.role === 'client');
        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        alertCustom('Upps', 'Ha ocurrido un error al traer los usuarios.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
  

  const handleEditUser = async ({target}, _id) => {
    try {
      setIsLoading(true);
      await axios.patch(`user/disable/${_id}`, {disabled: !target.checked});
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === _id ? { ...user, disabled: !target.checked } : user
        )
      );
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (_id) => {
    try {
      setIsLoading(true);
      alertConfirm(
        '¿Estas seguro?',
        'Estas por eliminar el usuario de manera definitiva',
        'warning',
        'Eliminar',
        async () => {
          await axios.delete(`user/delete/${_id}`);
          setUsers(users.filter(user => user.id !== user._id));
          fetchData();
        });
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData()
  }, [changeFlag]);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = users.slice(offset, offset + itemsPerPage);

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
        {isLoading ? (
          <LoadingScreen />
        ) : users.length === 0 ? (
          <p className="text-center">No hay usuarios para mostrar</p>
        ) : (
          <>
            <Table striped bordered variant='dark' className="mt-3">
              <thead>
                <tr>
                  <th className="text-center"><b>Nombre y Apellido</b></th>
                  <th className="text-center"><b>Usuario</b></th>
                  <th className="text-center"><b>Estado</b></th>
                  <th className="text-center"><b>Acciones</b></th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, i) => (
                  <tr key={i}>
                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{user.userName}</td>
                    <td className="text-center">
                      <Form.Check
                        checked={!user.disabled}
                        onChange={(e) => handleEditUser(e, user._id)}
                      />
                    </td>
                    <td className="text-center">
                      <Button variant='danger' size='sm' onClick={() => handleDeleteUser(user._id)}>
                        <DeleteIcon fontSize='small'/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              pageCount={Math.ceil(users.length / itemsPerPage)}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Col>
      </Row>
      <UserModal show={showModal} onHide={handleCloseModal} />
    </Container>
  )
};

export default UsersAdmin;
