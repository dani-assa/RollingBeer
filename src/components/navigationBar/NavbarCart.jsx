import React, { useState, useEffect } from "react";
import "./NavbarCart.css";
import { Button, Offcanvas } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { alertAdd } from "../../utils/alertCustom/alertCustom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from '../../api/axios';
const KEY_MP = import.meta.env.VITE_KEY_MP;

const NavbarCart = () => {
  const [preferenceIds, setPreferenceIds] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   initMercadoPago(KEY_MP, { locale: 'es-AR' });
  // }, []);

  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useAuth();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const total = cart.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "tableNumber") {
        setTriggerRerender(prev => !prev);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const handleConfirmOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    alertAdd("center", "success", "Pedido confirmado");
    const orderDetails = {
      tableNumber,
      cart,
      total: total.toFixed(2),
    };
    
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    clearCart();
    alertAdd("center", "success", `Pedido confirmado para la mesa ${tableNumber}`);
  };
  
  useEffect(() => {
    const savedTableNumber = localStorage.getItem("tableNumber");
    if (savedTableNumber) {
      setTableNumber(savedTableNumber);
    }
  }, [triggerRerender]);

  // const handleBuy = async () => {
  //   try {
  //     if (cart.length > 0) {
  //       const body = {
  //         items: cart.map(item => ({
  //           title: item.name,
  //           quantity: Number(item.quantity),
  //           unit_price: Number(item.price) / Number(item.quantity),
  //           currency_id: 'ARS', 
  //         })),
  //         back_urls: {
  //           success: "https://main--rollingbeer1.netlify.app",
  //           failure: "https://main--rollingbeer1.netlify.app",
  //           pending: "https://main--rollingbeer1.netlify.app",
  //         },
  //         auto_return: 'approved',
  //       };
        
  //       const response = await axios.post('/create_preference', body); 
  //       const { id } = response.data; 
  //       setPreferenceIds(id); 
  //     } else {
  //       console.error('No hay productos en el carrito');
  //     }
  //   } catch (error) {
  //     console.error('Error al crear preferencia:', error);
  //   }
  // };
  

  return (
    <nav className="navbar">
      <img src="https://i.ibb.co/8bTtr9p/Logo-Rolling-Beer-removebg-preview1.png" alt="Logo" className="logo"/>
      <div className="cart-icon me-3" onClick={handleShow}>
        <ShoppingCartIcon />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compra</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item._id} className="mb-3">
                  <h5>{item.name}</h5>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p className="fw-bold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <Button className="btnQuantily" variant="primary" onClick={() => decrementQuantity(item._id)}>-</Button>
                  <Button className="mx-2 btnQuantily" variant="primary" onClick={() => incrementQuantity(item._id)}>+</Button>
                  <Button variant="danger" onClick={() => removeFromCart(item._id)}>Eliminar</Button>
                </div>
              ))}
              <div className="cart-total mb-4">
                <h5>Total del Pedido: ${total.toFixed(2)}</h5>
              </div>
              <Button variant="success" onClick={handleConfirmOrder}>Confirmar Pedido</Button>
              {preferenceIds.length > 0 && <Wallet initialization={{ preferenceId: preferenceIds }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
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
