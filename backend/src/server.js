const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { PORT, HOST } = require("./config/configEnv.js");

// Importa las rutas
const indexRoutes = require("./routes/indexPrueba.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const inscripcionRoutes = require("./routes/inscripcionPrueba.routes.js");
const postulanteRoutes = require("./routes/postulante.routes");
const productoRoutes = require("./routes/productos.routes");
const authorizationMiddleware = require("./middlewares/authorizationPrueba.middleware");
const { setupDB } = require("./config/configDB.js");
const { handleFatalError, handleError } = require("./utils/errorHandler.js");
const { createRoles, createUsers, newRoles } = require("./config/initialSetup");

async function setupServer() {
  try {
    const server = express();
    server.disable("x-powered-by");

    // Configuración de CORS
    server.use(cors({ credentials: true, origin: true }));

    // Middlewares
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cookieParser());
    server.use(morgan("dev"));

    // Rutas
    server.use("/api", indexRoutes);
    server.use("/api", authRoutes);
    server.use("/api", inscripcionRoutes);
    server.use("/api", postulanteRoutes);
    server.use("/api/productos", productoRoutes);

    // Ruta de login
    server.post("/api/login", (req, res) => {
      const { email, password } = req.body;
      if (email === "test@example.com" && password === "password") {
        res.json({ token: "dummyToken" });
      } else {
        res.status(401).json({
          state: "Error",
          message: "Credenciales incorrectas",
          details: {},
        });
      }
    });

    // Middleware de autorización
    server.use(
      "/api/inscripciones",
      authorizationMiddleware(["admin", "manager"]),
      inscripcionRoutes,
    );

    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createRoles();
    await createUsers();
    await newRoles();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
