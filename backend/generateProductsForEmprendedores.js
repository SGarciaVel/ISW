const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Productos = require("./src/models/productos.model"); // Ajusta la ruta según tu estructura de carpetas
const Emprendedores = require("./src/models/emprendedor.model"); // Ajusta la ruta según tu estructura de carpetas

// Conectar a la base de datos
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

// Generar productos aleatorios
const generateRandomProducts = (emprendedorId, numProducts) => {
  const products = [];
  for (let i = 0; i < numProducts; i++) {
    products.push({
      nombre: faker.commerce.productName(),
      categoria: faker.commerce.department(),
      fotografia: faker.image.url(),
      descripcion: faker.lorem.sentence(),
      stock: faker.number.int({ min: 1, max: 300 }),
      precio: parseFloat(faker.commerce.price()),
      emprendedorId: emprendedorId,
    });
  }
  return products;
};

// Función principal para crear productos para todos los emprendedores
const createProductsForAllEmprendedores = async () => {
  try {
    // Obtener todos los emprendedores
    const emprendedores = await Emprendedores.find();
    console.log("Emprendedores encontrados:", emprendedores.length);

    for (const emprendedor of emprendedores) {
      console.log(`Generando productos para emprendedor ${emprendedor._id}`);
      const products = generateRandomProducts(emprendedor._id, 10); // Generar 10 productos por emprendedor

      // Guardar productos en la base de datos
      await Productos.insertMany(products);
      console.log(`Productos creados para emprendedor ${emprendedor._id}`);
    }

    console.log("Todos los productos han sido creados");
  } catch (err) {
    console.error("Error al crear productos:", err);
  } finally {
    // Cerrar conexión a la base de datos
    mongoose.connection.close();
  }
};

// Ejecutar la función principal
createProductsForAllEmprendedores();
