"use strict";
// Importa el modelo de datos 'carerra'
const Carrera = require("../models/carrera.model");
const { handleError } = require("../utils/errorHandler");

// Funciones con lógica de interacción con la base de datos en MongoDB

/*  Async: operaciones que tardan tiempo en completarse sin bloquear el hilo de ejecución principal.
    await: Esperar a que la promesa se resuelva y devuelva el resultado.
    promesas: objetos que representan el resultado eventual (éxito o fracaso)*/

async function getCarreras() {
  try {
    //devuelve un array con los documentos de la colección "Carrera"
    const carreras = await Carrera.find();
    //si el array está vacío, devuelve un mensaje de error
    if (carreras == 0) return [null, "No hay carreras"];

    return [carreras, null];
  } catch (error) {
    handleError(error, "carreras.service -> getCarreras");
  }
}

async function createCarrera(carrera) {
  try {
    //se pasa un objeto "carrera" como argumento, luego se desestructura para obtener los campos "titulo", "facultad" y "sede"
    const { titulo, facultad, sede } = carrera;

    const carreraFound = await Carrera.findOne({ nombre: carrera.nombre });
    if (carreraFound) return [null, "La carrera ya existe"];

    const newCarrera = new Carrera({
      titulo,
      facultad,
      sede,
    });
    await newCarrera.save();

    return [newCarrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> createCarrera");
  }
}

async function getCarreraById(id) {
  try {
    //se realiza una búsqueda por el identificador único, pasando el valor del identificador directamente como argumento.
    const carrera = await Carrera.findById(id);
    if (!carrera) return [null, "Carrera no encontrada"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> getCarreraById");
  }
}

async function updateCarreraById(id, updatedCarrera) {
  try {
    const carreraFound = await Carrera.findById(id);
    if (!carreraFound) return [null, "Carrera no encontrada"];

    //Devuelve el documento modificado después de la actualización.
    const carrera = await Carrera.findByIdAndUpdate(id, updatedCarrera, {
      new: true,
    });
    if (!carrera) return [null, "Carrera no modificada"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> updateCarreraById");
  }
}

async function deleteCarreraById(id) {
  try {
    const carreraFound = await Carrera.findById(id);
    if (!carreraFound) return [null, "Carrera no encontrada"];

    const carrera = await Carrera.findByIdAndDelete(id);
    if (!carrera) return [null, "Carrera no eliminada"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> deleteCarreraById");
  }
}

module.exports = {
  getCarreras,
  createCarrera,
  getCarreraById,
  updateCarreraById,
};
