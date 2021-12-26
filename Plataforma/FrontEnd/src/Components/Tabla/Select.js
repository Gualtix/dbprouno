//import * as React from 'react';
import  React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TablaF from "./TablaF";
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';


function createData(banco, ranking, fecha) {
    return { banco, ranking, fecha };
  }

export default function NativeSelectDemo() {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
        alignItems: 'center',
        color: theme.palette.text.secondary,
      }));

 /* const [top3,setTop3] = useState( "" );
  useEffect(()=>{			
    socket.on('top3',bar =>{
      setTop3(bar) 
      
    })
  },[top3])*/

  
  var array = [
    createData('banco1', 1, ('2020-11-30 00:00:00')),
    createData('banco1', 2, ('2020-12-31 00:00:00')),
    createData('banco1', 1, ('2021-01-31 00:00:00')),
    createData('banco1', 1, ('2021-02-28 00:00:00')),
    createData('banco1', 1, ('2021-03-31 00:00:00')),
    createData('banco2', 2, ('2020-11-30 00:00:00')),
    createData('banco2', 4, ('2020-12-31 00:00:00')),
    createData('banco2', 3, ('2021-01-31 00:00:00')),
    createData('banco2', 3, ('2021-02-28 00:00:00')),
    createData('banco3', 3, ('2020-11-30 00:00:00')),
    createData('banco3', 3, ('2020-12-31 00:00:00')),
    createData('banco3', 2, ('2021-01-31 00:00:00')),
    createData('banco3', 2, ('2021-02-28 00:00:00')),
    createData('banco3', 2, ('2021-03-31 00:00:00')),
  ];

  var bancos =[
      'banco1','banco2','banco3'
  ]
  
  var unique = [];
  
    const [name,setFecha] = React.useState("");
    const handleChange2 = e => setFecha(e.target.value);
    const [name2,setFecha2] = React.useState("");
    const handleChange1 = e2 => setFecha2(e2.target.value);
    
  return (
    <>
    {console.log("la salida del top3"), console.log(array)
    }
    <Box sx={{ minWidth: 120 }}>
        Ranking de Bancos en un Año
        <hr />
      <Item>
          --De:--
      <FormControl >

        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Fecha
        </InputLabel>
        <NativeSelect
          defaultValue={60}
          onChange = {handleChange2}
        >
        {
            array.map(item => {                  
                var findItem = unique.find(x => x.fecha === item.fecha);
                if (!findItem)
                    unique.push(item);
            })
        }
          <option  value={60}>-----------</option>
          {
               ( unique === "" ? " " : 
                ( unique.map((el,index)=>{
                  return(
                    <option  value={el.fecha}>{el.fecha}</option>
                  )                                    
                  })))  
            }
          
        </NativeSelect>
      </FormControl>
      --Hasta--
      <FormControl >

        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Fecha
        </InputLabel>
        <NativeSelect
          defaultValue={80}
          onChange = {handleChange1}
        >
        
          <option  value={80}>-----------</option>
          {
               ( unique === "" ? " " : 
                ( unique.map((el,index)=>{
                  return(
                    <option  value={el.fecha}>{el.fecha}</option>
                  )                                    
                  })))  
            }
          
        </NativeSelect>
      </FormControl>
      <br/>
      De { name }  ----Hasta---- { name2 }
      </Item> 

      </Box> 
      <br />
      Periodo de { name } Hasta { name2 }
      <br/>
      {/*<p>yOUR SELECTED : {name}</p>*/}
      <br />

      {
          <TablaF arreglo = {array} bancos = {bancos} />
             
      }

    
      
      
    </>
   
    
  );
}
