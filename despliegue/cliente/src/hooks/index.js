import { useState, useEffect } from 'react'
import API from '../api'

export function useRegistro() {
    
    const create = user => API.instance().insertUsuarios(user)
        .then(respuesta => {return respuesta})
    
    return {create}
}

export function useLogin() {

    const create = user => API.instance().getUsuarios(user)
        .then(respuesta => {return respuesta}) //recibo o un 200 o un 500 en true o false
    
    return {create}
}

export function usePreguntas(id) {
    const [data, setData] = useState({})
    const [dataIds, setDataIds] = useState({})
    const [dataIdMax, setDataIdMax] = useState({})


    useEffect(() => {
        API.instance().getPreguntas(id)
            .then(formularios => {
                setData(formularios)
            })
    }, [id])

    useEffect(() => {
        API.instance().getPreguntaMaxId(id)
            .then(maxId => {
                setDataIdMax(maxId)
            })
    }, [id])

    useEffect(() => {
        API.instance().getPreguntasIds(id)
            .then(pregunta => {
                setDataIds(pregunta)
            })
    }, [id])

    const updatePreguntas = pregunta => API.instance().updatePreguntas(pregunta)
    .then(respuesta => {return respuesta})

    const create = user => API.instance().insertPreguntas(user)
    .then(respuesta => {return respuesta}) //marcadas multiple entra con 0

    const deletePreguntas = (id) => API.instance().deletePreguntas(id)
    .then(respuesta => {return respuesta})

    return {dataGetPreguntas:data,dataGetIdsPregunta:dataIds, dataGetPreguntaMaxId:dataIdMax, updatePreguntas, deletePreguntas, create}
}

export function useFormulario(idFormulario) {
    const [data, setData] = useState({})
    const [dataExacto, setDataExacto] = useState({})
    const [id, setId] = useState({})

    useEffect(() => {
        API.instance().getFormularios()
            .then(formularios => {
                setData(formularios)
            })
    }, [])

    useEffect(() => {
        API.instance().getFormulariosExacto(idFormulario)
            .then(formulario => {
                setDataExacto(formulario)
            })
    }, [idFormulario])

    useEffect(() => {
        API.instance().getFormulariosMaxId()
            .then(idForm => {
                setId(idForm)
            })
    }, [])

    const create = formulario => API.instance().insertFormularios(formulario)
    .then(formulario => {return formulario})

    const updateFormulario = formulario => API.instance().updateFormularios(formulario)
    .then(respuesta => {return respuesta})

    const deleteFormulario = id => API.instance().deleteFormularios(id)
    .then(respuesta => {return respuesta})

    return {dataGetFormulario:data,dataGetFormulariosExacto:dataExacto, dataGetFormularioMaxId:id ,create, deleteFormulario, updateFormulario}
}