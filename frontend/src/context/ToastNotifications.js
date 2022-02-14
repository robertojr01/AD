//Imports
import { createContext, useState, useEffect, useCallback } from 'react';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

export const ToastContext = createContext();
export const ToastProvider = ({ children }) => {

    const [toasts, setToasts] = useState([]);

    //Agregar Toast
    const addToast = useCallback((title, body, type) => {
        setToasts( toasts => [...toasts, { title, body, type }] )
    }, [setToasts]);

    useEffect(() => {
        if( toasts.length > 0 ){
            const contador = setTimeout(() => {
                setToasts( toasts => toasts.slice(1) );
            }, 3000);
            return () => clearTimeout(contador)
        }
    }, [toasts])
    

    return(
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className='toastPadre'>
                {
                    ( toasts.length > 0 ) &&
                        toasts.map(({title, body, type}, i) => (
                            <div key={i} className={`card ${type}`}>
                                <div className='header'>
                                    <FontAwesomeIcon icon={faExclamation}/>
                                    <p>{title}</p>
                                </div>
                                <p className='body'>{body}</p>
                            </div>
                        ))
                }
            </div>
        </ToastContext.Provider>
    )
}

