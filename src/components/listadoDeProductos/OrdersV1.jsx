import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import CardV1 from '../Section/CardV1';
import CardV2 from './CardV2';
import { CartItems } from '../../Hook/CartItems';


const OrdersV1 = ({ cartItems }) => {
    //const [cartItems, setCartItems] = useState([]);
    const [quitar, setQuitar] = useState({ cheddar: false, bacon: false });
    console.log(cartItems);



/*
    const handleAddCard = (burgerOptions) => {
        const { tipo, sinTacc, ...rest } = burgerOptions;
        const tipoString = Array.isArray(tipo) ? tipo.join(', ') : tipo;
        const sinTaccString = sinTacc ? "Sin TACC" : "";
        const totalCantidad = burgerOptions.cantidad;
        setCartItems([...cartItems, { ...rest, tipo: tipoString, sinTACC: sinTaccString, totalCantidad }]);
    }*/
    const handleQuitarChange = (item) => {
        setQuitar((prevState) => ({
            ...prevState,
            [item]: !prevState[item],
        }));
    };
    const handleDeleteItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    return (
        <>
            <h1>Tu pedido</h1>


            <h5 className='text-end m-2'>Mesa {/*tableNumber*/}</h5>
            {cartItems.length === 0 ? (
                <p className='text-center'>No se ha realizado ningún pedido</p>
            ) : (
                cartItems.map((item, index, product) => (
                    <div key={index}>
                        <h5 className='text-center'>Producto: {product.name}</h5>
                        {Object.keys(item.tipo).length > 0 ? (
                            <>
                                <p>Opción: {Object.keys(item.tipo).find(key => item.tipo[key]) || 'Ninguna'}</p>
                            </>
                        ) : (
                            <span>No seleccionó ninguna opción</span>
                        )}


                        {Object.keys(item.extras).length > 0 && Object.values(item.extras).some(count => count > 0) && (
                            <>
                                <p>Extras:</p>
                                <ul>
                                    {Object.keys(item.extras).map((extra, index) => (
                                        item.extras[extra] > 0 && (
                                            <li key={index}>{extra}: {item.extras[extra]}</li>
                                        )
                                    ))}
                                </ul>
                                <p>Total de extras: {Object.values(item.extras).reduce((total, count) => total + count, 0)}</p>
                            </>
                        )}


                        {item.sinTACC && <p>{item.sinTACC}</p>}
                        {Object.entries(item.quitar).map(([ingrediente, seleccionado]) => (
                            seleccionado && <p key={ingrediente}>{`Quitar: ${ingrediente}`}</p>
                        ))}

                        {item.aclaraciones && (
                            <p>Aclaraciones: {item.aclaraciones}</p>
                        )}
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio: ${item.price}</p>
                        <Button className='boton2' onClick={() => handleDeleteItem(index)}>Eliminar</Button>
                    </div>
                ))
            )}
            {selectedProductInfo && (
                <div>
                    <h5 className='text-center'>Producto: {selectedProductInfo.name}</h5>
                    <p>Precio: ${selectedProductInfo.price}</p>
                </div>
            )}

            {/*<h6>Total de productos seleccionados: </h6>*/}

            {cartItems.length > 0 && (<Button variant="text-ligth" className='boton3' > Confirmar pedido </Button>)}
        </>
    )


}

export default OrdersV1