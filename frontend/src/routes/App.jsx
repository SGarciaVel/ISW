// src/routes/App.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Flex, Spacer, Button } from '@chakra-ui/react';

const App = () => {
  return (
    <Box>
      <Flex p={4} borderBottom="1px" borderBottomColor="gray.200">
        <Button as={Link} to="/" variant="link">Home</Button>
        <Spacer />
        <Button as={Link} to="/inscripciones" variant="link">Inscripciones</Button>
        <Button as={Link} to="/auth" ml={4} variant="outline">Login</Button>
      </Flex>
      <Box p={4}>
        <Outlet /> {/* Aquí se renderizarán los componentes de las rutas anidadas */}
      </Box>
    </Box>
  );
};

export default App;
