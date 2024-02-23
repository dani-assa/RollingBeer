import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import '../../styles/Section.css'
import CardV1 from './CardV1';
import FormRegisterV1 from './FormRegisterV1';

function Section() {
  return (

    <Container fluid className='cont pt-5'>
      <Row>
          
          <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="section1"> 
              <h1 className='h1h1 text-center mb-5'>Disfruta de un ambiente único y especial</h1>
              <div className='d-flex mt-5 '>
                <Button className=' mx-3 rounded-pill px-5' size='lg'>Ver carta</Button>
                <Button className=' mx-3 rounded-pill px-5' size='lg'>Reservar mesa</Button>
              </div>
          </div>
          
          <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="section2">
            <h2>Sección 2</h2>
            <p></p>
            <CardV1 />
          </div>
          <div className="d-flex justify-content-center align-items-center vh-100" id="section3">
              <Col lg={6} className="d-none d-lg-block" >
                    <div className='text-center text1'>
                      <h2><b>Presentamos una cerveza IPA (India Pale Ale)</b></h2>               
                        <p >Caracterizada por su color dorado ámbar profundo y su notable claridad. <br /> La espuma, de textura cremosa y duradera, se asienta en la parte superior del vaso,<br /> evidenciando la calidad y frescura de la cerveza.</p>
                        <p >La IPA destaca por su aroma intenso y complejo, donde dominan las notas cítricas y florales de los lúpulos, <br /> complementadas con toques de pino y frutas tropicales. Esta complejidad aromática invita a un primer sorbo, <br /> prometiendo una experiencia gustativa rica y satisfactoria</p>
                        <p>Al probarla, el sabor sigue fielmente a lo prometido por el aroma, con un equilibrio perfecto entre <br /> el amargor característico de las IPAs y la dulzura maltosa que le da cuerpo. El perfil de sabor <br /> se inclina hacia los cítricos, como el pomelo y la naranja, con matices de mango y maracuyá, <br /> terminando en un final amargo pero refrescante que invita a seguir degustando.</p>

                        <Button className='mx-3 px-5 rounded-pill ' size="lg" >¡Mira Nuestra seleccion de cervezas!</Button>
                    </div> 
                </Col > 
                <div className='flex-column '>
                    <Col md={12} lg={6}  className=" d-lg-none ">
                      <div className='text-center  text1  mb-5'>
                          <h2><b>Presentamos una cerveza IPA (India Pale Ale)</b></h2>
                      </div>
                  </Col>
                    <Col md={12} lg={12}>
                      <div className='text-center  ' >
                        <Image className='img1' src='src\assets\Cerveza1.png' roundedCircle  fluid/>
                      </div>  
                    </Col>
              </div>
          
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="section4">
            <FormRegisterV1 />
          </div>
        
      </Row>
    </Container>
  );
}

export default Section