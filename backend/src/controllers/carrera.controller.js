"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CarreraService = require("../services/carrera.service");
const CarreraSchema = require("../schema/carrera.schema");
const { handleError } = require("../utils/errorHandler");

async function getCarreras(req, res) {
  try {
    const [carrera, errorCarreras] = await CarreraService.getCarreras();
    if (errorCarreras) return respondError(req, res, 404, errorCarreras);

    carrera.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, carrera);
  } catch (error) {
    handleError(error, "carrera.controller -> getCarreras");
    respondError(req, res, 500, error.message);
  }
}


async function getCarreraById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      CarreraSchema.carreraIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [carrera, errorCarrera] = await CarreraService.getCarreraById(
      params.id,
    );
    if (errorCarrera) return respondError(req, res, 404, errorCarrera);

    respondSuccess(req, res, 200, carrera);
  } catch (error) {
    handleError(error, "carrera.controller -> getCarreraById");
    respondError(req, res, 500, error.message);
  }
}

async function createCarrera(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = CarreraSchema.carreraBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [newCarrera, carreraError] = await CarreraService.createCarrera(body);

    if (carreraError) return respondError(req, res, 400, carreraError);
    if (!newCarrera) {
      return respondError(req, res, 400, "No se creo la carrera");
    }

    respondSuccess(req, res, 201, newCarrera);
  } catch (error) {
    handleError(error, "carrera.controller -> createCarrera");
    respondError(req, res, 500, "No se creo la carrera");
  }
}

async function updateCarrera(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } =
      CarreraSchema.carreraIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = CarreraSchema.carreraBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [updatedCarrera, errorCarrera] = await CarreraService.updateCarrera(
      params.id,
      body,
    );
    if (errorCarrera) return respondError(req, res, 404, errorCarrera);

    respondSuccess(req, res, 200, updatedCarrera);
  } catch (error) {
    handleError(error, "carrera.controller -> updateCarrera");
    respondError(req, res, 500, error.message);
  }
}

async function deleteCarrera(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      CarreraSchema.carreraIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [carrera, errorCarrera] = await CarreraService.deleteCarreraById(
      params.id,
    );
    if (errorCarrera) return respondError(req, res, 404, errorCarrera);

    respondSuccess(req, res, 200, carrera);
  } catch (error) {
    handleError(error, "carrera.controller -> deleteCarrera");
    respondError(req, res, 500, error.message);
  }
}

module.exports = {
  getCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  deleteCarrera,
};
