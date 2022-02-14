//Imports
import { Link } from "react-router-dom";
import { BackButton } from './Icons';

function Back({ props }){
    return(
        <Link className="backButton" to={props}><BackButton/></Link>
    )
}
export default Back;


