import { Cookies } from "react-cookie";


//Comprobar que el usuario ha iniciado sesion
export function verifyLoginCookies(){
    const cookie = new Cookies();
    if( cookie.get('login') ){
        return true;
    }else{
        return false;
    }
}
//Guardar el Login ( token ) del usuario
export function saveCookiesLogin(token){
    const cookie = new Cookies();
    cookie.set('login', { token }, { path: '/', maxAge:  60 * 60 * 4, secure: true }); //4 horas
    window.location.reload();
}
//Obtener el Token de las Cookies
export function getToken(){
    const cookie = new Cookies();
    return cookie.get('login').token;
}
//Eliminar Token - Cookies
export function deleteLogin(){
    const cookie = new Cookies();
    cookie.remove('login', { path: '/' });
    window.location.reload();
}