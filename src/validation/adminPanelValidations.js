//Validaciones para el panel administracion 
// Panel Usuario
export const passUser =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,20}$/;

  export const emailUser =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const nameUser =
  /^([A-Za-zÁÉÍÓÚñáéíóúÑ][A-Za-zÁÉÍÓÚñáéíóúÑ\s']+[\s])*([A-Za-zÁÉÍÓÚñáéíóúÑ][A-Za-zÁÉÍÓÚñáéíóúÑ\s']*)+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ][A-Za-zÁÉÍÓÚñáéíóúÑ\s']*)?$/;


//Panel Menu

export const nameMenu = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/u;

export const imageMenu = /^https:\/\/.*\.(jpg|jpeg|png|gif)$/;

export const priceMenu = /^(?:\d{1,8}(?:\.\d{1,2})?|100000000)$/;

export const cantidadMenu = /^(?:\d{1,9}|1000000000)$/;

export const descriptionRegex = /^[a-zA-Z0-9\s.,!?()-]+$/;