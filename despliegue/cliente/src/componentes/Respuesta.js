import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePreguntas, useFormulario } from "../hooks";
import { useState, useEffect } from "react";
import swal from 'sweetalert2'

function Respuesta(){

  const navigate = useNavigate();
  let {id} = useParams();

  const {dataGetPreguntas}  = usePreguntas(id);
  const {dataGetFormulariosExacto}  = useFormulario(id);

  const [index, setIndex] = useState(0);
  const [preguntaContent, setPreguntaContent] = useState();
  const [formulario, setFormulario] = useState();

  const [numeroPreguntas, setNumeroPreguntas] = useState();
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const [executed, setExecuted] = useState(true);
  const [executedForm, setExecutedForm] = useState(true);
  const [controladorAnterior, setControladorAnterior] = useState(true);
  const [controladorSiguiente, setControladorSiguiente] = useState(false);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    //SOLO si no existe la sesion vuelve a casa 
    if(loggedUser === null){
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if(executed){
      setPreguntaContent(dataGetPreguntas);
      if(preguntaContent && preguntaContent.length > 0){
        setNumeroPreguntas(preguntaContent.length);
        setExecuted(false);
      }
    }    
  }, [dataGetPreguntas,executed,preguntaContent]);

  useEffect(() => {
    if(executedForm){
        setFormulario(dataGetFormulariosExacto);
        if(formulario && formulario.length >= 0){
          setExecutedForm(false);
        }
    }
  }, [dataGetFormulariosExacto, formulario, executedForm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //controlador del boton siguiente cuando hay una pregunta solo
  useEffect(() => {
    if(numeroPreguntas === 1){
      handleBotonesAux();
    }else{
      handleBotones();
      setControladorAnterior(true);
    }
  
  }, [numeroPreguntas]);



  function resetTimer() {
    clearInterval(intervalId);
    setTime(0);
  }

  const guardarTimer = () => {
    let camposFormulario = [...preguntaContent];
    //se suma al anterior para contar el tiempo acumulado por si vuelven atrás
    camposFormulario[index].tiempo = camposFormulario[index].tiempo + time;
    setPreguntaContent(camposFormulario);
  }

  function handleBotonesAux(){
    setControladorSiguiente(true);
    setControladorAnterior(true);
  }

  function handleBotones(a){

    if(a + 1 === numeroPreguntas){
      setControladorSiguiente(true);
    }else{
      setControladorSiguiente(false);
    } 

    if(a === 0){
      setControladorAnterior(true);
    }else{
      setControladorAnterior(false);
    }

  }

  function siguientePregunta ()  {
    resetTimer();
    let a = index + 1;
    setIndex(index + 1);

    //comporbamos que exista una restriccion en la siguiente pregunta
    if(preguntaContent[a].anadirrestriccion === true){
      comprobarDisabled();
    }

    if(preguntaContent[a].anadirrespuestapregunta === true){
      añadirTextoAPregunta();
    }

    handleBotones(a);
  }
  
  const anteriorPregunta =() => {
    let a = index - 1;
    setIndex(index - 1);

    handleBotones(a);
  }

  //guarda la respeusta en la estructura de preguntas
  const asignarRespuestaSimple = (e,id) => {
    const camposFormulario = [...preguntaContent];
    const indice = camposFormulario.findIndex(f => f.id === id);
    if(indice > -1){
      camposFormulario[indice].respuesta = e.target.value;
      setPreguntaContent(camposFormulario);
    } 
  }

  const comprobarDisabled = () => {
    //hay que sumar uno a index por que no se actualiza a tiempo en la funcion siguientePregunta
    const idRestriccion = preguntaContent[index + 1].restriccionid;
    const respuestaRestriccion = preguntaContent[index + 1].restriccionrespuesta;

    const camposFormulario = [...preguntaContent];
    const indice = camposFormulario.findIndex(f => parseInt(f.id) === parseInt(idRestriccion));
    if(indice > -1){
      let respuestaFormulario = camposFormulario[indice].respuesta;
      if(respuestaFormulario === respuestaRestriccion){
        camposFormulario[index+1].disabled = true;
        setPreguntaContent(camposFormulario);
      }else{
        camposFormulario[index+1].disabled = false;
        setPreguntaContent(camposFormulario);
      }
    } 
  }

  const añadirTextoAPregunta = () => {
    const idCompletar = preguntaContent[index + 1].anadirrespuestapreguntaid;
    const camposFormulario = [...preguntaContent];  
    const indice = camposFormulario.findIndex(f => parseInt(f.id) === parseInt(idCompletar));
    if(indice > -1){
      let respuestaFormulario = camposFormulario[indice].respuesta;
      //camposFormulario[index+1].nombrepregunta =  camposFormulario[index+1].nombrepregunta.replace('$',respuestaFormulario);
    }
    setPreguntaContent(camposFormulario);
  }

  const calcularIndiceMultiple = (valueMultiple, campos) => {
    let camposFormulario = [...preguntaContent];
    let index = camposFormulario.findIndex(f => f.id === campos);
    if(index > -1){
      for (let i = 0; i < 20; i++) {
        if(camposFormulario[index].list[i] === valueMultiple){
          let indiceMultiple = i;

          if(camposFormulario[index].listmultiple[indiceMultiple] === "false"){
            camposFormulario[index].listmultiple[indiceMultiple] = "true";

            camposFormulario[index].marcadasmultiple += 1;
            if(camposFormulario[index].marcadasmultiple < camposFormulario[index].maxmultiple){
              let a = Math.abs(camposFormulario[index].marcadasmultiple - camposFormulario[index].maxmultiple);
              alert("Te quedan por marcar " + a + " opcion/es");
            }
            if(camposFormulario[index].marcadasmultiple > camposFormulario[index].maxmultiple){
              let a = Math.abs(camposFormulario[index].marcadasmultiple - camposFormulario[index].maxmultiple);
              alert("No puedes marcar mas casillas, debes eliminar " + a + " opcion/es");
            }
            if(camposFormulario[index].marcadasmultiple === camposFormulario[index].maxmultiple){
              alert("Aún puedes marcar más opciones");
            }                  

          }else{
            
            camposFormulario[index].listmultiple[indiceMultiple] = "false";

            camposFormulario[index].marcadasmultiple -= 1;
            if(camposFormulario[index].marcadasmultiple > camposFormulario[index].maxmultiple){
              let a = Math.abs(camposFormulario[index].marcadasmultiple - camposFormulario[index].maxmultiple);
              alert("No puedes marcar mas casillas, debes eliminar " + a + " opcion/es");
            }
            if(camposFormulario[index].marcadasmultiple === camposFormulario[index].maxmultiple){
              alert("No puedes marcar más opciones");
            }
            if(camposFormulario[index].marcadasmultiple < camposFormulario[index].maxmultiple){
              let a = Math.abs(camposFormulario[index].marcadasmultiple - camposFormulario[index].maxmultiple);
              alert("Aún puedes marcar " + a + " opcion/es");
            }

          }

        }

      }

      setPreguntaContent(camposFormulario);
    }
  }

return(
  <>
      <div className='w-full bg-indigo-300 h-screen text-center'>
        <div className="justify-center items-center">
          <div className="flex flex-col items-center ">
            <div className="mt-12 w-4/6 border-4 border-black  p-2 text-start">

              {
                (formulario && formulario.length > 0) && formulario.map((campos) => {
                  return (
                    <div className="mb-2">
                      <p className="text-4xl text-center w-full mb-2 rounded-lg ">{campos.titulo}</p>
                      <p className="text-xl text-black text-center">{campos.descripcion}</p>
                    </div>
                  )
                })
              }
            
              {     
                (preguntaContent && preguntaContent.length > 0)
                ?
                <div className="border-2 border-black rounded-lg ml-6 mr-6 mt-6 mb-1 p-2 bg-slate-300">
                  <div className="ml-1 text-left">
                    <p>tiempo: {time}</p>
                    <p>tiempo anterior: {preguntaContent[index].tiempo}</p>
                  </div>

                  <div className="flex flex-row justify-start text-left">
                    <p className="text-xl ">{preguntaContent[index].nombrepregunta}</p>
                    {
                      preguntaContent[index].obligatorio ? <span className="text-red-900 ml-2">* obligatoria</span> : <span className="text-red-900"> </span>
                    }
                  </div>
                  {/******************************************** */}
                  
                  <div >
                    {
                    //si se pulsa el boton de añadir imagen, el atributo anadirimagen se cambia a true y muestra el menu de añadir imagen
                      preguntaContent[index].anadirimagen
                      ?
                        <div className="mt-2 flex flex-row text-center">
                          {/* se muestra el archivo seleccionado*/}
                          {preguntaContent[index].imagenpreview.map((item) =><img src={item} className="w-40 h-40 border-2 border-black mr-2" alt='imagen'></img>)}  
                        </div>
                      :
                        //en caso de ser false anadirimagen no se muestra nada
                        null
                    }
                  </div>
                  
                  <div>
                    {
                      preguntaContent[index].tipopregunta === 'Respuesta corta' && <input className="mt-2 rounded-md block w-full" disabled={preguntaContent[index].disabled} required={preguntaContent[index].obligatorio} type="text" onChange={(e) => asignarRespuestaSimple(e, preguntaContent[index].id)} placeholder={preguntaContent[index].respuesta}/>
                    }
                    {
                      preguntaContent[index].tipopregunta === 'Respuesta larga' && <textarea  className="mt-2 w-full" disabled={preguntaContent[index].disabled} required={preguntaContent[index].obligatorio} rows={3} onChange={(e) => asignarRespuestaSimple(e, preguntaContent[index].id)} placeholder={preguntaContent[index].respuesta}/>
                    } 
                    {
                      preguntaContent[index].tipopregunta === 'Fecha' && <input className="mt-2 rounded-md block w-full" type="date" disabled={preguntaContent[index].disabled} required={preguntaContent[index].obligatorio} onChange={(e) => asignarRespuestaSimple(e, preguntaContent[index].id)}/> 
                    }
                    {
                      preguntaContent[index].tipopregunta === 'Respuesta numerica' && <input className="mt-2 rounded-md block w-full" disabled={preguntaContent[index].disabled} required={preguntaContent[index].obligatorio} type="number" onChange={(e) => asignarRespuestaSimple(e, preguntaContent[index].id)} placeholder={preguntaContent[index].respuesta}/>
                    }
                    {
                      preguntaContent[index].tipopregunta === 'Respuesta unica' && 
                      <div className="mt-2 text-center">
                        <div>
                          <select required={preguntaContent[index].obligatorio} disabled={preguntaContent[index].disabled} className="cursor-pointer rounded-lg border-2 border-black" onChange={(e) => asignarRespuestaSimple(e, preguntaContent[index].id)}>
                            <option value="none" defaultValue></option>
                            {preguntaContent[index].list.map((item) => <option key={item} value={item}>{item}</option>)}
                          </select>
                        </div>          
                        <div className="mt-2">
                          {
                            preguntaContent[index].anadirotro
                            ?
                              <div>
                                <label> {preguntaContent[index].contenidootro} </label>  <input className=" rounded-lg border-2 border-black" type="text" placeholder="introduce tu otra respuesta" />                            
                              </div>
                            :
                              null
                          }
                        </div>

                      </div>
                    }
                    {
                      preguntaContent[index].tipopregunta === 'Escala' && 
                      <div className="mt-2 flex flex-row flex-1 justify-center ml-5">
                        {preguntaContent[index].list.map((item) => <label className="mr-7" ><input disabled={preguntaContent[index].disabled} required={preguntaContent[index].obligatorio} type="radio" name={preguntaContent[index].contadorescalatextual} value={item} onChange={(e) => asignarRespuestaSimple(e, preguntaContent[index].id)  } label={item}/> {item} </label>)}
                      </div>
                    }
                    {
                      preguntaContent[index].tipopregunta === 'Respuesta multiple' && 
                      <div className="mt-2 flex flex-row flex-1 justify-center ml-5">
                        {preguntaContent[index].list.map((item) => <label className="mr-7"><input disabled={preguntaContent[index].disabled} required={preguntaContent[index].obligatorio} id={item} className="rounded-xl form-checkbox h-4 w-4 cursor-pointer" onChange={(e) => calcularIndiceMultiple(e.target.value, preguntaContent[index].id)} type="checkbox" name="respuestamultiple" value={item} label={item}/> {item} </label>)}
                        {
                          preguntaContent[index].anadirotro
                          ?
                            <div>
                              <label> {preguntaContent[index].contenidootro} </label>  <input className=" rounded-lg border-2 border-black" type="text" placeholder="introduce tu otra respuesta" />                            
                            </div>                            
                          : 
                            null
                        }
                      </div>
                    }
                  </div>
                  
                </div>
                :
                null
              }
                      



              <div className="ml-6 text-center">
                <button className={!controladorAnterior ? "bg-gray-800 hover:bg-gray-700 items-center p-1 text-sm text-white rounded-md mt-2" : "bg-gray-400 hover:bg-gray-300 items-center p-1 text-sm text-white rounded-md mt-2"} disabled={controladorAnterior} onClick={() => {anteriorPregunta(); resetTimer()}}> Anterior</button>
                <button className={!controladorSiguiente ? "bg-gray-800 hover:bg-gray-700 items-center p-1 text-sm text-white rounded-md mt-2 ml-6" : "bg-gray-400 hover:bg-gray-300 items-center p-1 text-sm text-white rounded-md mt-2 ml-6"} disabled={controladorSiguiente} onClick={() => {siguientePregunta(); guardarTimer()}}> Siguiente</button>
                <button className="bg-gray-800 hover:bg-gray-700 items-center p-1 text-sm text-white rounded-md ml-6 mt-2" onClick={() => {guardarTimer();resetTimer()}}> submit</button>
              </div>

            </div>
          </div>
        </div>
      </div>
  </>
)

}

export default Respuesta;