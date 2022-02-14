//Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import Drone from './components/Drone';
import Verify from './components/Verify';

//Context
import { ModalGlobalProvider } from './context/ModalGlobalContext';
import { ToastProvider } from './context/ToastNotifications';

import './styles/App.scss';

function App() {

	return(
        <ToastProvider>
            <ModalGlobalProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact={true} path="/" element={ <Login/> } />
                        <Route exact={true} path="/home" element={ <Home/> } />
                        <Route exact={true} path="/admins" element={ <Admin/> } />
                        <Route exact={true} path="/drones" element={ <Drone/> } />
                        <Route exact={true} path='/verify/:id' element={ <Verify/> } />
                    </Routes>
                </BrowserRouter>
            </ModalGlobalProvider>
        </ToastProvider>
	);
}

export default App;
