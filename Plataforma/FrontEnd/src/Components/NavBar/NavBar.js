import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Links from '../Props/Links';
import { Label } from 'reactstrap';
import Register from '../Register/Register';
import Box from '@material-ui/core/Box';
import { FormGroup } from '@material-ui/core';
import { List } from "@rmwc/list";
import Login from '../Login/Login';
import { ToastContainer } from 'react-toastify';
import User from  '../User/User';
import Cancion from '../Cancion/Cancion'
import Eliminar from  '../Eliminar/Eliminar'
import EliminarC from  '../EliminarC/EliminarC'
import history from '../History/History';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@rmwc/typography/styles';
import '@rmwc/list/styles';
import '@material/list/dist/mdc.list.css';
import '@rmwc/drawer/styles';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@rmwc/top-app-bar/styles'
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@rmwc/icon/icon.css';
import '@rmwc/theme/styles';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/theme/theme.css';

import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarNavigationIcon,
    TopAppBarActionItem,
    TopAppBarTitle,
    TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerAppContent
} from "@rmwc/drawer";

import {
    ThemeProvider
} from "@rmwc/theme";

const useStyles = makeStyles(() => ({
    drawerHeader: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    margen: {
        padding: '4px',
        wordWrap: 'normal',
        display: 'inline-block',
        color: '#454545'
    },
    link: {
        textDecoration: 'none',
        color: "#f44336",
        fontWeight: 'bold',
    }, font: {

        textDecoration: 'none'
    }, title: {
        textAlign: "center",
        color: "#FBA21C"
    },
    colorBar: {
        backgroundColor: "#5C8E04",
    }

}));

const NavBar = ({ history }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let [vsalir, setVSalir] = useState(false);
    let [BanderaRedirigirLogin, setBanderaRedirigirLogin] = useState(false);
    let [local, setLocal] = useState();
    let [profileImage, setProfileImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

    const drawerOpen = () => {
        setOpen(true)
    }

    const comparaRoles = (rol) => {
        if (localStorage.length === 0) {
            return;
        }
        let bandera = false;
        try {
            JSON.parse(localStorage.getItem('roles')).forEach(element => {
                if (element === rol) {
                    bandera = true;
                }
            });
        } catch (e) {
            localStorage.setItem('roles', []);
            console.log(e);
        }


        return bandera;
    }

    useEffect(() => {
        const timeOut = setInterval(() => {
            setLocal(localStorage.getItem('esAutenticado'));
            setProfileImage(localStorage.getItem('profilepic'))
        }, 3000);
        return () => clearInterval(timeOut)
    }, [])

    const salir = (event) => {
        localStorage.setItem('esAutenticado', false)
        setProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
        setVSalir(true);
        setTimeout(() => {
            setVSalir(false);
            setBanderaRedirigirLogin(true)
        }, 1000);
    }

    const espera = () => {
        setTimeout(() => {
        }, 4000);
    }

    return (
        <ThemeProvider
            options={{
                primary: '#5C8E04',
                secondary: 'black',
                onPrimary: '#000',
                textPrimaryOnBackground: 'black'
            }}
        >
            <ToastContainer />

            <Router history={history}>
                {localStorage.getItem('esAutenticado') === 'true' ?
                    <Drawer modal open={open} onClose={() => setOpen(false)}>
                        {espera()}
                        {/*<DrawerHeader>
                            <img style={{ marginTop: '15px' }} src={profileImage} className="card-image" />
                            <DrawerTitle style={{ textAlign: 'center' }}>{localStorage.getItem('username')}</DrawerTitle>
                        </DrawerHeader>*/}
                        <br />
                        <DrawerContent>

                            <List>
                                {/* ROL DE ADMINISTRADOR*/}
                                {/*(comparaRoles('Administrador')) || (comparaRoles('Encargado')) ? <Links path='/CrearUsuario' texto='Crear Usuario' /> : null*/}
                                {/*(comparaRoles('Administrador')) ? <Label style={{ fontWeight: 'bold', color: '#CA5300' }} className={classes.margen}>- SEDE</Label> : null*/}
                                {(comparaRoles('usuario')) ?
                                    <FormGroup>
                                        <Box> <Label style={{ fontWeight: 'bold', color: '#CA5300' }} className={classes.margen}>- Opciones</Label></Box>
                                        <Box><Links path='/' texto='Inicio' /></Box>
                                        <Box><Links path='/cancion' texto='Cancion' /></Box>                                           
                                        <Box><Links path='/Eliminar' texto='Eliminar Album' /></Box>  
                                        <Box><Links path='/EliminarC' texto='Eliminar Cancion' /></Box>                                     
                                    </FormGroup>
                                    : null}
                            </List>
                        </DrawerContent>
                    </Drawer>
                    : null}

                <DrawerAppContent>
                    {localStorage.getItem('esAutenticado') === 'true' ?
                        <TopAppBar fixed short>
                            {espera()}
                            <TopAppBarRow  >
                                <TopAppBarSection>
                                    <TopAppBarNavigationIcon icon="menu" onClick={() => drawerOpen(!open)} />
                                    <TopAppBarTitle>Sistema</TopAppBarTitle>
                                </TopAppBarSection>
                                <TopAppBarSection alignEnd>
                                    <TopAppBarActionItem icon={{
                                        strategy: 'component',
                                        icon: 'logout'
                                    }}
                                        onClick={(e) => salir(e)} />
                                </TopAppBarSection>
                            </TopAppBarRow>
                        </TopAppBar>
                        : null}
                    <TopAppBarFixedAdjust />

                    <div style={{ height: '100rem' }}>

                        <Switch>
                            {(localStorage.getItem('esAutenticado') === 'false') ? <Route exact path='/' component={Login} /> : null}
                            {(localStorage.getItem('esAutenticado') === 'false') ? <Route exact path='/registrar' component={Register} /> : null}

                            {(localStorage.getItem('esAutenticado') === 'true') ? <Route exact path='/' component={User} ></Route> : null}
                            {(localStorage.getItem('esAutenticado') === 'true') ? <Route exact path='/Perfil' component={User} ></Route> : null}
                            {(localStorage.getItem('esAutenticado') === 'true') ? <Route exact path='/Cancion' component={Cancion} ></Route> : null}

                            {/* ROL DE USUARIO */}
                            {/*(comparaRoles('usuario')) ? <Route exact path='/CrearSede' component={CrearSede} /> : null*/}

                            {BanderaRedirigirLogin ? <Redirect to='/' /> : null}
                            {espera()}

                            <Redirect from="*" to="/" />

                        </Switch>
                    </div>
                </DrawerAppContent>
            </Router>
        </ThemeProvider>
    )
}

export default withRouter(NavBar);