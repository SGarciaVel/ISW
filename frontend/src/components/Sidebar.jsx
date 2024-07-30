import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AccordionList from "./AccordionList";

function Sidebar() {
  return (
    <Box
      bg="gray.900"
      color="white"
      width="235px"
      p={4} // Ancho del borde
      borderColor="gray.700" // Color del borde
      height="100vh" // Altura completa de la ventana gráfica
    >
      <VStack align="start" spacing={4} height="100%">
        <RouterLink to="/">
          {/* Agrega algún contenido aquí si es necesario */}
        </RouterLink>

        <AccordionList />
      </VStack>
    </Box>
  );
}

export default Sidebar;
