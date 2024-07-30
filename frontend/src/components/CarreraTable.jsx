import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const CarreraTable = ({ careers }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Facultad</Th>
            <Th>Sede</Th>
          </Tr>
        </Thead>
        <Tbody>
          {careers.map((career) => (
            <Tr key={career._id}>
              <Td>{career.titulo}</Td>
              <Td>{career.facultad}</Td>
              <Td>{career.sede}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CarreraTable;
