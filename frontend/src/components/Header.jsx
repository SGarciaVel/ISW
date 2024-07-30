import React from 'react';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo_universidad_blanco_icon.png';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <Box bg="gray.900" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Image
            src={logo}
            alt="Logo"
            width="120px"
            height="auto"
            mr={3}
            onClick={() => navigate('/')}
            cursor="pointer"
          />
          <Text fontSize="lg" fontWeight="bold">
            Emprendedores UBB
          </Text>
        </Flex>
        {user && (
          <Flex align="center">
            <Text mr={4}>Estás logeado como: {user.email}</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
