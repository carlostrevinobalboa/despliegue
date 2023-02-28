import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import CrearFormulario from './componentes/CrearForm'
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import AdministrarFormularios from './componentes/AdministrarFormularios'
import EditarFormulario from './componentes/EditarFormulario'
import DuplicarForm from './componentes/DuplicarForm';
import Respuesta from './componentes/Respuesta';


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/registro" element={<Registro />} />
                <Route exact path="/formularios" element={<AdministrarFormularios />} />
                <Route exact path="/formularios/:id" element={<EditarFormulario />} />
                <Route exact path="/crearFormulario/:id" element={<CrearFormulario />} />
                <Route exact path="/duplicarFormulario/:id/:idNew" element={<DuplicarForm />} />
                <Route exact path="/respuesta/:id" element={<Respuesta />} /> 
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)