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
import axios from "../services/root.service";

const BuscarInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.get("/inscripciones", { params: data });
      setInscripciones(response.data);
    } catch (err) {
      setError("Error al obtener inscripciones");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Buscar por nombre" {...register("nombre")} />
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

export default BuscarInscripciones;
