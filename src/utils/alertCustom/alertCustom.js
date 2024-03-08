import Swal from "sweetalert2";

export const alertCustom = (title, text, icon, action) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof action === "function") {
        action();
      }
    }
  });
};
export const alertConfirm = (title, text, icon, confirmButtonText, action) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof action === "function") {
        try {
          action();
          Swal.fire({
            title: "Eliminado",
            text: "Eliminado con exito.",
            icon: "success",
          });
        } catch (error) {
          Swal.file({
            title: "Error",
            text: "Ocurrio un error al querer eliminar el usuario",
            icon: "error",
          });
        }
      }
    }
  });
};
