import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegistro } from "../hooks";
import Ojo from "../imagenes/ojo.png";
import swal from 'sweetalert2'

function Registro(){

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mostrarContrasena, setMostrarContrasena] = useState(true);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorContrasena, setErrorContrasena] = useState(false);

    const {create}  = useRegistro();

    const submit = async (e) => {
        let controller;
        e.preventDefault();

        if(contrasena.length<8){
            swal.fire('Longitud minima de la contraseña 8 caracteres', '', 'error')
            e.preventDefault(); 
        }else{
            try {
                controller = await create({
                    usuario: usuario,
                    contrasena: contrasena,
                })
            } catch (err) {
                alert("error: " + err);
            }
    
            if(controller === true){
                //usuario añadido
                swal.fire('Usuario creado correctamente', '', 'success');
                navigate("/");
            }else{
                //usuario no añadido
                swal.fire('Ya existe ese username', '', 'error')
            }
        }
        
    }


    const handleMostrarContrasena= (e) => {
        e.preventDefault();
        if(mostrarContrasena === true){
            setMostrarContrasena(false);
        }else{
            setMostrarContrasena(true);
        }

    }

    return(
        <div className="bg-indigo-300">
            <div className="flex justify-center h-screen w-screen items-center ">
                <div className="w-full md:w-1/3 flex flex-col items-center border-2  pt-10 pb-10 bg-white" >
                    <h1 className="text-2xl font-bold">REGISTRO DE USUARIOS</h1>

                    <form className="w-3/4 flex flex-col items-center">

                        <div className="w-full mb-6 mt-6 ">
                            <input type="text" id="usuario" placeholder="Usuario" maxLength="16" minLength="1" name="usuario" onChange={(e) => setUsuario(e.target.value)} className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"/>           
                        </div>

                        {
                            mostrarContrasena
                            ?
                                <div className="w-full flex flex-row">
                                    <input type="text" id="Contrasena" placeholder="Contraseña" minLength="8" maxLength="16" name="Contrasena" onChange={(e) => setContrasena(e.target.value)} className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"/>
                                    <button className=" w-1/8 float-right rounded text-blue-50 font-bold  mt-1" onClick={handleMostrarContrasena}>
                                        <img src={Ojo} alt="Button" className="w-12 text-center"/>
                                    </button>
                                </div>
                            :
                                <div className="w-full flex flex-row">
                                    <input type="password" id="Contrasena" placeholder="Contraseña" minLength="8" maxLength="16" name="Contrasena" onChange={(e) => setContrasena(e.target.value)} className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"/>
                                    <button className=" w-1/8 float-right rounded text-blue-50 font-bold mt-1" onClick={handleMostrarContrasena}>
                                        <img src={Ojo} alt="Button" className="w-12 text-center"/>
                                    </button>
                                </div>
                        }    

                        <div className="w-2/4 mt-4">
                            <button className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700" onClick={submit}> REGISTRATE </button>
                        </div>

                    </form>

                    <span className="mt-6"> Si ya te has registrado  <Link className="underline text-blue-900" to="/">inicia sesión</Link> </span>
                
                </div>
            </div>
        </div>
    )

}

export default Registro;