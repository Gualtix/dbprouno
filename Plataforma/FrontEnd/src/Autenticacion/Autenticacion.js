import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import Login from '../Components/Login/Login';
// import NavBar from './Components/NavBar/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
const useStyles = makeStyles(() => ({
  bloque: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: '-190px',
    marginLeft: '-160px',
  }
}));

const Autenticacion=({history})=> {
 let [local, setLocal] = useState()

 const classes = useStyles();
 
  useEffect(() => {
    const timeOut = setInterval(() => {
        setLocal(localStorage.getItem('esAutenticado'));
    }, 3000);
    return () => clearInterval(timeOut)
  }, [])

  return (
    <Router>
      <Switch>
      
        { local === "true" ? <Route exact path='/Inicio' component={NavBar}/>  : null}
        <Route exact path='/IniciarSesion' component={Login}/>
        
        
        {/* <Route exact path='/Inicio' component={NavBar}/> */}
        {/* local === "true" */}
        {/* {local === "true" ? <Route exact path='/Inicio' component={NavBar}/> : console.log('NO INICIO')} */}
        {/* { local? null: <Route exact path='/IniciarSesion' component={Login}/> } */}
        {/* {local ? console.log('IIIII'): console.log('oooooo') } */}

        {/* <Route exact path='/IniciarSesion' component={Login}/>  */}
        <Route exact path='/NotFoundPage'>
          <div className={classes.bloque}>
            <Label style={{ fontSize: '200px' }}>404</Label>
            <h3>This page could not be found</h3>
          </div>
        </Route>
        <Redirect from="*" to="/IniciarSesion" />
      </Switch>
    </Router>

  );
}

export default withRouter(Autenticacion);

