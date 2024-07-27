const jwt = require("jsonwebtoken");
const { ACCESS_JWT_SECRET } = process.env;

module.exports = (rolesPermitidos) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No se proporcionó un token válido" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      if (!rolesPermitidos.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "No tienes permisos para acceder a este recurso" });
      }

      req.user = decoded;
      next();
    });
  };
};
