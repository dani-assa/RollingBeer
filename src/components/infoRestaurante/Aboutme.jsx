import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Aboutme = () => {
  const equipo = [
    { nombre: 'Facundo', imagen: 'https://i.postimg.cc/bN6Zxmx5/Whats-App-Image-2024-03-18-at-14-10-41.jpg' },
    { nombre: 'Juan Pablo', imagen: 'https://i.postimg.cc/9zHmTMJC/Whats-App-Image-2024-03-18-at-12-58-54.jpg' },
    { nombre: 'Daniel', imagen: 'https://i.postimg.cc/L8z8LkzZ/dani.jpg' },
    { nombre: 'Nahun', imagen: 'https://i.postimg.cc/xdnTRkRp/nahun.jpg' },
  ];

  return (
    <Container fluid className='mt-2'>
      <h2 className="text-center">Nuestro Equipo</h2>
      <p className="text-center">"Juntos hacemos la magia suceder en cada plato."</p>
      <Row className="justify-content-center">
        {equipo.map((miembro, index) => (
          <Col xs={3} md={4} lg={2} key={index} className="mb-1">
            <div className="text-center">
              <img src={miembro.imagen} alt={miembro.nombre} className="img-fluid rounded-circle" />
              <p>{miembro.nombre}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Aboutme