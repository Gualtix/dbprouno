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
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const Eliminar = ({ history }) => {
  const classes = useStyles();
  

  
  const options = ['Monday', 'Tuesday', 'Thursday', 
  'Friday', 'Saturday', 'Sunday'];
  const [album, setVal]= useState([]);
  const [Nalbum, setVal2]=useState({
    valor: "",
    name:"",
  });

  const [refresh, setRefresh] = useState(false);

  const handleChange = (prop) => (event) => {
    setVal2({ ...Nalbum, [prop]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    let valido = true;

    if (Nalbum.name === "") {
      toast.warn("Elija un Album", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      valido = false;
    }
    if (valido) {
      toast.warn("Album eliminado", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      axios
        .post(
          "http://" +
          serversAddr.backend.host +
          ":" +
          serversAddr.backend.port +
          "/middleware",
          {
            peticion: "/eliminar_album",
            server: 3,
            data: {
              nickname: localStorage.getItem("username"),
              album: Nalbum.name,
            }
          }
        )
        
    }
  };

  useEffect(() => {
    async function getAlbumes() {
      await axios
        .post(
          "http://" +
          serversAddr.backend.host +
          ":" +
          serversAddr.backend.port +
          "/middleware",
          {
            peticion: "/getalbum",
            server: 1,
            data: {
              nickname: localStorage.getItem("username"),
            }
          }
        )
        .then((response) => {
          
          
          for ( let [index, res] of response.data.entries()) {
            
            setVal(currentalbum=> currentalbum.concat(res.nombre))
            
          }
        });
    }

    getAlbumes();
    setRefresh(false);
  },[refresh]);

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
                src={"/album.jpg"}
              />
              <p style={{ textAlign: "centered", width: "300px" }}>
                <strong>Eliminar album</strong>
              </p>
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
                  <Autocomplete
                    options={album}
                    //value={Nalbum.name}
                    onChange={(event, value) => setVal2({name:value})}
                    style={{ width: 300 }}
                    renderInput={(params) =>
                      <TextField {...params} label="Albumes" variant="outlined" />}
                  />
                  </Box>
                  
                  
                  <Box className={clsx(classes.margin)}>
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
                      Eliminar
                    </Button>
                  </Box>
                </FormGroup>
              </Form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
    
  );
};

export default withRouter(Eliminar);
