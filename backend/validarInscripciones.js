const mongoose = require("mongoose");
const User = require("./src/models/user.model");
const Emprendedor = require("./src/models/emprendedor.model");
const Inscripcion = require("./src/models/inscripcion.model");

async function validarIDs(inscripciones) {
  try {
    for (const inscripcion of inscripciones) {
      const { userId, emprendedorId, postulante } = inscripcion;

      const user = await User.findById(userId);
      const emprendedor = await Emprendedor.findById(emprendedorId);

      console.log(`Validación para inscripción con ID: ${inscripcion._id}`);
      console.log(`Usuario: ${user ? "Válido" : "No encontrado"}`);
      console.log(`Emprendedor: ${emprendedor ? "Válido" : "No encontrado"}`);
      console.log(`Postulante: ${postulante ? "Presente" : "No presente"}`);
    }
  } catch (error) {
    console.error("Error al validar IDs:", error);
  }
}

// Lista de inscripciones para validar
const inscripciones = [
  {
    _id: "66a478e362c45e6503fccb10",
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    userId: "66590ef746cb6b428c3c6a48",
    emprendedorId: "66590ef846cb6b428c3c6a55",
    comentario: "Primera inscripción",
    postulante: "66a461ef38abe79cc0e39dce",
    estado: "aprobada",
    fechaInscripcion: "2024-07-27T04:34:40.585Z",
  },
  {
    _id: "66a545efceb7ea17b6d6c033",
    nombre: "Luis Garcia",
    email: "sebastian.rgarciavelasquez@gmail.com",
    userId: "64c1e3f4f1d1a745b8b6b8b3",
    emprendedorId: "64c1e3f4f1d1a745b8b6b8b2",
    comentario: "Tu postulación ha sido aprobada.",
    postulante: "64c1e3f4f1d1a745b8b6b8b1",
    estado: "aprobada",
    fechaInscripcion: "2024-07-27T18:54:58.311Z",
  },
];

// Conectar a la base de datos
mongoose
  .connect(
    "mongodb+srv://sebastiangarcia1601:PrQopQHTke4zXHIp@cluster0.i5efwwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log("Conectado a la base de datos");
    validarIDs(inscripciones).then(() => {
      mongoose.disconnect();
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
