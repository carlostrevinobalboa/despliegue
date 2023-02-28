import { Link, useNavigate } from "react-router-dom";
import { useFormulario } from "../hooks";
import { useState, useEffect } from "react";


function AdministrarFormularios(){

  const navigate = useNavigate();
  const {dataGetFormulario,dataGetFormularioMaxId, create, deleteFormulario}  = useFormulario(0);
  const fechaAux = new Date();
  const fecha = formatoFecha(fechaAux,'dd-mm-yyyy');
  const [formContent, setFormContent] = useState();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    //SOLO si no existe la sesion vuelve a login
    if(loggedUser === null){
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if(dataGetFormulario.length > 0){
      setFormContent(dataGetFormulario);
    }
  }, [dataGetFormulario]);

  useEffect(() => {
    if(dataGetFormulario.length > 0){
      setFormContent(dataGetFormulario);
    }
  }, [dataGetFormulario]);



  const crearFormulario = async () => {
    let controller;
    
    if(dataGetFormularioMaxId[0].max === null){
        try {
            controller  = await create({
                id: 0,
                fecha: fecha,
                administrador: "user",
            })
          } catch (err) {
            alert(err);
          }
    }else{
        try {
            controller = await create({
                id: dataGetFormularioMaxId[0].max + 1,
                fecha: fecha,
                administrador: "user",
            })
          } catch (err) {
            alert(err);
          }
    }

    if(controller === false){
      navigate("/");
    }
  }

  const crearFormularioDuplicado = async () => {
    let controller;
    try {
      controller = await create({
        id: dataGetFormularioMaxId[0].max + 1,
        fecha: fecha,
        administrador: "user",
      })
      if(controller === false){
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  }

  const eliminarFormulario = async (id) => {
    let controller;
    try {
      controller = await deleteFormulario({
          id: id,
      })
      if(controller === true){
        setFormContent(formContent.filter(item => item.id !== id))
      }else{
        navigate("/");
      }
    } catch (err) {
      alert("error: " + err);
    }
  }

  function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yyyy: fecha.getFullYear()
    }
    return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
  }


  return(

    <div className="bg-indigo-300">
      <div className="flex justify-center h-screen w-screen items-center ">
        <div className="w-full lg:w-2/4 flex flex-col items-center border-2 bg-white " >
          <h3 className="text-xl font-bold leading-none text-black mt-6">TUS FORMULARIOS</h3>

            <div className="flow-root  mt-6 mb-6 w-full">
              <ul className="divide-y divide-gray-200">
                  
                {
                  (formContent && formContent.length > 0) && formContent.map((formularios) => 

                    <li className="py-2 ">
                      <div className="flex flex-row items-center space-x-4">

                        <div className="flex-1 justify-center content-start min-w-0 ml-6">
                          <p className="text-sm font-medium truncate text-black">
                            Título: {formularios.titulo}
                          </p>
                          <p className="text-sm truncate text-black">
                            Id: {formularios.id}
                          </p>
                        </div>

                        <div className="rounded-md shadow-sm">
                          <Link className="text-black  text-sm bg-white hover:bg-slate-200 border border-slate-400 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" to={'/formularios/'+formularios.id}>
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </span>
                            <span>Editar</span>
                          </Link>
                          {
                            dataGetFormularioMaxId && dataGetFormularioMaxId.length > 0  && dataGetFormularioMaxId[0].max !== null
                            ?
                              <Link className="text-black  text-sm bg-white hover:bg-slate-200 border-y border-slate-400 font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={crearFormularioDuplicado} to={"/duplicarFormulario/"+ formularios.id  +"/" + (dataGetFormularioMaxId[0].max + 1) }>
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 130 130" strokeWidth="6" stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" />
                                </svg>                      
                              </span>
                              <span>Duplicar</span>
                            </Link>
                            :
                            <Link className="text-black  text-sm bg-white hover:bg-slate-200 border-y border-slate-400 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 130 130" strokeWidth="6" stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" />
                                </svg>                      
                              </span>
                              <span>Duplicar desabled</span>
                            </Link>
                          }
                          <button className="mr-6 text-red-600 text-sm bg-white hover:bg-slate-200 border border-slate-400 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => eliminarFormulario(formularios.id)}>
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </span>
                            <span>Borrar</span> 
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>
            </div>

            {
              dataGetFormularioMaxId && dataGetFormularioMaxId.length > 0  && dataGetFormularioMaxId[0].max !== null  
              ?
              <div className="mb-6 rounded-md shadow-sm">
                <Link className="bg-blue-400 text-blue-50 hover:bg-blue-700 text-sm border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={crearFormulario} to={'/crearFormulario/'+ (dataGetFormularioMaxId[0].max + 1)} > Nuevo formulario </Link>
              </div>
              :
              <div className="mb-6 rounded-md shadow-sm">
                <Link className="bg-blue-400 text-blue-50 hover:bg-blue-700 text-sm border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={crearFormulario} to={'/crearFormulario/'+ 0} > Nuevo formulario </Link>
              </div>
            }

        </div>
      </div>

    </div>
  )
}

export default AdministrarFormularios;