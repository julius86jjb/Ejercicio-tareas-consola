const optionDesc = {
    demand: true, //obligatorio
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true, // valor por defecto
    desc: 'Marca la tarea como completada'
}



const argv = require('yargs')
    .command('crear', 'Crear una nueva tarea', optionDesc)
    .command('actualizar', 'Actualiza la tarea a "completada"', optionDesc, completado)
    .command('borrar', 'Borra una  tarea', optionDesc)
    .help()
    .argv;


module.exports = {
    argv
}