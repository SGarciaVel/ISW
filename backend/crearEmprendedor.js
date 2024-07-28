const mongoose = require("mongoose");
const Emprendedor = require("./src/models/emprendedor.model");

async function crearEmprendedoresDePrueba() {
  try {
    const emprendedores = [
      {
        _id: new mongoose.Types.ObjectId(),
        nombre_puesto: "CEO",
        carreraId: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b3"), // Asegúrate de que estos IDs sean válidos
        celular: "987654321",
        rut: "12345678-9",
        nombre_completo: "Emprendedor 1",
        userId: new mongoose.Types.ObjectId("66590ef746cb6b428c3c6a48"), // ID de usuario existente
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre_puesto: "CTO",
        carreraId: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b3"), // Asegúrate de que estos IDs sean válidos
        celular: "123456789",
        rut: "98765432-1",
        nombre_completo: "Emprendedor 2",
        userId: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b3"), // ID de usuario existente
      },
    ];

    for (const emprendedor of emprendedores) {
      const nuevoEmprendedor = new Emprendedor(emprendedor);
      await nuevoEmprendedor.save();
      console.log(`Emprendedor ${emprendedor.nombre_completo} creado`);
    }
  } catch (error) {
    console.error("Error al crear emprendedores de prueba:", error);
  } finally {
    mongoose.disconnect();
  }
}

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
    crearEmprendedoresDePrueba();
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
