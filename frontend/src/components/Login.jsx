//Imports
import { useState } from 'react';
import { verifyLoginCookies, saveCookiesLogin } from "../middlewares/Cookies";
import { loginAdmin } from '../services/admin';

function Login(){

    if( verifyLoginCookies() ){
        window.location = '/home';
    }

    //OnChange User
    const [user, setUser] = useState({email: '', password: ''});
    const handleChange = e => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    }
    //OnSubmit Login
    const handleSubmit = async e => {
        e.preventDefault();

        const response = await loginAdmin(user);
        if( response ){
            response.status === 200 ? saveCookiesLogin(response.data.token) : console.log('gestionar errores') ;
        }
    }

    return(
        <div className='loginPadre'>
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <input type="text" name="email" value={user.email} onChange={e => handleChange(e)} placeholder='email' />
                <input type="password" name="password" value={user.password} onChange={e => handleChange(e)} placeholder='password' />
                <button type="submit">Acceder</button>
            </form>
        </div>
    )
}
export default Login;