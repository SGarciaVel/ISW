import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";

const App = () => {
  return (
    <Box>
        <VStack spacing={8} align="center" justify="center" minHeight="70vh">
          <Heading size="2xl">Bienvenido a a Emprendedores UBB</Heading>
          <Text fontSize="lg" textAlign="center">
            Explora nuestras inscripciones, gestiona tus solicitudes y más.
          </Text>
          <Button as={Link} to="/inscripciones" size="lg" colorScheme="teal">
            Ver Inscripciones
          </Button>
        </VStack>
        <Box p={4}>
          <Outlet />{" "}
          {}
        </Box>
      </Box>
  );
};

export default App;
