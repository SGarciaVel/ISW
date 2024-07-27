const Producto = require("../models/productos.model");

class ProductosService {
  async getAll() {
    return await Producto.find();
  }

  async getProductCountByType() {
    return await Producto.aggregate([
      {
        $group: {
          _id: "$tipo",
          count: { $sum: 1 },
        },
      },
    ]);
  }
}

module.exports = new ProductosService();
