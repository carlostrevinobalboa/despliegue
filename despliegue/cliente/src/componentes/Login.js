import { Link, useNavigate   } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks";
import Ojo from "../imagenes/ojo.png";
import swal from 'sweetalert2'


function Login(){

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const {create}  = useLogin();


    const submit = async (e) => {
        e.preventDefault();
        let controller = null;
        try {
          controller = await create({
            usuario: usuario,
            contrasena: contrasena,
          })

          if(controller && controller[1] && controller[1] !== null){

            controller[1].then(response => {
              return response;
            }).then(data => {
                window.localStorage.setItem("loggedUser", JSON.stringify(data));
            }).catch(error => {
              console.log("error" + error)
            })

          }

          if(controller && controller[0] !== null && controller[0] === true){
            e.preventDefault();
            navigate("/formularios");
          }else{
            e.preventDefault();
            swal.fire('Credenciales incorrectas', '', 'error')
          }

        } catch (err) {
            alert(err);
        }

      }


    const handleMostrarContrasena= (e) => {
        e.preventDefault();
        if(mostrarContrasena === false){
            setMostrarContrasena(true);
        }else{
            setMostrarContrasena(false);
        }

    }

    return(
        <div className="bg-indigo-300">
            <div className="flex justify-center h-screen w-screen items-center ">
                <div className="w-full md:w-1/3 flex flex-col items-center border-2  pt-10 pb-10 bg-white" >
                    <h1 className="text-2xl font-bold"> INICIAR SESIÓN version 2</h1>

                    <form className="w-3/4 flex flex-col items-center ">

                        <div className=" w-full mb-6 mt-6 ">
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
                            <button className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700" onClick={(e) => submit(e)}> Iniciar Sesion </button>
                        </div>

                    </form>

                        <span className="mt-6"> Si no tienes cuenta <Link className="underline text-blue-900" to="/registro">registrate aquí</Link> </span>
                </div>

            </div>
        </div>
    )
}

export default Login;
