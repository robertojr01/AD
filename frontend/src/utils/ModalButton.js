//Imports
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalGlobalContext } from "../context/ModalGlobalContext";

function ModalButton({ props, icon }){

    const { setOpen, setContent } = useContext(ModalGlobalContext);

    const handleClick = () => {
        setOpen(true);
        setContent({ title: props.title, body: props.body });
    }

    return(
        <div className='modalButton' onClick={() => handleClick()}>
            <FontAwesomeIcon icon={icon}/>
        </div>
    )
}
export default ModalButton;