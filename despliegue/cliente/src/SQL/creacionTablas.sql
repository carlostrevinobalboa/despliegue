CREATE TABLE Usuarios (
    nombre varchar(16) NOT NULL,
    contraseña varchar(16) NOT NULL,
    primary key (nombre)
);

CREATE TABLE Encuestado(
    nombre varchar(16) NOT NULL,
    primary key (nombre),
    foreign key (nombre) REFERENCES Usuarios on delete cascade on update cascade
);

CREATE TABLE Administrador(
    nombre varchar(16) NOT NULL,
    primary key (nombre),
    foreign key (nombre) REFERENCES Usuarios on delete cascade on update cascade
);

CREATE TABLE Formulario (
    id int NOT NULL,
    titulo varchar(100),
    fecha date NOT NULL,
    descripcion varchar(200),
    administrador varchar(16) NOT NULL,
    primary key (id),
    foreign key (administrador) REFERENCES Usuarios on delete cascade on update cascade
);

CREATE TABLE Responder (
    etiqueta varchar(50),
    respuesta varchar(500),
    tiempo int,
    formulario int NOT NULL,
    usuario varchar(16) NOT NULL,
    primary key (formulario, usuario),
    foreign key (usuario) REFERENCES Usuarios on delete cascade on update cascade,
    foreign key formulario REFERENCES Formulario on delete cascade on update cascade
);

CREATE TABLE Pregunta (
    id int NOT NULL,
    nombrePregunta varchar(100),
    etiqueta varchar(100),
    tipoPregunta varchar(30),
    respuesta varchar(500),
    respuestaMultiple text[],
    list text[],
    listMultiple text[],
    maxMultiple int,
    MarcadasMultiple int,
    obligatorio boolean,
    contadorEscalaTextual varchar,
    anadirImagen boolean,
    imagen text[],
    imagenPreview text[],
    anadirOtro boolean,
    contenidoOtro varchar,
    anadirRestriccion boolean,
    restriccionId varchar,
    restriccionRespuesta varchar,
    anadirRespuestaPregunta boolean,
    anadirRespuestaPreguntaId varchar,
    disabled boolean,
    tiempo int,
    formulario int NOT NULL,
    primary key (id, formulario),
    foreign key (formulario) REFERENCES Formulario on delete cascade on update cascade
);


