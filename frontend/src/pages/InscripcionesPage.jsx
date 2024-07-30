// src/pages/InscripcionesPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "../services/root.service"; // Asegúrate de que la ruta sea correcta

const InscripcionesPage = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null); // Limpiar errores antes de una nueva solicitud
    try {
      const response = await axios.get("/api/inscripciones", { params: data }); // Asegúrate de que esta ruta sea correcta
      setInscripciones(response.data.inscripciones); // Ajusta según la estructura de la respuesta
    } catch (err) {
      setError("Error al obtener inscripciones. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Buscar por nombre"
            {...register("nombre")}
            aria-label="Buscar por nombre"
          />
          <Button type="submit" colorScheme="teal" mt={2}>
            Buscar
          </Button>
        </form>
        {loading && <Spinner />}
        {error && <Text color="red.500">{error}</Text>}
        {inscripciones.length > 0 && (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Fecha</Th>
                {/* Agrega más encabezados según la estructura de tus datos */}
              </Tr>
            </Thead>
            <Tbody>
              {inscripciones.map((inscripcion) => (
                <Tr key={inscripcion.id}>
                  <Td>{inscripcion.id}</Td>
                  <Td>{inscripcion.nombre}</Td>
                  <Td>{inscripcion.fecha}</Td>
                  {/* Agrega más datos según la estructura de tus datos */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Box>
  );
};

export default InscripcionesPage;
