"use strict";
// Autorizacion - Comprobar el rol del usuario
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const Emprendedor = require("../models/emprendedor.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

const { ACCESS_JWT_SECRET } = process.env;

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      state: "Error",
      message: "No autorizado",
      details: "No hay token valido",
    });

  jwt.verify(token, ACCESS_JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        state: "Error",
        message: "No autorizado",
        details: "Token invalido",
      });

    req.email = user.email;
    next();
  });
}

async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

// Comprueba si el usuario es Emprendedor
async function isEmprendedor(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const emprendedor = await Emprendedor.find({ userId: user.id });
    if (emprendedor) {
      next();
    } else {
      return respondError(
        req,
        res,
        401,
        "Se requiere un rol de emprendedor para realizar esta acción",
      );
    }
  } catch (error) {
    handleError(error, "authorization.middleware -> isEmprendedor");
  }
}

/**
 * Comprueba si el usuario es un administrador o si es el propietario de los datos, y permitiría el acceso a la ruta en cualquiera de esos casos.
  1.- A través del token JWT se obtiene el email del usuario
  2.- Si el id del usuario es igual al id del usuario que se quiere modificar, se permite la acción
 */
async function isOwnerOrAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });

    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    if (user.id.toString() === req.body.userId) {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "El usuario NO es el propietario de los datos o no tiene rol de administrador",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isOwnerOrAdmin");
  }
}

async function isOwnerOrAdminParams(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    if (user.id.toString() === req.params.id) {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "El usuario NO es el propietario de los datos o no tiene rol de administrador",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isOwnerOrAdmin");
  }
}

async function isBusinessOwnerOrAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    const emprendedor = await Emprendedor.findOne({ userId: user.id });

    if (req.params.id === emprendedor._id.toString()) {
      next();
      return;
    }

    if (req.body.emprendedorId === emprendedor._id.toString()) {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "El usuario NO es el propietario de los datos o no tiene rol de administrador",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isBusinessOwnerOrAdmin");
  }
}

// Middlewares para actividades

async function isAdminOrManagement(req, res, next) {
  console.log("Pasando por isAdminOrManagement middleware");
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin" || roles[i].name === "encargado") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador o de gestión para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdminOrManagement");
  }
}

async function isAdminOrManagementOrBusinessOwner(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin" || roles[i].name === "encargado") {
        next();
        return;
      }
    }

    const emprendedor = await Emprendedor.findOne({ userId: user.id });

    console.log("emprendedor._id: ", emprendedor._id.toString());
    console.log("req.params.id: ", req.params.id);
    if (req.params.id === emprendedor._id.toString()) {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "El usuario NO es el propietario de los datos o no tiene rol de administrador o de gestión",
    );
  } catch (error) {
    handleError(
      error,
      "authorization.middleware -> isAdminOrManagementOrBusinessOwner",
    );
  }
}

module.exports = {
  authenticateToken,
  isAdmin,
  isOwnerOrAdmin,
  isOwnerOrAdminParams,
  isBusinessOwnerOrAdmin,
  isAdminOrManagement,
  isAdminOrManagementOrBusinessOwner,
};
