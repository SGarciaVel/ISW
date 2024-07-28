const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sebastiangarcia1601:PrQopQHTke4zXHIp@cluster0.i5efwwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

const Productos = require("./src/models/productos.model"); // Ajusta la ruta según tu estructura de carpetas

const contarEmprendedoresPorCategoria = async () => {
  try {
    const resultado = await Productos.aggregate([
      {
        $group: {
          _id: "$categoria",
          emprendedores: { $addToSet: "$emprendedorId" },
        },
      },
      {
        $project: {
          _id: 1,
          numeroDeEmprendedores: { $size: "$emprendedores" },
        },
      },
    ]);

    console.log("Número de emprendedores por categoría:", resultado);
  } catch (err) {
    console.error("Error al contar emprendedores por categoría:", err);
  } finally {
    mongoose.connection.close();
  }
};

contarEmprendedoresPorCategoria();
