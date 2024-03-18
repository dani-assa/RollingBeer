import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { alertCustom } from '../../utils/alertCustom/alertCustom';
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import FormRegisterV1 from "../Section/FormRegisterV1.jsx"


const Contacto = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    alertCustom("Consulta registrada", "Su consulta fue registrada", "success");
    setValue("email", "");
    setValue("mensaje", "");
    setIsLoading(false);
  };

  return (
    <Container fluid className='mt-2'>
      <h1 className="text-center">Contacto</h1>
      <Col className='mb-5'>
           <FormRegisterV1/>       
      </Col>
      <Row className="justify-content-center ">
      <Col xs={12} md={6} lg={4}>
        <div className="mapa embed-responsive embed-responsive-1by1">
          <iframe
            title="mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.10606794951!2d-65.2097419255642!3d-26.83657849002515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1710777134715!5m2!1ses-419!2sar"
            style={{ width: '100%', height: '100%' }}
          ></iframe>
        </div>
      </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="formulario-contacto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <input
                  placeholder='Email'
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  {...register('email', {
                    required: 'Por favor, introduce tu correo electrónico.',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Por favor, introduce un correo electrónico válido.'
                    }
                  })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              <div className="mb-3">
                <textarea
                  placeholder='Mensaje'
                  className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                  id="mensaje"
                  name="mensaje"
                  {...register('mensaje', { required: 'Por favor, introduce tu mensaje.' })}
                ></textarea>
                {errors.mensaje && <div className="invalid-feedback">{errors.mensaje.message}</div>}
              </div>
              {isLoading && <LoadingScreen />}
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </Col>
        
      </Row>
    </Container>
  );
};

export default Contacto;
