import React from "react";

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.fotografia} alt={product.nombre} />
    <h2>{product.nombre}</h2>
    <p>{product.descripcion}</p>
    <p>Stock: {product.stock}</p>
    <p>Precio: ${product.precio}</p>
  </div>
);

export default ProductCard;
