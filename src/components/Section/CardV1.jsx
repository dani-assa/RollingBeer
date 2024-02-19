import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../styles/Section.css'

const CardV1 = () => {
  return (
    
    <Card >
        <Card.Img variant="top" src="src\assets\Presentación Huerto Urbano Colores Pastel.png" />
        <Card.Body>
        <Card.Title className=''>Nombre de la burgue</Card.Title>
        <Card.Text>
            Descripcion breve de la hamburguesa
        </Card.Text>
        <div className="d-flex justify-content-between">
                <Button variant="warning" className="rounded-pill">+</Button>
                <Button variant="warning" className="rounded-pill">-</Button>
                <Button variant="warning" className="rounded-pill">🛒</Button>
        </div>
        <div className="d-flex justify-content-center">
        <Button className='mt-3 rounded-pill' variant="warning">Más detalles</Button>
        </div>
        
        </Card.Body>
    </Card>
  )
}

export default CardV1