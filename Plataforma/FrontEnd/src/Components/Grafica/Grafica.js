import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { Form, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "date-fns";
import "@rmwc/typography/styles";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Grafica = ({history}) => {
    return(
        <center>
            <label>Grafica Ranking de Bancos AQUI</label>
        </center>
    );
}

export default withRouter(Grafica);