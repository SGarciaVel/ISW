const Producto = require("../models/productoprueba.model");

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto por ID
exports.updateProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto por ID
exports.deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
