
import { Label } from 'reactstrap';
import Collapse from '@material-ui/core/Collapse';
export default function LabelError(data){
    return(
        <Collapse in={data.bandera}>
            <Label style={{ color: "#C62E2E" }}> {data.texto} </Label>
        </Collapse>
    );
}
