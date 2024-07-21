"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const EmprendedorService = require("../services/emprendedor.service");
const ProductoService = require("../services/productos.service");
const AyudantesService = require("../services/ayudantes.service");
const EmprendedorSchema = require("../schema/emprendedor.schema");
const { handleError } = require("../utils/errorHandler");

async function getEmprendedores(req, res) {
  try {
    const [emprendedores, errorEmprendedores] =
      await EmprendedorService.getEmprendedores();
    if (errorEmprendedores)
      return respondError(req, res, 404, errorEmprendedores);

    emprendedores.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, emprendedores);
  } catch (error) {
    handleError(error, "emprendedor.controller -> getEmprendedores");
    respondError(req, res, 500, error.message);
  }
}

async function getEmprendedorById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      EmprendedorSchema.emprendedorIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [emprendedor, errorEmprendedor] =
      await EmprendedorService.getEmprendedorById(params.id);
    if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

    respondSuccess(req, res, 200, emprendedor);
  } catch (error) {
    handleError(error, "emprendedor.controller -> getEmprendedorById");
    respondError(req, res, 500, error.message);
  }
}

async function getProductosByEmprendedor(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      EmprendedorSchema.emprendedorIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [productos, errorProductos] =
      await ProductoService.getProductosByEmprendedorId(params.id);
    if (errorProductos) return respondError(req, res, 404, errorProductos);

    productos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, productos);
  } catch (error) {
    handleError(error, "emprendedor.controller -> getProductosByEmprendedor");
    respondError(req, res, 500, error.message);
  }
}

async function getAyudantesByEmprendedor(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      EmprendedorSchema.emprendedorIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [ayudantes, errorAyudantes] =
      await AyudantesService.getAyudantesByEmprendedorId(params.id);
    if (errorAyudantes) return respondError(req, res, 404, errorAyudantes);

    ayudantes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, ayudantes);
  } catch (error) {
    handleError(error, "emprendedor.controller -> getAyudantesByEmprendedor");
    respondError(req, res, 500, error.message);
  }
}

async function createEmprendedor(req, res) {
  try {
    const { body } = req;

    const { error: bodyError } =
      EmprendedorSchema.emprendedorBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [emprendedor, errorEmprendedor] =
      await EmprendedorService.createEmprendedor(body);
    if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

    respondSuccess(req, res, 201, emprendedor);
  } catch (error) {
    handleError(error, "emprendedor.controller -> createEmprendedor");
    respondError(req, res, 500, error.message);
  }
}

async function updateEmprendedor(req, res) {
  try {
    const { body, params } = req;
    const { error: bodyError } =
      EmprendedorSchema.emprendedorBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const { error: paramsError } =
      EmprendedorSchema.emprendedorIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [emprendedor, errorEmprendedor] =
      await EmprendedorService.updateEmprendedor(params.id, body);
    if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

    respondSuccess(req, res, 200, emprendedor);
  } catch (error) {
    handleError(error, "emprendedor.controller -> updateEmprendedor");
    respondError(req, res, 500, error.message);
  }
}

async function deleteEmprendedor(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      EmprendedorSchema.emprendedorIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [emprendedor, errorEmprendedor] =
      await EmprendedorService.deleteEmprendedorById(params.id);
    if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

    respondSuccess(req, res, 200, emprendedor);
  } catch (error) {
    handleError(error, "emprendedor.controller -> deleteEmprendedor");
    respondError(req, res, 500, error.message);
  }
}

module.exports = {
  getEmprendedores,
  getEmprendedorById,
  getProductosByEmprendedor,
  getAyudantesByEmprendedor,
  createEmprendedor,
  updateEmprendedor,
  deleteEmprendedor,
};
