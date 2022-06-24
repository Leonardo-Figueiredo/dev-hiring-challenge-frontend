import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

export function RepositoryTable() {
  return (
    <TableContainer maxW={['800px']} my={['10']}>
      <Table size="sm">
        <Thead>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Full name</Th>
          <Th>Description</Th>
          <Th>Link</Th>
          <Th>Action</Th>
        </Thead>

        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>JavaScript</Td>
            <Td>ES6/JavaScript</Td>
            <Td>JavaScript main repository</Td>
            <Td>www.google.com.br</Td>
            <Td>
              <Button>Save</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
