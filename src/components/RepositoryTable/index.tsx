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
  Tooltip,
  useDisclosure,
  Flex
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { RepoCollection } from '../../entities/repo-collection.entity'
import { Repo } from '../../entities/repo.entity'
import { RepositoryDetailModal } from '../RepositoryDetailModal'

interface RepositoryTableProps {
  repository_collection: RepoCollection
}

export function RepositoryTable({ repository_collection }: RepositoryTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [repositories, setRepositories] = useState<Repo[]>([])
  const [selectedRepository, setSelectedRepository] = useState<Repo>({} as Repo)

  useEffect(() => {
    setRepositories(repository_collection.repositories)
  }, [repository_collection])

  const handleSelectRepository = useCallback(
    (repository: Repo) => {
      setSelectedRepository(repository)
      onOpen()
    },
    [onOpen]
  )

  return (
    <>
      <Flex flexDir="column" my={['5']} bg="white" rounded="lg" pt="2">
        <Text mb={['4']} ml="4" fontWeight="bold">
          {repository_collection.language}
        </Text>

        <TableContainer
          maxW={['xl']}
          w="100%"
          _last={{
            marginRight: ['unset', 'unset', 'unset', '50%']
          }}
          overflowX="scroll"
        >
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Full Name</Th>
                <Th>Description</Th>
                <Th>Saved</Th>
                <Th position="sticky" right="0" backgroundColor="#fff">
                  Info
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
                  <Td position="sticky" right="0" backgroundColor="white" textAlign="center">
                    <Tooltip label="More" bg="red.300" placement="top" hasArrow>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        rounded="full"
                        onClick={() => handleSelectRepository(repository)}
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
      </Flex>

      <RepositoryDetailModal repository={selectedRepository} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
