import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Root() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Box minHeight="100vh" bg="gray.50">
          <Header />
          <Flex direction="row" align="flex-start" p="4" spacing="4">
            <Sidebar />
            <Box flex="1" bg="white" borderRadius="md" boxShadow="md" p="6">
              <Outlet />
            </Box>
          </Flex>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default Root;
