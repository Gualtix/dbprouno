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

import MultAxis from '../MultAxis';
import axios from "axios";


//var array = [];
//4997680000	4806250000	191427000	2020-11-30 00:00:00

  var array = [
    createData('banco1', 1, ('2020-11-30 00:00:00')),
    createData('banco1', 2, ('2020-12-31 00:00:00')),
    createData('banco1', 1, ('2021-01-31 00:00:00')),
    createData('banco1', 1, ('2021-02-28 00:00:00')),
    createData('banco2', 2, ('2020-11-30 00:00:00')),
    createData('banco2', 4, ('2020-12-31 00:00:00')),
    createData('banco2', 3, ('2021-01-31 00:00:00')),
    createData('banco2', 3, ('2021-02-28 00:00:00')),
    createData('banco3', 3, ('2020-11-30 00:00:00')),
    createData('banco3', 3, ('2020-12-31 00:00:00')),
    createData('banco3', 2, ('2021-01-31 00:00:00')),
    createData('banco3', 2, ('2021-02-28 00:00:00')),
  ];

  var bancos =[
      'banco1','banco2','banco3'
  ]
  var data=[];
  var cadena = [];
  var fechas = [];
  var texto = "";
  

  function createData(banco, ranking, fecha) {
    return { banco, ranking, fecha };
  }
  



const Grafica = ({history}) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    return(
        <>
        {/*console.log('aquiiii'),console.log(items.results),console.log('finn')*/}
        <center>
            <label>Grafica Ranking de Bancos AQUI</label>
            
        </center>
        <h7>
        {
        
           //cadena.splice(0, cadena.length),
            bancos === ""? "":(
                data.splice(0, data.length),
                bancos.map((el,index)=>{
                    var cadena1 = []
                        array.map((e,index)=>(
                            fechas = new Date(e.fecha),
                            e.banco === el ? (
                                //cadena1.push({"y":e.ranking,"label":e.fecha})
                                cadena1.push({"y":e.ranking,"label":fechas.getFullYear() +"/"+ (fechas.getMonth()+1)+"/"+fechas.getDate()})
                            ):""
                        )
                    )
                    
                    return(
                        <>
                        {//data.splice(0, data.length),
                        (data.push({"type":"line","name":el,"showInLegend": "true", "dataPoints":cadena1})) === "" ? "":""
                        } 
                        </>
                        //el.banco,  el.fecha.getFullYear() +el.fecha.getMonth()+el.fecha.getDate()
                    )
                })
                )
        }
        </h7>
        <MultAxis arreglo = {data} />

        </>
    );
}

export default withRouter(Grafica);