"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ProductosService = require("../services/productos.service");
const ProductosSchema = require("../schema/productos.schema");
const { handleError } = require("../utils/errorHandler");

async function getProductos(req, res) {
    try {
        const [productos, errorProductos] = await ProductosService.getProductos();
        if (errorProductos) return respondError(req, res, 404, errorProductos);

        productos.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, productos);
    } catch (error) {
        handleError(error, "productos.controller -> getProductos");
        respondError(req, res, 400, error.message);
    }
}

async function getProductoById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } =
            ProductosSchema.productosIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [producto, errorProducto] = await ProductosService.getProductoById(
            params.id,
        );
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 200, producto);
    } catch (error) {
        handleError(error, "productos.controller -> getProductoById");
        respondError(req, res, 400, error.message);
    }
}


async function createProducto(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } =
            ProductosSchema.productosBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [producto, errorProducto] = await ProductosService.createProducto(body);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 201, producto);
    } catch (error) {
        handleError(error, "productos.controller -> createProducto");
        respondError(req, res, 400, error.message);
    }
}   

async function updateProducto(req, res) {    
    try {
        const { body, params } = req;
        const { error: bodyError } =
            ProductosSchema.productosBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const { error: paramsError } =
            ProductosSchema.productosIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [producto, errorProducto] = await ProductosService.updateProducto(params.id, body);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 200, producto);
    } catch (error) {
        handleError(error, "productos.controller -> updateProducto");
        respondError(req, res, 400, error.message);
    }
}

async function deleteProducto(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } =
            ProductosSchema.productosIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [producto, errorProducto] = await ProductosService.deleteProducto(params.id);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 200, producto);
    } catch (error) {
        handleError(error, "productos.controller -> deleteProducto");
        respondError(req, res, 400, error.message);
    }
}       

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};