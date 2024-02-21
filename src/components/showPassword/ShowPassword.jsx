import React from "react";
import { Button } from "react-bootstrap";

const ShowPassword = ({ state, setState }) => {
  return (
    <>
      <Button variant="outline-secondary" onClick={() => setState(!state)}>
        {state ? (
          <i className="bi bi-eye-slash"></i>
        ) : (
          <i className="bi bi-eye"></i>
        )}
      </Button>
    </>
  );
};

export default ShowPassword;
