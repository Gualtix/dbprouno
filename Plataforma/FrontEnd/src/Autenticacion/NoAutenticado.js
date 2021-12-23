import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

export default ({ component: C, appProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      !appProps.isAuthenticated
        ?  <C {...props} {...appProps} /> //console.log("SIII")
        : <Redirect to="/IniciarSesion" />
    }
  />;