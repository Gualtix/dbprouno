import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//import Transferencia from "./Components/Reportes/Transferencia";
//import Register from "./Components/Register/Register";

function App() {
  let PrimeraVez = true;

  if (PrimeraVez) {
    try {
      if (localStorage.getItem("esAutenticado") !== "true") {
        localStorage.setItem("esAutenticado", false);
        localStorage.setItem("roles", JSON.stringify([""]));
        localStorage.setItem("permisos", JSON.stringify([""]));
      }
    } catch (error) {
      localStorage.setItem("esAutenticado", false);
      localStorage.setItem("roles", JSON.stringify([""]));
      localStorage.setItem("permisos", JSON.stringify([""]));
    }
    PrimeraVez = false;
  }

  useEffect(() => {}, []);
  return (
    <Router>
      <NavBar/>
    </Router>
  );
}

export default App;
