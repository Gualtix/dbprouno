
import { BrowserRouter as Route } from 'react-router-dom';
export default function Navegacion({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
          ? <C {...props} {...appProps} />//console.log("AUTENTICADO- SIII") //<Redirect to="/PerfilUsuario" /> //404
          : console.log('nsvegacions')// <Redirect to="/NotFoundPage" />// console.log("AUTENTICADO- NOO") 404
        } 
      />
    );
  }