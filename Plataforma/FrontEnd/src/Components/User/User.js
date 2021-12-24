import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Form, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import "date-fns";
import "@rmwc/typography/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@rmwc/button";

const serversAddr = require("../serversAddr");
const shajs = require('sha.js');

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  colorCard: {
    backgroundColor: "#F7F7EF",
    borderColor: "#ffffff",
    //width: "500px",
  },
  colorCampo: {
    backgroundColor: "#FFFFFF",
    width: "35ch",
  },
  margin: {
    margin: theme.spacing(1),
    width: "100%",
    justifyContent: "center",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "35ch",
    backgroundColor: "#FFFFFF",
  },
  tamAlert: {
    width: "200px",
  },
  centrarContenido: {
    textAlign: "center",
  },
  registrarse: {
    textAlign: "right",
    fontSize: 12,
  },
}));

const Register = ({ history }) => {
  const classes = useStyles();
  const [valuesUser, setValues] = useState({
    birthday: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
    showPasswordConfirm: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...valuesUser, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...valuesUser, showPassword: !valuesUser.showPassword });
  };

  const handleClickShowPasswordConfirm = () => {
    setValues({
      ...valuesUser,
      showPasswordConfirm: !valuesUser.showPasswordConfirm,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [refresh, setRefresh] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    let valido = true;

    if (valuesUser.name === "") {
      toast.warn("El Campo Apellidos es Obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      valido = false;
    }
    if (valuesUser.email === "") {
      toast.warn("El Campo e-mail es Obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      valido = false;
    }
    if (valuesUser.birthday === "") {
      toast.warn("El Campo fecha de nacimiento es obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      valido = false;
    }
    if (valuesUser.passwordConfirm !== valuesUser.password) {
      toast.warn("Las Contraseñas no coinciden", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      valido = false;
    }
    if (valido) {
      // actualizar usuario
      axios
        .post(
          "http://" +
          serversAddr.backend.host +
          ":" +
          serversAddr.backend.port +
          "/middleware",
          {
            peticion: "/actualizar_usuario",
            server: 1,
            data: {
              nickname: localStorage.getItem("username"),
              nombre: valuesUser.name,
              fechanacimiento: valuesUser.birthday,
              email: valuesUser.email,
            }
          }
        )
        .then((response) => {
          // if user creation where succeed
          if (response.data.updated !== undefined) {
            //inicio sesion
            toast.success(
              "Se Actualizo su informacion correctamente",
              { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 }
            );

            if (valuesUser.password !== "") {
              let passEncrypt = shajs("sha256")
                .update(valuesUser.password)
                .digest("hex");
              axios
                .post(
                  "http://" +
                  serversAddr.backend.host +
                  ":" +
                  serversAddr.backend.port +
                  "/middleware",
                  {
                    peticion: "/actualizar_contrasenia",
                    server: 1,
                    data: {
                      nickname: localStorage.getItem("username"),
                      password: passEncrypt,
                    }
                  }
                )
                .then((response) => {
                  if (response.data.updated !== undefined) {
                    //inicio sesion
                    toast.success(
                      "Se Actualizo su contraseña",
                      { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 }
                    );
                  }
                });
            }
          } else {
            toast.error("Error: " + response.data.error, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });
          }
        });
    }
  };

  useEffect(() => {
    async function getUsuario() {
      await axios
        .post(
          "http://localhost:9090/informacion_usuario",
          {
            nickname: localStorage.getItem("username"),
          }
        )
        .then((response) => {
          console.log(response.data.user);
          if (response.data.user !== undefined) {
            setValues({
              name: response.data.user,
              password: "",
              passwordConfirm: "",
              showPassword: false,
              showPasswordConfirm: false,
            });
          }
        });
    }

    getUsuario();
    setRefresh(false);
  }, [refresh]);

  return (
    <div>
      <div data-testid="user-title"></div>
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="#FFFFFF">
        <Card variant="outlined">
          <CardContent className={classes.colorCard}>
            <div align="center">
              <img
                align="center"
                alt="imagen ususario iniciar sesión"
                src={"/logIn.png"}
              />
              <p style={{ textAlign: "centered", width: "300px" }}>
                <strong>Perfil de Usuario: {valuesUser.name}</strong>
              </p>
            </div>
            
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default withRouter(Register);
