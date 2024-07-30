import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from '../services/root.service'; // Asegúrate de que la ruta sea correcta

const ProductosInscritos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('/productos'); // Asegúrate de que esta ruta sea correcta
        setProductos(response.data);
      } catch (err) {
        console.error('Error fetching productos:', err);
        setError('Error al obtener productos. Asegúrate de estar autenticado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Box p={4}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <Text fontSize="2xl" mb={4}>Productos Inscritos</Text>
          {productos.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nombre</Th>
                  <Th>Fecha de Inscripción</Th>
                  <Th>Categoría</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productos.map((producto) => (
                  <Tr key={producto.id}>
                    <Td>{producto.id}</Td>
                    <Td>{producto.nombre}</Td>
                    <Td>{producto.fechaInscripcion}</Td>
                    <Td>{producto.categoria}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No hay productos inscritos disponibles.</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductosInscritos;
