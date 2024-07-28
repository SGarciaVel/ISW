const mongoose = require("mongoose");

// Definir el esquema de carrera
const carreraSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, required: true },
});

// Crear el modelo de carrera
const Carrera = mongoose.model("Carrera", carreraSchema);

// Conectar a la base de datos
mongoose.connect(
  "mongodb+srv://sebastiangarcia1601:PrQopQHTke4zXHIp@cluster0.i5efwwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Definir las carreras
const carreras = [
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b3"),
    nombre: "Ingenieria Civil Informatica",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b4"),
    nombre: "Arquitectura",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b5"),
    nombre: "Derecho",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b6"),
    nombre: "Medicina",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b7"),
    nombre: "Psicología",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b8"),
    nombre: "Ingenieria Comercial",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8b9"),
    nombre: "Biología",
  },
  {
    _id: new mongoose.Types.ObjectId("64c1e3f4f1d1a745b8b6b8ba"),
    nombre: "Química",
  },
];

// Insertar las carreras en la base de datos
Carrera.insertMany(carreras)
  .then(() => {
    console.log("Carreras insertadas exitosamente");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error al insertar carreras:", error);
    mongoose.connection.close();
  });
