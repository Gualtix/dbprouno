
import { BrowserRouter as Router, Redirect} from 'react-router-dom';

export default function PropRedirigir(path) {
    return (
        <Redirect to={path.name}/>
    );
  }