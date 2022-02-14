//Imports
import { Link } from 'react-router-dom';
import { verifyLoginCookies } from "../middlewares/Cookies";

//Images
import dronesImg from '../assets/drones.png';
import adminsImg from '../assets/admins.png';

function Home(){

    //Comprobar si está logueado el admin/usuario
    if( !verifyLoginCookies() ){
        window.location = '/';
    }

    return(
        <div className='homePadre'>
            <h1>Home</h1>
            <div className="content">
                <div className='card'>
                    <h2>Drones</h2>
                    <img src={dronesImg} />
                    <Link to="/drones">Drones</Link>
                </div>
                <div className='card'>
                    <h2>Admins</h2>
                    <img src={adminsImg} />
                    <Link to="/admins">Admins</Link>
                </div>
            </div>
        </div>
    )
}
export default Home;