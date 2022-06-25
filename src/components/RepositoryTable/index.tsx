import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Th,
  Text,
  Link,
  Tooltip
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { RepoCollection } from '../../entities/repo-collection.entity'
import { Repo } from '../../entities/repo.entity'

interface RepositoryTableProps {
  repository_collection: RepoCollection
}

export function RepositoryTable({
  repository_collection
}: RepositoryTableProps) {
  const [repositories, setRepositories] = useState<Repo[]>([])

  useEffect(() => {
    setRepositories(repository_collection.repositories)
  }, [repository_collection])

  return (
    <TableContainer
      my={['5']}
      maxW={['xl']}
      _last={{
        marginRight: ['unset', 'unset', 'unset', '50%']
      }}
      overflowX="scroll"
    >
      <Text mb={['5']}>{repository_collection.language}</Text>

      <Table size="sm" title="JavaScript">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Full Name</Th>
            <Th>Description</Th>
            <Th>Saved</Th>
            <Th position="sticky" right="0" backgroundColor="#fff">
              Details
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {repositories.map(repository => (
            <Tr key={repository.id}>
              <Td>{repository.name}</Td>
              <Td>
                <Link href={repository.html_url} isExternal={true}>
                  {repository.full_name}
                </Link>
              </Td>
              <Td>{repository.description}</Td>
              <Td>{repository.is_storaged}</Td>
              <Td
                position="sticky"
                right="0"
                backgroundColor="#fff"
                textAlign="center"
              >
                <Tooltip label="More" bg="red.300" placement="top" hasArrow>
                  <Button
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    rounded="full"
                  >
                    ...
                  </Button>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
