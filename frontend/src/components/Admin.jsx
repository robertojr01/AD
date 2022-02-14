//Imports
import ModalButton from "../utils/ModalButton";
import FormAdmin from "../utils/forms/FormAdmin";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Back from '../utils/Back';
import { useState, useEffect } from "react";
import { getAllAdmins } from "../services/admin";

function Admin(){


    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        async function loadAdmins(){
            const response = await getAllAdmins();
            if( response ){
                response.status === 200 && setAdmins(response.data)
            }
        }
        loadAdmins();
    }, [])
    


    return(
        <div className="adminPadre">
            <Back props={'/home'} />
            <ModalButton props={{title: 'Create Admin', body: <FormAdmin/> }} icon={faPlus} />
            <h1>Admins</h1>
            <div className='admins'>
                {
                    admins.map(({name, email, role}, i) => (
                        <div key={i} className='card'>
                            <p className="title">{name}</p>
                            <p>{email}</p>
                            <p><span>role:</span>{role}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Admin;