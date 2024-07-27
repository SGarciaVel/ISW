const jwt = require("jsonwebtoken");
const { ACCESS_JWT_SECRET } = process.env;

module.exports = (rolesPermitidos) => {
  return (req, res, next) => {
    console.log("Authorization middleware iniciado");
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No se proporcionó un token válido");
      return res
        .status(401)
        .json({ message: "No se proporcionó un token válido" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token recibido:", token);

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token inválido");
        return res.status(401).json({ message: "Token inválido" });
      }

      console.log("Token válido, role:", decoded.role);
      if (!rolesPermitidos.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "No tienes permisos para acceder a este recurso" });
      }

      req.user = decoded;
      console.log("Autorización exitosa");
      next();
    });
  };
};
