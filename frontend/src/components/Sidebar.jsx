import React from "react";
import { Box, VStack, Text, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AccordionList from "./AccordionList";

function Sidebar() {
  return (
    <Box
      bg="gray.800"
      color="white"
      width="235px"
      p={4}
      borderRadius="md" // Bordes redondeados
      borderWidth="1px" // Ancho del borde
      borderColor="gray.700" // Color del borde
    >
      <VStack align="start" spacing={4}>
        <RouterLink to="/">
          <Text fontSize="lg" _hover={{ textDecoration: "underline" }}>
            Home
          </Text>
        </RouterLink>
        <Divider borderColor="whiteAlpha.400" />

        <RouterLink to="/carreras">
          <Text fontSize="lg" _hover={{ textDecoration: "underline" }}>
            Carreras
          </Text>
        </RouterLink>
        <Divider borderColor="whiteAlpha.400" />

        <AccordionList />
      </VStack>
    </Box>
  );
}

export default Sidebar;