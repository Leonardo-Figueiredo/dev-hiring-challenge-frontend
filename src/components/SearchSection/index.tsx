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
  const toast = useToast({
    position: 'bottom-right',
    duration: 3000
  })

  const [repositories, setRepositories] = useState<RepoCollection[]>([])
  const [fetchRepositories, { loading }] = useLazyQuery<RepoFindAll>(REPO_FIND_ALL, {
    fetchPolicy: 'network-only',

    onCompleted: data => {
      setRepositories(data.repoFindAll)
    },
    onError: error => {
      const message = error.message || 'Fetch repositories is not available, try again later.'

      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 10000
      })
    }
  })

  const handleButtonSearch = useCallback(async () => {
    await fetchRepositories()
  }, [fetchRepositories])

  return (
    <>
      <Flex alignItems="center" my="10" flexWrap="wrap" justifyContent="center" mx={[8]}>
        <Text fontSize="xl" textAlign="center">
          Search the ⭐ best match ⭐ repositories of TypeScript, JavaScript, Python, C, Ruby and
          Elixir
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
          {repositories[0] ? 'Refresh' : 'Search'}
        </Button>
      </Flex>

      <Flex flexWrap="wrap" justifyContent={['center']} maxWidth="100%" alignItems="center">
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
