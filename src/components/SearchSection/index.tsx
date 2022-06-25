import { useLazyQuery } from '@apollo/client'
import { Button, Flex, Text, useToast } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { RepoCollection } from '../../entities/repo-collection.entity'
import {
  RepoFindAll,
  REPO_FIND_ALL
} from '../../graphql/queries/github-repository/repoFindAll.query'
import { RepositoryTable } from '../RepositoryTable'

export function SearchSection() {
  const [repositories, setRepositories] = useState<RepoCollection[]>([])

  const [fetchRepositories, { loading }] = useLazyQuery<RepoFindAll>(REPO_FIND_ALL)
  const toast = useToast()

  const handleButtonSearch = useCallback(async () => {
    const { data, error } = await fetchRepositories()

    if (error)
      toast({
        title: 'Error',
        description: 'Fetch repositories is not available, try again later.',
        status: 'error',
        position: 'bottom-right'
      })

    if (data?.repoFindAll) {
      setRepositories(data.repoFindAll)

      toast({
        title: 'Search Success',
        description: 'Check the best match repositories!',
        status: 'success',
        position: 'bottom-right'
      })
    }
  }, [fetchRepositories, toast])

  return (
    <>
      <Flex alignItems="center" my="10" flexWrap="wrap" justifyContent="center" mx={[8]}>
        <Text fontSize="xl" textAlign="center">
          Search the ⭐ best match ⭐ repositories of JavaScript, Python, C, Ruby and Elixir
        </Text>

        <Button
          m={['4']}
          size="sm"
          variant="outline"
          borderColor="red.200"
          color="red.500"
          onClick={handleButtonSearch}
          isLoading={loading}
          disabled={loading}
        >
          {repositories ? 'Search again' : 'Search'}
        </Button>
      </Flex>

      <Flex
        flexWrap="wrap"
        justifyContent={['space-between', 'space-between', 'center', 'center', 'space-between']}
        maxWidth="100%"
        alignItems="center"
      >
        {!!repositories.length &&
          repositories.map(repositoryCollection => (
            <RepositoryTable
              key={repositoryCollection?.language}
              repository_collection={repositoryCollection}
            />
          ))}
      </Flex>
    </>
  )
}
