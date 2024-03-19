import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap";
import "../listadoDeProductos/listado.css";
import axios from "../../api/axios";
import CardV1 from "../Section/CardV1";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import { alertCustom } from "../../utils/alertCustom/alertCustom";
import CardProduct from "./CardProduct";
import ModalDeEntradaV1 from "./ModalDeEntradaV1";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


const searchWithOptions = async ({ setState, setLoading, queryParams }) => {
  setLoading(true);

  try {
    const res = await axios.get(
      `/product/productsWithOptions/search${queryParams}`,
      {
        validateStatus: function (status) {
          return true;
        },
      }
    );

    if (res.status == 200) {
      setState(res.data);
    } else if (res.status == 400) {
    } else if (res.status == 404 || res.status == 500) {
      setState(null);
    }
  } catch (error) {
    alertCustom("Upps", "Hay un problema para traer los productos.", "error");
  } finally {
    setLoading(false);
  }
};

const handleQueryParams = ({
  valueSearchInput,
  valueCategoryInput,
  valuePriceInput,
  setQueryParams,
}) => {
  const queryParams = {
    name: valueSearchInput,
    price: valuePriceInput,
    category: valueCategoryInput,
  };

  let queryString = "?";

  for (const key in queryParams) {
    if (queryParams[key]) {
      queryString.length == 1
        ? (queryString += `${key}=${queryParams[key]}`)
        : (queryString += `&${key}=${queryParams[key]}`);
    }
  }

  setQueryParams(queryString);
};


const ListadoDeProdV1 = () => {
  const { products, getAllProduct } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const location = useLocation();
  const searchInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();
  const searchFormRef = useRef();
  const [numeroMesa, setNumeroMesa] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    searchWithOptions({
      setState: setData,
      setLoading: setLoading,
      queryParams: location.search,
    });
  }, [queryParams]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

   const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleChangeMesa = (nuevaMesa) => {
    setNumeroMesa(nuevaMesa);
    setShowModal(false);
    localStorage.setItem('numeroMesa', nuevaMesa); 
  };

  useEffect(() => {
    const savedNumeroMesa = localStorage.getItem('numeroMesa');
    if (savedNumeroMesa) {
      setNumeroMesa(savedNumeroMesa);
    } else {
      handleShowModal();
    }
  }, []);

  return (
    <Container fluid>
      <Row className="listado">
        <h1 className="text-center pt-4">¡Descubre Nuestro Delicioso Menú!</h1>
        <Col>
          <h2 className="pt-4 text-center">Productos destacados</h2>
          <CardV1 />
        </Col>
        <section className="container mt-5 pt-5">
          <Form
            ref={searchFormRef}
            onSubmit={submitHandler}
            className="row g-3 align-items-center"
          >
            <div className="col-12 col-md-4">
              <div className="input-group">
                <Form.Control
                className="colColor"
                  type="text"
                  id="searchInput"
                  placeholder="Buscar por nombre"
                  ref={searchInputRef}
                  onKeyDown={(e) =>
                    e.code == "Enter"
                      ? handleQueryParams({
                        valueSearchInput: searchInputRef.current.value,
                        valueCategoryInput: categoryInputRef.current.value,
                        valuePriceInput: priceInputRef.current.value,
                        setQueryParams: setQueryParams,
                      })
                      : ""
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-3">
              <Form.Select
                className="form-select colColor"
                id="priceSelect"
                defaultValue={""}
                ref={priceInputRef}
                onChange={(e) =>
                  handleQueryParams({
                    valueSearchInput: searchInputRef.current.value,
                    valueCategoryInput: categoryInputRef.current.value,
                    valuePriceInput: priceInputRef.current.value,
                    setQueryParams: setQueryParams,
                  })
                }
              >
                <option disabled hidden value="">
                  Filtrar por precio
                </option>
                <option value="asc" >Precio ascendente</option>
                <option value="desc">Precio descendiente</option>
              </Form.Select>
            </div>
            <div className="col-12 col-md-3">
              <Form.Select
                className="form-select colColor"
                id="categorySelect"
                defaultValue={""}
                ref={categoryInputRef}
                onChange={(e) =>
                  handleQueryParams({
                    valueSearchInput: searchInputRef.current.value,
                    valueCategoryInput: categoryInputRef.current.value,
                    valuePriceInput: priceInputRef.current.value,
                    setQueryParams: setQueryParams,
                  })
                }
              >
                <option disabled hidden value="">
                  Filtrar por categoria
                </option>
                <option value="Hamburguesa">Hamgurguesa</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Para Picar">Para Picar</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Wrap">Wrap</option>
              </Form.Select>
            </div>
            <div className="col-lg-1">
              <button
                type="button"
                className="btn btn-primary w-100 btnFiltrar"
                onClick={() =>
                  handleQueryParams({
                    valueSearchInput: searchInputRef.current.value,
                    valueCategoryInput: categoryInputRef.current.value,
                    valuePriceInput: priceInputRef.current.value,
                    setQueryParams: setQueryParams,
                  })
                }
              >
                Filtrar
              </button>

            </div>
            <div className="col-lg-1">
              <button
                type="button"
                className="btn btn-dark border-1 border-light w-100 boton6"
                onClick={(e) => {
                  e.preventDefault();
                  searchFormRef.current.reset();
                  setQueryParams();
                }}
              >
                Limpiar filtros
              </button>
            </div>
          </Form>
        </section>
        <section className="container my-5 vh-50">
          <h5 className="pt-4">Mesa N˚: {numeroMesa}</h5>
          <Button size="sm" className="boton4" onClick={handleShowModal}>
            Cambiar N˚
          </Button>
          {showModal && (
          <ModalDeEntradaV1
            onSubmit={handleChangeMesa}
            numeroMesa={numeroMesa}
            show={showModal}
            onHide={handleHideModal}
          />
        )}
          <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    className=""
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Un mozo se acercará a su mesa
              </Alert>
            </Collapse>
            <Button
              disabled={open}
              className="boton5"
              variant="outlined"
              onClick={() => {
                setOpen(true);
              }}
            >
              Solicitar Atención Personalizada
            </Button>
          </Box>
        </section>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {data?.length > 0 ? (
              <CardProduct data={data} />
            ) : (
              <>
                <p className="mb-5 fs-3">
                  Disculpa, no encontramos ningún producto
                </p>
              </>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default ListadoDeProdV1;
