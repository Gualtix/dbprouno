import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withRouter, Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Form, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@rmwc/button";
import { CircularProgress } from "@rmwc/circular-progress";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import "date-fns";
import Collapse from "@material-ui/core/Collapse";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Alert from "@material-ui/lab/Alert";
import "@rmwc/typography/styles";
import Titulo from "../Props/Titulo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Login = ({ history }) => {
  const [activarBotonGuardar, setActivarBotonGuardar] = useState(true);
  const [errorData, setErrorData] = useState(false);

  const classes = useStyles();
  const [valuesUser, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...valuesUser, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...valuesUser, showPassword: !valuesUser.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialState = {
    user: {},
    error: null,
  };

  useEffect(() => {}, []);

  const handleClick = async (event) => {
    event.preventDefault();
    history.push("/User");
    let correcto = true;
    if (valuesUser.username === "") {
      toast.error("El campo Nombre de Usuario es obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      correcto = false;
    }
    if (valuesUser.password === "") {
      toast.error("El campo Contraseña es obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      correcto = false;
    }
    if (valuesUser.username === "") {
      toast.error("Es obligatorio el nombre de usuario", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      correcto = false;
    }
    if (correcto) {
      //Verificacion de Credenciales
      console.log("llego aqui el login");
      await axios
        .post(
          "http://localhost:9090/login",
          {
            nickname: valuesUser.username, 
            password: valuesUser.password
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.exists === 0) {
            toast.error("Credenciales Incorrectas", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });
          } else {
            //existe el usuario
            toast.success("Bienvenido", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });
            localStorage.setItem("esAutenticado", true);
            localStorage.setItem("roles", JSON.stringify(["usuario"]));
            localStorage.setItem("permisos", JSON.stringify(["usuario"]));
            localStorage.setItem("username", valuesUser.username);
            //localStorage.setItem("profilepic", response.data.profileimage);
            setActivarBotonGuardar(false);
            history.push("/");
          }
        });
    }
  };

  return (
    <div>
      <Titulo nombre="Inicio de Sesión" etiqueta="login-title" />
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="#FFFFFF">
        <Card variant="outlined">
          <CardContent className={classes.colorCard}>
            <div align="center">
              <img
                align="center"
                alt="imagen ususario iniciar sesión"
                src="/logIn.png"
              />
            </div>
            <Box
              display="flex"
              justifyContent="center"
              p={1}
              flexGrow={1}
              bgcolor="#F7F7EF"
            >
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <Box display="flex" justifyContent="center">
                    <TextField
                      label="Nombre de Usuario"
                      onChange={handleChange("username")}
                      required
                      id="outlined-required"
                      className={clsx(classes.margin, classes.textField)}
                      value={valuesUser.username}
                      variant="outlined"
                    />
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={valuesUser.showPassword ? "text" : "password"}
                        value={valuesUser.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {valuesUser.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  </Box>
                  <div className={classes.centrarContenido}>
                    <Collapse in={!activarBotonGuardar}>
                      <Button
                        style={{ fontWeight: "bold" }}
                        label=" ...Entrando"
                        icon={<CircularProgress />}
                      />
                    </Collapse>
                    <Collapse in={activarBotonGuardar}>
                      <Button
                        data-testid="button-login"
                        variant="contained"
                        size="small"
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#0B78F4",
                          width: "315px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handleClick}
                      >
                        <VpnKeyIcon /> Entrar
                      </Button>
                    </Collapse>
                    <Link to="/registrar" className={classes.registrarse}>
                      No tienes Cuenta? Registrate!
                    </Link>
                  </div>
                  <Collapse in={errorData}>
                    <Box p={1}>
                      <Alert variant="filled" severity="error" width="10px">
                        No se pudo acceder al usuario
                      </Alert>
                    </Box>
                  </Collapse>
                </FormGroup>
              </Form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default withRouter(Login);
