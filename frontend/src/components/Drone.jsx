//Imports
import { useEffect, useState, useContext } from 'react';
import { editDronesBySelects, getAllDrones } from '../services/drone';
import { ToastContext } from "../context/ToastNotifications";
import ModalButton from "../utils/ModalButton";
import FormDrone from "../utils/forms/FormDrone";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Check, Cog, Delete, Times } from '../utils/Icons';
import Back from '../utils/Back';

function Drone(){

    //Toasts Context
    const { addToast } = useContext(ToastContext);

    const [drones, setDrones] = useState([]);
    useEffect(() => {
        async function loadData(){
            const response = await getAllDrones();
            if( response ){
                response.status === 200 ? setDrones(response.data) : console.log('controlar errores')
            }
        }
        loadData();
    }, []);
    
    //Modo Seleccionar
    const [selectMode, setSelectMode] = useState(false);
    const [arrayIds, setArrayIds] = useState([]);
    const addToSelection = id => {
        if( selectMode ){
            console.log(id)
            if( arrayIds.includes(id) ){
                setArrayIds( arrayIds => arrayIds.filter(element => element !== id) );
            }else{
                setArrayIds( arrayIds => [...arrayIds, id] );
            }
        }
    }
    const editSelection = async (data) => {
        console.log('hola')
        if( selectMode ){
            const response = await editDronesBySelects({ids: arrayIds, data})
            if( response ){
                console.log(response)
                response.status === 200 ? addToast('Perfecto !', 'Drones actualizados correctamente.', 'success') : addToast('Error !', 'No se ha podido actualizar los drones.', 'danger');
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }

    //Filters
    const [filtracionName, setFiltracionName] = useState('');
    const [filtracionStatus, setFiltracionStatus] = useState([]);
    const filtrarStatus = name => {
        if( filtracionStatus.includes(name) ){
            setFiltracionStatus( filtracionStatus => filtracionStatus.filter(element => element !== name) );
        }else{
            setFiltracionStatus( filtracionStatus => [...filtracionStatus, name] );
        }
    }

    return(
        <div className="dronePadre">
            <div className='select'>
                <button className='buttonSelect' onClick={() => setSelectMode(!selectMode)}>Select Mode</button>
                {
                    ( selectMode ) &&
                    <div className='selectTools'>
                        <div onClick={() => editSelection('operational')}><Check/></div>
                        <div onClick={() => editSelection('maintenance')}><Cog/></div>
                        <div onClick={() => editSelection('not_operational')}><Times/></div>
                        <div onClick={() => editSelection('removed')}><Delete/></div>
                    </div>
                }    
            </div>
            <Back props={'/home'} />
            <ModalButton props={{title: 'Create Drone', body: <FormDrone/>}} icon={faPlus} />
            <h1 onClick={() => console.log(arrayIds)}>Drones</h1>
            <div className='filtros'>
                {/* Search */}
                <input className='search' type="search" name="name" placeholder='Find by name, model, serial number...' onChange={e => setFiltracionName(e.target.value)}/>
                <div className='status'>
                {/* Status */}
                    <div>
                        <label>
                            <input type="checkbox" name="not_operational" onChange={e => filtrarStatus(e.target.name)}/>
                            <span>Not_Operational</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="operational" onChange={e => filtrarStatus(e.target.name)}/>
                            <span>Operational</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="maintenance" onChange={e => filtrarStatus(e.target.name)}/>
                            <span>Maintenance</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="removed" onChange={e => filtrarStatus(e.target.name)}/>
                            <span>Removed</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={selectMode ? 'content selectMode' : 'content'}>
                {
                    drones.map(({ _id, name, status, model, serialNumber, flightTime }, i) => (
                        ( (name.includes(filtracionName.trim()) || model.includes(filtracionName.trim()) || serialNumber.includes(filtracionName.trim())) && (filtracionStatus.length !== 0 ? filtracionStatus.includes( status ) : true) ) &&
                        <div key={i} className={selectMode ? arrayIds.includes(_id) ? 'card active' : 'card' : 'card'} onClick={() => addToSelection(_id)}>
                            <p className='name'>{name}</p>
                            <p>Modelo: <span>{model}</span></p>
                            <p>Horas de Vuelo: <span>{flightTime}</span></p>
                            <p className={`status ${status}`}>{status}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Drone;