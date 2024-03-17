import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Modal, Row, Offcanvas, Form } from "react-bootstrap";
import "../listadoDeProductos/listado.css";
import axios from "../../api/axios";
import CardV1 from "../Section/CardV1";
import CardV2 from "./CardV2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

const searchWithOptions = async ({ setState, setLoading, queryParams }) => {
  setLoading(true);

  try {
    const res = await axios.get(`/productsWithOptions/search${queryParams}`);
    const data = res.data;
    console.log(res);
    if (res.status == 200) {
      setState(data);
    }

    if (res.status == 404 || res.status == 500) {
      setState(null);
    }
  } catch (error) {
    console.log(error);
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

const renderHandler = (data, loading) => {
  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  if (data) {
    return data?.map((product) => (
      <CardV2 key={product.id} product={product} />
    ));
  }

  return <p>Lo sentimos, no hemos podido encontrar lo que buscabas</p>;
};


const ListadoDeProdV1 = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [cartItems, setCartItems] = useState([]);
  const [quitar, setQuitar] = useState({ cheddar: false, bacon: false });
  const [tableNumber, setTableNumber] = useState(null);
  const [selectedProductInfo, setSelectedProductInfo] = useState(null);
  const [smShow, setSmShow] = useState(false);
  const { products, getAllProduct } = useAuth();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const location = useLocation();
  const searchInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();
  const searchFormRef = useRef();

  const handleAddCard = (burgerOptions) => {
    const { tipo, sinTacc, ...rest } = burgerOptions;
    const tipoString = Array.isArray(tipo) ? tipo.join(", ") : tipo;
    const sinTaccString = sinTacc ? "Sin TACC" : "";
    const totalCantidad = burgerOptions.cantidad;
    setCartItems([
      ...cartItems,
      { ...rest, tipo: tipoString, sinTACC: sinTaccString, totalCantidad },
    ]);
  };
  console.log(cartItems);
  const handleQuitarChange = (item) => {
    setQuitar((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

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

  console.log(selectedProductInfo);
  return (
    <Container fluid>
      <Row>
        <h1 className="text-center pt-4">¡Descubre Nuestro Delicioso Menú!</h1>
        <Button id="boton1" onClick={handleShow}>
          {" "}
          <ShoppingBagIcon />{" "}
        </Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton className="modal1">
            <Modal.Title>Tu pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal1">
            <h5 className="text-end m-2">Mesa {tableNumber}</h5>
            {cartItems.length === 0 ? (
              <p className="text-center">No se ha realizado ningún pedido</p>
            ) : (
              cartItems.map((item, index, products) => (
                <div key={index}>
                  {Object.keys(item.tipo).length > 0 ? (
                    <>
                      <p>
                        Opción:{" "}
                        {Object.keys(item.tipo).find((key) => item.tipo[key]) ||
                          "Ninguna"}
                      </p>
                    </>
                  ) : (
                    <span>No seleccionó ninguna opción</span>
                  )}

                  {Object.keys(item.extras).length > 0 &&
                    Object.values(item.extras).some((count) => count > 0) && (
                      <>
                        <p>Extras:</p>
                        <ul>
                          {Object.keys(item.extras).map(
                            (extra, index) =>
                              item.extras[extra] > 0 && (
                                <li key={index}>
                                  {extra}: {item.extras[extra]}
                                </li>
                              )
                          )}
                        </ul>
                        <p>
                          Total de extras:{" "}
                          {Object.values(item.extras).reduce(
                            (total, count) => total + count,
                            0
                          )}
                        </p>
                      </>
                    )}

                  {item.sinTACC && <p>{item.sinTACC}</p>}
                  {Object.entries(item.quitar).map(
                    ([ingrediente, seleccionado]) =>
                      seleccionado && (
                        <p key={ingrediente}>{`Quitar: ${ingrediente}`}</p>
                      )
                  )}

                  {item.aclaraciones && (
                    <p>Aclaraciones: {item.aclaraciones}</p>
                  )}
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio: ${item.price}</p>
                  <Button
                    className="boton2"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))
            )}
          </Modal.Body>
          {/*<h6>Total de productos seleccionados: </h6>*/}
          <Modal.Footer className="modal1">
            {cartItems.length > 0 && (
              <Button
                variant="text-ligth"
                className="boton3"
                onClick={setSmShow}
              >
                {" "}
                Confirmar pedido{" "}
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <>
          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Detalle del pedido
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-start">Hamburguesa {}</p>
            </Modal.Body>
          </Modal>
        </>
        <Col>
          <h2 className="pt-4 text-center">Productos destacados</h2>
          <CardV1
            onAddCard={handleAddCard}
            quitar={quitar}
            setQuitar={handleQuitarChange}
            onCloseModal={handleClose}
            setSelectedProductInfo={setSelectedProductInfo}
          />
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
              className="form-select"
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
              <option value="asc">Precio ascendente</option>
              <option value="desc">Precio descendiente</option>
            </Form.Select>
          </div>
          <div className="col-12 col-md-3">
            <Form.Select
              className="form-select"
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
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-dark border-1 border-light w-100"
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
        <div className="row">{renderHandler(data, loading)}</div>
      </section>
        <div>
          <h2 className="pt-4 text-center">Productos</h2>
          <CardV2
            onAddCard={handleAddCard}
            quitar={quitar}
            setQuitar={handleQuitarChange}
            onCloseModal={handleClose}
            setSelectedProductInfo={setSelectedProductInfo}
          />
        </div>

        
      </Row>
    </Container>
  );
};

export default ListadoDeProdV1;
