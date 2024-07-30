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
      p={4}
      borderColor="gray.700"
      height="100vh"
    >
      <VStack align="start" spacing={4} height="100%">
        <RouterLink to="/">
          {}
        </RouterLink>

        <AccordionList />
      </VStack>
    </Box>
  );
}

export default Sidebar;
