const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
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

    // Rutas de API
    server.use("/api", indexRoutes);
    server.use("/api", authRoutes);

    // Rutas protegidas
    server.use(
      "/api/inscripciones",
      authorizationMiddleware(["admin", "manager"]),
      inscripcionRoutes,
    );
    server.use("/api", postulanteRoutes);
    server.use(
      "/api/productos",
      authorizationMiddleware(["admin", "manager"]),
      productoRoutes,
    );

    server.post("/auth/login", async (req, res) => {
      try {
        // Verifica las credenciales del usuario
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.verifyPassword(password)) {
          return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Genera el token
        const token = jwt.sign(
          { email: user.email, roles: user.roles },
          ACCESS_JWT_SECRET,
          { expiresIn: "1h" },
        );

        // Envía el token en la respuesta
        res.json({ token });
      } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
    // Middleware de autorización
    server.use(
      "/api/inscripciones",
      authorizationMiddleware(["admin", "manager"]),
      inscripcionRoutes,
    );
    server.use(
      "/api/productos",
      authorizationMiddleware(["admin", "manager"]),
      productoRoutes,
    );

    // Configura el directorio estático para el front-end
    server.use(express.static(path.join(__dirname, "../frontend")));

    // Enrutamiento para servir el archivo index.html
    server.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "index.html"));
    });

    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}`);
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
