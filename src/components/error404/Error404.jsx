import React from 'react';
import './error404.css'; 

const NotFoundPage = () => {
  return (
    <div className="NotFoundContainer">
      <div className="NotFoundContent">
        <h1>404</h1>
        <h2>Página No Encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <button onClick={() => window.history.back()}>Volver Atrás</button>
      </div>
    </div>
  );
};

export default NotFoundPage;