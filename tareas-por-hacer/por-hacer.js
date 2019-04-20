const fs = require('fs');

let listado_por_hacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listado_por_hacer);
    return new Promise((resolve, reject) => {
        fs.writeFile('./db/data.json', data, (err) => {
            if (err)
                rejec(err)
            else
                resolve('Se ha registrado la tarea en el archivo "por-hacer.json"');
        });
    });
}

const cargarDB = () => {

    try {
        listado_por_hacer = require('../db/data.json'); //podriamos hacer una peticion http para cargar ese archivo...pero como estamos en un lenguaje del lado del servidor...con el require tira millas...
        // al detectar que es un archivo json...lo serializa y lo conviere en un objeto JS valido
    } catch (err) {
        listado_por_hacer = [];
    }


}



const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    }

    listado_por_hacer.push(porHacer);

    return porHacer;
}


const getListado = () => {
    cargarDB();
    return listado_por_hacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listado_por_hacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listado_por_hacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listado_por_hacer.filter(tarea => {
        tarea.descripcion !== descripcion;
    })

    if (listado_por_hacer.length === nuevoListado.length) {
        return false;
    } else {
        listado_por_hacer = nuevoListado;
        guardarDB();
        return true
    }
    // let index = listado_por_hacer.findIndex((tarea) => {
    //     return tarea.descripcion === descripcion;
    // });
    // console.log(index);
    // if (index >= 0) {
    //     listado_por_hacer.splice(index, 1);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }

}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}