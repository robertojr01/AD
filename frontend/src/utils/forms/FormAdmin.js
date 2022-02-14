//Imports
import { useContext, useState } from 'react';
import { registerAdmin } from "../../services/admin";
import { ToastContext } from "../../context/ToastNotifications";

function FormAdmin(){

    const { addToast } = useContext(ToastContext);

    const [values, setValues] = useState({ name: '', email: '', role: '' });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await registerAdmin(values);
        if( response ){
            response.status === 200 ? addToast('Perfecto !', 'Admin creado correctamente.', 'success') : addToast('Error !', 'No se ha podido crear el admin.', 'danger');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    } 

    return(
        <form onSubmit={handleSubmit} className='formCreate'>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <select defaultValue={'default'} name="role" onChange={handleChange}>
                <option value="default" disabled>Seleccionar Uno</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button>Crear</button>
        </form>
    )
}
export default FormAdmin;