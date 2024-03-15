{/*import React, { useState } from 'react'


export const CartItems = () => {
    const [cartItems, setCartItems] = useState([]);
    const handleAddCard = (burgerOptions) => {
        const { tipo, sinTacc, ...rest } = burgerOptions;
        const tipoString = Array.isArray(tipo) ? tipo.join(', ') : tipo;
        const sinTaccString = sinTacc ? "Sin TACC" : "";
        const totalCantidad = burgerOptions.cantidad;
        setCartItems([...cartItems, { ...rest, tipo: tipoString, sinTACC: sinTaccString, totalCantidad }]);
    }
    return {
        cartItems, handleAddCard
    };
};
*/}
