import React, { useState } from "react";
import "./NavbarCart.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Button, Offcanvas } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { alertAdd } from "../../utils/alertCustom/alertCustom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavbarCart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const total = cart.reduce(
    (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
    0
  );

  const handleConfirmOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    alertAdd("center", "success", "Pedido confirmado");
  };

  return (
    <nav className="navbar">
      <h1></h1>
      <div className="cart-icon me-3" onClick={handleShow}>
        <ShoppingCartIcon />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compra</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item._id}>
                  <h5>{item.name}</h5>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <Button
                    variant="outline-primary"
                    onClick={() => decrementQuantity(item._id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => incrementQuantity(item._id)}
                  >
                    +
                  </Button>
                  
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <div className="cart-total">
                <h5>Total del Pedido: ${total.toFixed(2)}</h5>
              </div>
              <Button variant="success" onClick={handleConfirmOrder}>
                Confirmar Pedido
              </Button>
            </>
          ) : (
            <p>Tu carrito está vacío</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default NavbarCart;