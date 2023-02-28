const Pool = require('pg').Pool
const jwt = require('jsonwebtoken')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prueba',
  password: 'hola',
  port: 5432,
});

const confirmUsuarios = (body) => {
  return new Promise(function(resolve, reject) {
    const { usuario, contrasena } = body  
    pool.query('SELECT * FROM usuarios where nombre = $1 AND contraseña = $2', [usuario, contrasena], (error, results) => {
      if (results.rowCount === 0) {
        reject(["Credenciales no registradas"]);
      }else{

        const userForToken = {
          user: usuario
        }

        const token = jwt.sign(userForToken, '123')
        
        resolve({usuario: usuario, token: token});
      }
    })
  }) 
}

const insertUsuarios = (body) => {
  return new Promise(function(resolve, reject) {
    const { usuario, contrasena } = body  
    pool.query('SELECT * FROM usuarios where nombre = $1', [usuario], (error, results) => {
      if (results.rowCount !== 0) {
        reject(["usuario no disponible"])
      }else{
        pool.query('INSERT INTO usuarios (nombre, contraseña) VALUES ($1, $2)', [usuario, contrasena], (error, results) => {
          if (error) {        
            console.log(error)
            reject(error)
          }else{
            resolve(["Usuario añadido"])
          }
        })
      }
    })
  }) 
}

const getPreguntas = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('select * from pregunta where formulario = $1 order by id asc',[id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getPreguntaMaxId = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('select max(id) FROM pregunta WHERE formulario = $1',[id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getPreguntasIds = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT id FROM pregunta WHERE formulario = $1',[id], (error, results) => {
      if (error) {
        reject(error)
      }else{
        resolve(results.rows);
      }
    })
  }) 
}

const insertPreguntas = (body) => {

  return new Promise(function(resolve, reject) {
    const {id, nombrePregunta, etiqueta, tipoPregunta, respuesta, respuestaMultiple, list, listMultiple, maxMultiple, MarcadasMultiple, obligatorio, contadorEscalaTextual, anadirImagen, imagen, imagenPreview, anadirOtro, contenidoOtro, anadirRestriccion, restriccionId, restriccionRespuesta, anadirRespuestaPregunta, anadirRespuestaPreguntaId, disabled, tiempo, idForm} = body  
    pool.query('INSERT INTO pregunta (id, nombrepregunta, etiqueta, tipopregunta, respuesta, respuestamultiple, list, listmultiple, maxmultiple, marcadasmultiple, obligatorio, contadorescalatextual, anadirimagen, imagen, imagenpreview, anadirotro, contenidootro, anadirrestriccion, restriccionid, restriccionrespuesta, anadirrespuestapregunta, anadirrespuestapreguntaid, disabled, tiempo, formulario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25 )', [id, nombrePregunta, etiqueta, tipoPregunta, respuesta, respuestaMultiple, list, listMultiple, maxMultiple, MarcadasMultiple, obligatorio, contadorEscalaTextual, anadirImagen, imagen, imagenPreview, anadirOtro, contenidoOtro, anadirRestriccion, restriccionId, restriccionRespuesta, anadirRespuestaPregunta, anadirRespuestaPreguntaId, disabled, tiempo, idForm], (error, results) => {
      if (error) {        
        reject(error)
      }else{
        console.log("api correcto")
        resolve(["todo ha salido correctamente"])
      }
    })
  })
}

const updatePreguntas = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, nombrePregunta, etiqueta, tipoPregunta, respuesta, respuestaMultiple, list, listMultiple, maxMultiple, MarcadasMultiple, obligatorio, contadorEscalaTextual, anadirImagen, imagen, imagenPreview, anadirOtro, contenidoOtro, anadirRestriccion, restriccionId, restriccionRespuesta, anadirRespuestaPregunta, anadirRespuestaPreguntaId, disabled, tiempo, idForm } = body  
    pool.query('UPDATE pregunta SET nombrepregunta = $2, etiqueta = $3, tipopregunta = $4, respuesta = $5, respuestamultiple = $6, list = $7, listmultiple = $8, maxmultiple = $9, marcadasmultiple = $10, obligatorio = $11, contadorescalatextual = $12, anadirimagen = $13, imagen = $14, imagenpreview = $15, anadirotro = $16, contenidootro = $17, anadirrestriccion = $18, restriccionid = $19, restriccionrespuesta = $20, anadirrespuestapregunta = $21, anadirrespuestapreguntaid = $22, disabled = $23, tiempo = $24 WHERE id = $1 AND formulario = $25', [id, nombrePregunta, etiqueta, tipoPregunta, respuesta, respuestaMultiple, list, listMultiple, maxMultiple, MarcadasMultiple, obligatorio, contadorEscalaTextual, anadirImagen, imagen, imagenPreview, anadirOtro, contenidoOtro, anadirRestriccion, restriccionId, restriccionRespuesta, anadirRespuestaPregunta, anadirRespuestaPreguntaId, disabled, tiempo, idForm], (error, results) => {
      if (error) {        
        reject("errorApiServidor" + error)
      }
      resolve(["todo ha salido bien"])
    })
  })
}

const deletePreguntas = (id, formulario) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM pregunta WHERE id = $1 and formulario = $2', [id, formulario], (error, results) => {
      if (error) {        
        reject(error)
      }
      resolve(["todo ha salido bien"])
    })
  })
}

const getFormularios = () => {
  return new Promise(function(resolve, reject) {
    pool.query('select * from formulario order by id asc', (error, results) => {
      if (error) {
        reject(error)
      }else{
        resolve(results.rows);
      }
      
    })
  }) 
}

const getFormulariosExacto = (idFormulario) => {
  return new Promise(function(resolve, reject) {
    pool.query('select * from formulario where id = $1',[idFormulario], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getFormulariosMaxId = () => {
  return new Promise(function(resolve, reject) {
    pool.query('select max(id) from formulario', (error, results) => {
      if (error) {
        reject(error)
      }else{
        resolve(results.rows);
      }
      
    })
  }) 
}

const insertFormularios = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, fecha, administrador } = body  
    pool.query('INSERT INTO formulario (id,fecha, administrador) VALUES ($1, $2, $3)', [id,fecha, administrador], (error, results) => {
      if (error) {        
        reject("errorApiServidor" + error)
      }
      resolve(["todo ha salido bien"])
    })
  })
}

const updateFormularios = (body) => {
  return new Promise(function(resolve, reject) {
    const { titulo, descripcion, id } = body  
    pool.query('UPDATE formulario SET titulo = $1, descripcion = $2 WHERE id = $3', [titulo, descripcion, id], (error, results) => {
      if (error) {        
        reject("errorApiServidor" + error)
      }
      resolve(["todo ha salido bien"])
    })
  })
}

const deleteFormularios = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM formulario WHERE id = $1', [id], (error, results) => {
      if (error) {        
        reject(error)
      }else{
        resolve(["todo ha salido bien"])
      }
    })
  })
}

module.exports = {
  confirmUsuarios,
  insertUsuarios,
  getPreguntas,
  getPreguntasIds,
  getPreguntaMaxId,
  insertPreguntas,
  updatePreguntas,
  deletePreguntas,
  getFormularios,
  getFormulariosExacto,
  insertFormularios,
  updateFormularios,
  deleteFormularios,
  getFormulariosMaxId,
}