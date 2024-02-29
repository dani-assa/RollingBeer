import React, {useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../styles/Section.css'


const CardV2 = ({ setPedidos }) => {
    const [count, setCount] = useState(0)

    const guardarInfo = () => {
        setPedidos(count)
    }

    const restar = () => {
        if (count > 0) {
            setCount (count -1)
        }
    }

  return (
    
    <Card >
        <Card.Img variant="top" src="src/assets/Cerveza1.png" />
        <Card.Body>
        <Card.Title className=''>Nombre de la Cerveza</Card.Title>
        <Card.Text>
            Descripcion breve de la cerveza
        </Card.Text>
        <div className="d-flex justify-content-between">
                <Button variant="warning" className="rounded-pill" onClick={() => {
                    setCount(count + 1)
                }}>+</Button>
                <h1>{count}</h1>
                <Button variant="warning" className="rounded-pill" onClick={restar}  >-</Button>
                <Button></Button>
        </div>
        <div className="d-flex justify-content-center">
        <Button className='mt-3 rounded-pill' variant="warning">Más detalles</Button>
        </div>
        
        </Card.Body>
    </Card>
  )
}

export default CardV2