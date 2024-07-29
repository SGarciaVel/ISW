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

// Lista de productos escolares con detalles
const productosEscolares = [
  {
    nombre: "Cuaderno de rayas",
    categoria: "Cuadernos",
    descripcion: "Cuaderno de rayas para tomar apuntes.",
    precio: 1600,
  },
  {
    nombre: "Cuaderno cuadriculado",
    categoria: "Cuadernos",
    descripcion: "Cuaderno cuadriculado ideal para matemáticas.",
    precio: 1800,
  },
  {
    nombre: "Lápiz HB",
    categoria: "Lápices",
    descripcion: "Lápiz HB para escritura y dibujo.",
    precio: 800,
  },
  {
    nombre: "Bolígrafo azul",
    categoria: "Bolígrafos",
    descripcion: "Bolígrafo azul con tinta de secado rápido.",
    precio: 1200,
  },
  {
    nombre: "Marcador permanente",
    categoria: "Marcadores",
    descripcion: "Marcador permanente para etiquetar y marcar.",
    precio: 1500,
  },
  {
    nombre: "Resaltador",
    categoria: "Marcadores",
    descripcion: "Resaltador de colores para resaltar textos importantes.",
    precio: 1000,
  },
  {
    nombre: "Goma de borrar",
    categoria: "Accesorios",
    descripcion: "Goma de borrar para lápiz.",
    precio: 600,
  },
  {
    nombre: "Sacapuntas",
    categoria: "Accesorios",
    descripcion: "Sacapuntas con depósito.",
    precio: 700,
  },
  {
    nombre: "Regla de 30 cm",
    categoria: "Accesorios",
    descripcion: "Regla transparente de 30 cm.",
    precio: 1200,
  },
  {
    nombre: "Carpeta de anillas",
    categoria: "Accesorios",
    descripcion: "Carpeta de anillas para organizar documentos.",
    precio: 2500,
  },
];

// Generar productos escolares aleatorios
const generateRandomProducts = (emprendedorId, numProducts) => {
  const products = [];
  for (let i = 0; i < numProducts; i++) {
    // Selecciona un producto de la lista
    const producto = faker.helpers.arrayElement(productosEscolares);

    products.push({
      nombre: producto.nombre,
      categoria: producto.categoria,
      fotografia: faker.image.imageUrl(), // Puedes mejorar esto más tarde si tienes imágenes específicas
      descripcion: producto.descripcion,
      stock: faker.number.int({ min: 1, max: 300 }),
      precio: producto.precio,
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
