
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
export default function Autenticado({component: C,  appProps, ...rest }) {
  const history = createBrowserHistory();
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
          ? <C {...props} {...appProps} />//console.log("AUTENTICADO- SIII") //<Redirect to="/PerfilUsuario" /> //404
          : <Redirect to="/NotFoundPage" />//<Route exact path='/NotFoundPage' component={NotFoundPage}/> //<Redirect to="/NotFoundPage" />// console.log("AUTENTICADO- NOO") 404
        } 
      />
    );
  }