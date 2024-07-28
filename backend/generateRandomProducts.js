"use strict";

const mongoose = require("mongoose");
const faker = require("faker");
const Productos = require("./src/models/productos.model");

// Conectar a la base de datos
mongoose.connect(
  "mongodb+srv://sebastiangarcia1601:PrQopQHTke4zXHIp@cluster0.i5efwwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const categorias = ["Ropa", "Comida", "Accesorios", "Libros", "Tecnología"];
const emprendedoresIds = [
  "66590ef746cb6b428c3c6a48",
  "66590ef846cb6b428c3c6a55",
]; // Ejemplos de IDs de emprendedores

async function createRandomProduct() {
  const producto = new Productos({
    nombre: faker.commerce.productName(),
    categoria: categorias[Math.floor(Math.random() * categorias.length)],
    fotografia: faker.image.imageUrl(),
    descripcion: faker.commerce.productDescription(),
    stock: faker.datatype.number({ min: 1, max: 300 }),
    emprendedorId:
      emprendedoresIds[Math.floor(Math.random() * emprendedoresIds.length)],
  });

  try {
    await producto.save();
    console.log("Producto creado:", producto);
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
  }
}

async function generateRandomProducts(count) {
  for (let i = 0; i < count; i++) {
    await createRandomProduct();
  }
  mongoose.connection.close();
}

// Genera 10 productos aleatorios
generateRandomProducts(10);
