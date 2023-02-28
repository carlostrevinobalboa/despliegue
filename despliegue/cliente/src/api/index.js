
let __instance = null

export default class API {

    static instance() {
        
        if (__instance == null)
            __instance = new API()

        return __instance
    }

    async getUsuarios(user) {
        let miRespuesta;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: user.usuario, contrasena: user.contrasena }),
        }

        const response = await fetch('/login', requestOptions)
            .catch(error => console.log("error " + error))


        if (response.status === 200) {
            return [true, response.json()];
        } else if (response.status === 401) {
            return false;
        }
        return ''
    }

    async insertUsuarios(user) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: user.usuario, contrasena: user.contrasena }),
        }

        const response = await fetch('/registro', requestOptions).catch(error => console.log("error " + error))

        if (response.status === 200) {
            return await true;
        }else if (response.status === 401) {
            return await false
        }

        return ''
    }

    //done
    async insertPreguntas(formularios) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ 
                id: formularios.id,
                nombrePregunta: formularios.nombrePregunta,
                etiqueta: formularios.etiqueta,
                tipoPregunta: formularios.tipoPregunta,
                respuesta: formularios.respuesta,
                respuestaMultiple: formularios.respuestaMultiple,
                list: formularios.list,
                listMultiple: formularios.listMultiple,
                maxMultiple: formularios.maxMultiple,
                MarcadasMultiple: formularios.MarcadasMultiple,
                obligatorio: formularios.obligatorio,
                contadorEscalaTextual: formularios.contadorEscalaTextual,
                anadirImagen: formularios.anadirImagen,
                imagen: formularios.imagen,
                imagenPreview: formularios.imagenPreview,
                anadirOtro: formularios.anadirOtro,
                contenidoOtro: formularios.contenidoOtro,
                anadirRestriccion: formularios.anadirRestriccion,
                restriccionId: formularios.restriccionId,
                restriccionRespuesta: formularios.restriccionRespuesta,
                anadirRespuestaPregunta: formularios.anadirRespuestaPregunta,
                anadirRespuestaPreguntaId: formularios.anadirRespuestaPreguntaId,
                disabled: formularios.disabled,
                tiempo: formularios.tiempo,
                idForm: formularios.formulario
                 }),
            }

            const response = await fetch('/preguntasFormulario', requestOptions).catch(error => console.log("error " + error))

            if (response.status === 200) {
                console.log("index api 200")
                return true;
            }else if(response.status === 401){
                console.log("index error 401")
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }
            
        }else{
            return false;
        }

        return ''
    }

    //done
    async updatePreguntas(formularios) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);


            const requestOptions = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ 
                id: formularios.id,
                nombrePregunta: formularios.nombrePregunta,
                etiqueta: formularios.etiqueta,
                tipoPregunta: formularios.tipoPregunta,
                respuesta: formularios.respuesta,
                respuestaMultiple: formularios.respuestaMultiple,
                list: formularios.list,
                listMultiple: formularios.listMultiple,
                maxMultiple: formularios.maxMultiple,
                MarcadasMultiple: formularios.MarcadasMultiple,
                obligatorio: formularios.obligatorio,
                contadorEscalaTextual: formularios.contadorEscalaTextual,
                anadirImagen: formularios.anadirImagen,
                imagen: formularios.imagen,
                imagenPreview: formularios.imagenPreview,
                anadirOtro: formularios.anadirOtro,
                contenidoOtro: formularios.contenidoOtro,
                anadirRestriccion: formularios.anadirRestriccion,
                restriccionId: formularios.restriccionId,
                restriccionRespuesta: formularios.restriccionRespuesta,
                anadirRespuestaPregunta: formularios.anadirRespuestaPregunta,
                anadirRespuestaPreguntaId: formularios.anadirRespuestaPreguntaId,
                disabled: formularios.disabled,
                tiempo: formularios.tiempo,
                idForm: formularios.formulario
                }),
            }

            const response = await fetch('/preguntasFormulario', requestOptions).catch(error => console.log("errorApiCliente " + error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }


        return ''
    }

    //done
    async deletePreguntas(id) {
        
        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }

            const response = await fetch(`/preguntasFormulario/${id.id}/${id.formulario}`, requestOptions).catch(error => console.log(error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }
        }else{
            return false;
        }

        return ''
    }

    //done
    async getPreguntas(id) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }

            const response = await fetch(`/preguntasFormulario/${id}`, requestOptions).catch(error => console.log("error " + error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }

        return ''
    }

    //done
    async getPreguntaMaxId(id) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }

            const response = await fetch(`/preguntasFormularioMaxId/${id}`, requestOptions).catch(error => console.log("error " + error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }
        
        }else{
            return false;
        }

        return ''
    }

    //done
    async getPreguntasIds(id) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }

            const response = await fetch(`/preguntasFormulario/${id}`, requestOptions).catch(error => console.log("error " + error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }

        return ''
    }
    
    //done
    async getFormularios() {
        
        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);
            
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }

            const response = await fetch('/formulario', requestOptions).catch(error => console.log("error " + error))

            
            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }
        
        return ''
    }

    //done
    async getFormulariosExacto(idFormulario) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }
        
            const response = await fetch(`/formularioExacto/${idFormulario}`, requestOptions).catch(error => console.log("error " + error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }


        return ''
    }

    //done
    async getFormulariosMaxId() {
        
        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            }

            const response = await fetch('/formularioMaxId', requestOptions).catch(error => console.log("error " + error))

            if (response.status === 200) {
                return await response.json()
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }
        
        return ''
    }

    //done
    async insertFormularios(formulario) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ id: formulario.id, fecha:formulario.fecha, administrador: formulario.administrador }),
            }
    
            const response = await fetch('/formulario', requestOptions).catch(error => console.log("errorApiCliente " + error))

            if (response.status === 200) {
                return true;
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }

        return ''
    }

    //done
    async updateFormularios(formulario) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ titulo: formulario.titulo, descripcion: formulario.descripcion, id: formulario.id}),
            }

            const response = await fetch('/formulario', requestOptions).catch(error => console.log("errorApiCliente " + error))

            if (response.status === 200) {
                return true
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }

        return ''
    }

    //done
    async deleteFormularios(id) {

        const sesionString = window.localStorage.getItem("loggedUser");

        if(sesionString !== null){

            const sesionJson = JSON.parse(sesionString);
            const bearer = "bearer";
            let token = bearer.concat(" ", sesionJson.token);

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
            }

            const response = await fetch(`/formulario/${id.id}`, requestOptions).catch(error => console.log(error))

            if (response.status === 200) {
                return true;
            }else if(response.status === 401){
                //si el token es erroneo se borra la sesion y se le manda al login
                localStorage.clear()
                return false;
            }

        }else{
            return false;
        }

        return ''
    }


}