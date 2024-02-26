

const ShowPassword = () => {
  const pass = document.getElementById("password");
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
};

export default ShowPassword;