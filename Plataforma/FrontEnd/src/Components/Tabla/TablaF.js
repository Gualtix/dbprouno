import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables( props) {

    var data = [];
    var fechas = [];
    var etiquetas;
    var unique = [];
    var cont = 0;
  return (
    <>
    
    {
        props.arreglo === "" ? "" :
            props.arreglo.map(item => {                  
                var findItem = unique.find(x => x.fecha === item.fecha);
                if (!findItem)
                    unique.push(item);
            }),console.log("array"),console.log(unique)
        }
    {
    props.bancos  === ""? "":(
            data.splice(0, data.length),
            props.bancos.map((el,index)=>{
                var cadena1 = []
                cadena1.push(el)
                    props.arreglo.map((e,index)=>(
                        fechas = new Date(e.fecha),

                        e.banco === el ? (
                            cadena1.push(e.ranking) === "" ? "": "",
                            etiquetas = etiquetas + e.ranking + ","
                            //cadena1.push({"y":e.ranking,"label":e.fecha})
                            //cadena1.push({"y":e.ranking,"label":fechas.getFullYear() +"/"+ (fechas.getMonth()+1)+"/"+fechas.getDate()})

                        ):""
                    )
                )
                
                return(
                    <>
                    {//data.splice(0, data.length),
                    //(data.push({"type":"line","name":el,"showInLegend": "true", "dataPoints":cadena1})) === "" ? "":""
                        /*
                        cadena1 === [] ? "" :(
                            cadena1.map((e,index)=>(
                                data.push(e)
                            ))
                        ),*/
                        data.push(cadena1) === "" ? "" : ""
                        //console.log(cadena1), console.log('la data'), console.log(data)
                        
                    } 
                    </>
                    //el.banco,  el.fecha.getFullYear() +el.fecha.getMonth()+el.fecha.getDate()
                )
            })
            )
            /*
                data.map((e,index)=>(
                    e.map((el,index)=>(
                        "elemento" + el + "nose " 
                    ))
                ))
            */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Perfil Financiero</StyledTableCell>
            {
                unique === [] ? "" :(
                   unique.map((e,index)=>(
                    fechas = new Date(e.fecha),
                    <StyledTableCell align="right">{fechas.getFullYear() +"-"+ (fechas.getMonth()+1)}</StyledTableCell>  
                   )) 
                )
            }
          </TableRow>
        </TableHead>
        <TableBody>
           {/*data.map((rows) => (
              
            <StyledTableRow key={rows[0]}>
              <StyledTableCell component="th" scope="row">
                {rows[0]}
              </StyledTableCell>
              {
                data === [] ? "" :(
                   data.map((e,index)=>(
                    fechas = new Date(e.fecha),
                    <StyledTableCell align="right">{fechas.getFullYear() +"-"+ (fechas.getMonth()+1)}</StyledTableCell>  
                   )) 
                )
            }
              </StyledTableRow>
        ))*/}

            {
            data === [] ? "" :(
            data.map((rows) => (
              cont = 0,
              <StyledTableRow key={rows[0]}>
                

                {
                     rows.map((row,index)=>(
                        cont === 0 ? (
                            cont = cont +1,
                            <StyledTableCell component="th" scope="row">
                            {rows[0]}
                            </StyledTableCell>
                            ) :(
                      <StyledTableCell align="right"> { row } </StyledTableCell>  
                        )//, cont = cont + 1,console.log(row)//,console.log('cosas'),console.log(cont),console.log(e)
                     )) 
                  
              }
                </StyledTableRow>
              )))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}
