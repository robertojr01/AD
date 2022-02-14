//Imports
import { useContext, useState } from "react";
import { createDrone } from "../../services/drone";
import { ToastContext } from "../../context/ToastNotifications";

function FormDrone(){

    //Toast Notifications
    const { addToast } = useContext(ToastContext);

    const [values, setValues] = useState({ name: '', model: '', serialNumber: '', flightTime: '', status: '', image: '' });
    
    //OnChange Values & Files
    const handleChange = e => {
        const { name , value } = e.target;
        setValues({...values, [name]: value});
    }
    const handleChangeFile = e => {
        const { name, files } = e.target;
        setValues({...values, [name]: files[0] })
    }

    //OnSubmit
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await createDrone(values);
        if( response ){
            response.status === 200 ? addToast('Perfecto !', 'Drone creado correctamente.', 'success') : addToast('Error !', 'No se ha podido crear el usuario.', 'danger');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="formCreate">
            <input type="text" name="name" onChange={handleChange} placeholder='name' />
            <input type="text" name="model" onChange={handleChange} placeholder='model' />
            <input type="text" name="serialNumber" onChange={handleChange} placeholder='serial number' />
            <input type="number" name="flightTime" onChange={handleChange} placeholder='flight time' />
            <select defaultValue={'default'} name="status" onChange={handleChange}>
                <option value="default" disabled>Seleccionar Status</option>
                <option value="operational">Operational</option>
                <option value="not_operational">Not_Operational</option>
                <option value="maintenance">Maintenance</option>
                <option value="removed">Removed</option>
            </select>
            <input type="file" name="image" onChange={handleChangeFile}/>
            <button>Crear</button>
        </form>
    )
}
export default FormDrone;