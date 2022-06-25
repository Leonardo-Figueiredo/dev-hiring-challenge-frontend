import { AddIcon } from '@chakra-ui/icons'
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
  Tooltip,
  useDisclosure,
  Flex
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { RepoCollection } from '../../entities/repo-collection.entity'
import { Repo } from '../../entities/repo.entity'
import { formatNumber } from '../../format-number.util'
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
      <Flex
        flexDir="column"
        my={['5']}
        mx={['10']}
        bg="white"
        rounded="lg"
        width={['100%', 'unset', 'unset', 'unset', 'unset']}
        pt="2"
      >
        <Text mb={['4']} ml="4" fontWeight="bold">
          {repository_collection.language}
        </Text>

        <TableContainer
          maxW={['xl']}
          w="100%"
          _last={{
            marginRight: ['unset', 'unset', 'unset', '50%']
          }}
        >
          <Table size="sm" w="400px">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Stars</Th>
                <Th>Forks</Th>
                <Th position="sticky" right="0" backgroundColor="#fff">
                  More
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {repositories.map(repository => (
                <Tr key={repository.id}>
                  <Td fontWeight="medium" color="gray.900">
                    {repository.name}
                  </Td>
                  <Td isNumeric>{formatNumber(repository.stargazers_count)}</Td>
                  <Td isNumeric>{formatNumber(repository.forks)}</Td>
                  <Td position="sticky" right="0" backgroundColor="white" textAlign="center">
                    <Tooltip label="More" bg="red.300" placement="top" hasArrow>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        rounded="full"
                        onClick={() => handleSelectRepository(repository)}
                      >
                        <AddIcon />
                      </Button>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {selectedRepository?.full_name && (
        <RepositoryDetailModal
          repository_full_name={selectedRepository.full_name}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  )
}
