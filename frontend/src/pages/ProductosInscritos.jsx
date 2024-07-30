import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Flex } from '@chakra-ui/react';
import axios from '../services/root.service';
import "../styles/ProductosTable.css";

const ITEMS_PER_PAGE = 5;

const ProductosInscritos = () => {
  const [productos, setProductos] = useState([]);
  const [emprendedores, setEmprendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get('/productos');
        setProductos(productosResponse.data);

        const emprendedoresResponse = await axios.get('/emprendedores');
        setEmprendedores(emprendedoresResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al obtener datos. Asegúrate de estar autenticado.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      if (direction === 'next' && prevPage < totalPages) {
        return prevPage + 1;
      } else if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);
  const currentProductos = productos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const emprendedoresMap = Array.isArray(emprendedores) ? emprendedores.reduce((acc, emprendedor) => {
    acc[emprendedor._id] = emprendedor.nombre_completo;
    return acc;
  }, {}) : {};

  const categoriaCounts = productos.reduce((acc, producto) => {
    if (!acc[producto.categoria]) {
      acc[producto.categoria] = new Set();
    }
    acc[producto.categoria].add(producto.emprendedorId);
    return acc;
  }, {});

  const categoriaResumen = Object.entries(categoriaCounts).map(([categoria, emprendedoresSet]) => ({
    categoria,
    cantidadEmprendedores: emprendedoresSet.size
  }));

  return (
    <Box p={4}>
      {loading ? (
        <Flex justify="center" align="center" minHeight="60vh">
          <Spinner size="lg" />
        </Flex>
      ) : error ? (
        <Text color="red.500" textAlign="center">{error}</Text>
      ) : (
        <>
          <Text fontSize="2xl" mb={4}>Productos Inscritos</Text>
          {currentProductos.length > 0 ? (
            <>
              <Table variant="simple" colorScheme="teal" className="inscripcion-table">
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Categoría</Th>
                    <Th>Descripción</Th>
                    <Th>Stock</Th>
                    <Th>Emprendedor</Th>
                    <Th>Precio</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentProductos.map((producto) => (
                    <Tr key={producto._id}>
                      <Td>{producto.nombre}</Td>
                      <Td>{producto.categoria}</Td>
                      <Td>{producto.descripcion}</Td>
                      <Td>{producto.stock}</Td>
                      <Td>
                        {emprendedoresMap[producto.emprendedorId] ? emprendedoresMap[producto.emprendedorId] : 'Desconocido'}
                      </Td>
                      <Td>${producto.precio.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex justify="space-between" align="center" mt={4}>
                <Button
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 1}
                  colorScheme="teal"
                >
                  &#60; Anterior
                </Button>
                <Text color="gray.600">Página {currentPage} de {totalPages}</Text>
                <Button
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === totalPages}
                  colorScheme="teal"
                >
                  Siguiente &#62;
                </Button>
              </Flex>
            </>
          ) : (
            <Text>No hay productos inscritos disponibles.</Text>
          )}

          <Text fontSize="2xl" mt={8} mb={4}>Resumen de Emprendedores por Categoría</Text>
          <Table variant="simple" colorScheme="teal" className="resumen-table">
            <Thead>
              <Tr>
                <Th>Categoría</Th>
                <Th>Cantidad de Emprendedores</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categoriaResumen.map((resumen) => (
                <Tr key={resumen.categoria}>
                  <Td>{resumen.categoria}</Td>
                  <Td>{resumen.cantidadEmprendedores}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default ProductosInscritos;
