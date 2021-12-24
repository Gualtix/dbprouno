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
import "@rmwc/typography/styles";
import Titulo from "../Props/Titulo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  colorCard: {
    backgroundColor: "#F7F7EF",
    borderColor: "#ffffff",
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
  const [activarBotonGuardar, setActivarBotonGuardar] = useState(true);

  const classes = useStyles();
  const [valuesUser, setValues] = useState({
    nickname: "",
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

  useEffect(() => { }, []);

  const handleClick = (event) => {
    event.preventDefault();
    let valido = true;

    if (valuesUser.nickname === "") {
      toast.warn("El Campo Nombres es Obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      valido = false;
    }
    if (valuesUser.password === "") {
      toast.warn("El Campo Contraseña es Obligatorio", {
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
      // User creation
      axios.post(
        "http://localhost:9090/registrar",
        {
          nickname: valuesUser.nickname,
          password: valuesUser.password,
        }
      ).then((response) => {
        // if user creation where succeed
        if (response.data.nickname !== undefined) {
          //inicio sesion
          toast.success(
            "Registro Exitoso" + valuesUser.nickname,
            { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 }
          );
        } else {
          toast.error("Error: " + response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }
      });
    }
  };

  return (
    <div>
      <Titulo nombre="Registro" etiqueta="register-title" />
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
                  <Box>
                    <TextField
                      label="NickName"
                      onChange={handleChange("nickname")}
                      required
                      id="outlined-required"
                      className={clsx(classes.margin, classes.textField)}
                      value={valuesUser.nickname}
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Contraseña
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
                  <Box>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirmar Contraseña
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={
                          valuesUser.showPasswordConfirm ? "text" : "password"
                        }
                        value={valuesUser.passwordConfirm}
                        onChange={handleChange("passwordConfirm")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {valuesUser.showPasswordConfirm ? (
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
                  <Box>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    ></FormControl>
                  </Box>
                  <div className={classes.centrarContenido}>
                    <Collapse in={!activarBotonGuardar}>
                      <Button
                        style={{ fontWeight: "bold" }}
                        label=" ...Registrando"
                        icon={<CircularProgress />}
                      />
                    </Collapse>
                    <Collapse in={activarBotonGuardar}>
                      <Button
                        data-testid="button-register"
                        variant="contained"
                        size="large"
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#0B78F4",
                          width: "95%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handleClick}
                      >
                        Registrar
                      </Button>
                    </Collapse>
                    <Link to="/" className={classes.registrarse}>
                      No tienes Cuenta? Ingresa!
                    </Link>
                  </div>
                </FormGroup>
              </Form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default withRouter(Register);
