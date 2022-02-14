//Imports
import { createContext, useState } from 'react';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const ModalGlobalContext = createContext();
export const ModalGlobalProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({title: '', body: ''});

    const handleClick = e => {
        if(e.target.attributes.data){
            setOpen(false)
        }
    }

    return(
        <ModalGlobalContext.Provider value={{ setOpen, setContent }}>
            { children }
            {   
                ( open ) &&
                <div className='modal-container' data='container' onClick={e => handleClick(e)}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h2>{ content.title }</h2>
                            <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} />
                        </div>
                        <div className='modal-body'>
                            { content.body }
                        </div>
                    </div>
                </div>
            }
        </ModalGlobalContext.Provider>
    )
}