import React from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.service";

// Asegúrate de ajustar la ruta del logo según la ubicación de tu archivo
import logo from "../assets/logo_universidad_blanco_icon.png";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <Box bg="gray.900" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Image
            src={logo}
            alt="Logo"
            width="100px" // Agranda el ancho del logo en un 50%
            height="auto" // Mantiene la relación de aspecto del logo
            mr={3}
            onClick={() => navigate("/")} // Redirige a la página de inicio al hacer clic
            cursor="pointer" // Cambia el cursor a mano para indicar que es clickeable
          />
          <Text fontSize="lg" fontWeight="bold">
            Emprendedores UBB
          </Text>
        </Flex>
        {user && (
          <Flex align="center">
            <Text mr={4}>Estás logeado como: {user.email}</Text>
            <Button colorScheme="teal" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
