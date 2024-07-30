import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Text, VStack, Flex, Icon, Button, Divider } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { MdSearch, MdVisibility, MdViewList } from "react-icons/md"; // Iconos para las nuevas acciones
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.service";

const accordionData = [
  {
    title: "Solicitudes de inscripción",
    icon: "🗃️",
    links: [
      { label: "Buscar Inscripciones", path: "/inscripciones", icon: MdSearch },
      { label: "Visualizar Solicitudes", path: "/inscripcion-table", icon: MdVisibility },
      { label: "Productos Inscritos", path: "/productos", icon: MdViewList },
    ],
  },
  {
    title: "Registro emprendedores",
    icon: "📝",
    links: [
      { label: "Formulario de inscripción", path: "/formulario-inscripcion" },
      { label: "Estado de inscripción", path: "/estado-inscripcion" },
    ],
  },
  // Puedes añadir más objetos aquí si es necesario
];

const AccordionList = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Actualiza la fecha y hora cada segundo
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <Box p={4}>
      <Accordion allowToggle width="100%" borderColor="whiteAlpha.400">
        {accordionData.map((item, index) => (
          <AccordionItem key={index} border="none">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  _expanded={{ bg: "teal.600", color: "white" }}
                  _focus={{ boxShadow: "none" }}
                  p={3}
                  borderRadius="md"
                  bg={isExpanded ? "teal.600" : "gray.700"}
                  _hover={{ bg: "teal.500" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box flex="1" textAlign="left" display="flex" alignItems="center">
                    <Text fontWeight="bold" fontSize="md" mr={2}>
                      {item.icon} {item.title}
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <ChevronUpIcon boxSize={5} color="white" />
                  ) : (
                    <ChevronDownIcon boxSize={5} color="white" />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4} bg="gray.800">
                  <VStack align="start" spacing={2}>
                    {item.links.map((link, linkIndex) => (
                      <Flex key={linkIndex} align="center">
                        {link.icon && <Icon as={link.icon} mr={2} />}
                        <Text fontSize="sm" color="teal.300">
                          <a href={link.path} style={{ textDecoration: 'none' }}>{link.label}</a>
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </AccordionPanel>
                {index < accordionData.length - 1 && <Divider borderColor="gray.600" mt={4} />}
              </>
            )}
          </AccordionItem>
        ))}
        <Box p={3} bg="gray.700" borderRadius="md" mt={6}>
          <VStack spacing={1} align="start">
            <Text fontSize="sm" color="white">
              {currentDateTime.toLocaleDateString()}
            </Text>
            <Text fontSize="sm" color="white">
              {currentDateTime.toLocaleTimeString()}
            </Text>
          </VStack>
        </Box>
      </Accordion>
      {user && (
        <Button colorScheme="teal" onClick={handleLogout} mt={6} width="100%">
          Cerrar sesión
        </Button>
      )}
    </Box>
  );
};

export default AccordionList;
