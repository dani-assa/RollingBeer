import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "../../styles/Section.css";
import CardV1 from "./CardV1";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

const Section = () => {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');
  const [showModal, setShowModal] = useState(!localStorage.getItem('tableNumber'));
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const savedTableNumber = localStorage.getItem("tableNumber");
    if (!savedTableNumber) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {

    setShowModal(false);
  };

  const handleSave = () => {
    const num = parseInt(tableNumber);
    if (num > 0 && num <= 50) { 
      localStorage.setItem('tableNumber', tableNumber);
      setShowModal(false);
      navigate("/login");
    } else {
      setShowAlert(true); 
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ''); 
    setTableNumber(newValue);
    if (newValue !== '') {
      setShowAlert(false); 
    } else {
      setShowAlert(true); 
    }
  };

  return (
    <Container fluid className="cont">
      <Row>
        <div
          className="d-flex flex-column justify-content-center align-items-center vh-100"
          id="section1"
        >
          <h1 className="h1h1 text-center mb-5">
            Disfruta de un ambiente único y especial
          </h1>
          <div className="d-flex mt-5 ">
            <Button
              className=" mx-2 mx-md-3 rounded-pill px-5 btnVerCarta"
              onClick={() => navigate("/listado")}
              size="lg"
            >
              Ver carta
            </Button>
          </div>
        </div>

        <div className="vh-100" id="section2">
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <CardV1 />
            </>
          )}
        </div>
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          id="section3"
        >
          <Col lg={6} className="d-none d-xl-block">
            <div className="text-center text1">
              <h2>
                <b>Presentamos una cerveza IPA (India Pale Ale)</b>
              </h2>
              <p>
                Caracterizada por su color dorado ámbar profundo y su notable
                claridad. <br /> La espuma, de textura cremosa y duradera, se
                asienta en la parte superior del vaso,
                <br /> evidenciando la calidad y frescura de la cerveza.
              </p>
              <p>
                La IPA destaca por su aroma intenso y complejo, donde dominan
                las notas cítricas y florales de los lúpulos, <br />{" "}
                complementadas con toques de pino y frutas tropicales. Esta
                complejidad aromática invita a un primer sorbo, <br />{" "}
                prometiendo una experiencia gustativa rica y satisfactoria
              </p>
              <p>
                Al probarla, el sabor sigue fielmente a lo prometido por el
                aroma, con un equilibrio perfecto entre <br /> el amargor
                característico de las IPAs y la dulzura maltosa que le da
                cuerpo. El perfil de sabor <br /> se inclina hacia los cítricos,
                como el pomelo y la naranja, con matices de mango y maracuyá,{" "}
                <br /> terminando en un final amargo pero refrescante que invita
                a seguir degustando.
              </p>

              <Button className="mx-3 px-5 rounded-pill " size="lg">
                ¡Mira Nuestra seleccion de cervezas!
              </Button>
            </div>
          </Col>
          <div className="flex-column ">
            <Col md={12} xl={6} className=" d-xl-none ">
              <div className=" justify-content-center text-center  text1  mb-5">
                <h2>
                  <b>Presentamos una cerveza IPA (India Pale Ale)</b>
                </h2>
              </div>
            </Col>
            <Col md={12} lg={12}>
              <div className="text-center  ">
                <Image
                  className="img1"
                  src="https://i.ibb.co/qk3m98W/Cerveza1.png"
                  roundedCircle
                  fluid
                />
              </div>
            </Col>
          </div>
          <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Ingresar Número de Mesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Número de mesa:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el número de mesa aquí"
                value={tableNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {showAlert && (
              <Alert variant="danger">
                {parseInt(tableNumber) <= 0 ? 'Por favor ingrese un número de mesa válido.' : 'No tenemos esa cantidad de mesas. Por favor, ingresa un número de mesa válido.'}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave} disabled={!tableNumber}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>     
      </Row>
    </Container>
  );
};

export default Section;
