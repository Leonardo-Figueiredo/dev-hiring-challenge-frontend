import { useLazyQuery } from '@apollo/client'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { RepoCollection } from '../../entities/repo-collection.entity'
import {
  RepoFindAll,
  REPO_FIND_ALL
} from '../../graphql/queries/github-repository/repoFindAll.query'
import { RepositoryTable } from '../RepositoryTable'

export function SearchSection() {
  const [repositories, setRepositories] = useState<RepoCollection[]>([])
  const [fetchRepositories, { error }] =
    useLazyQuery<RepoFindAll>(REPO_FIND_ALL)

  const handleButtonSearch = useCallback(async () => {
    const { data } = await fetchRepositories()

    if (data?.repoFindAll) setRepositories(data.repoFindAll)
  }, [fetchRepositories])

  return (
    <>
      <Flex alignItems="center" mt="10" flexWrap="wrap" justifyContent="center">
        <Text fontSize="xl" textAlign="center">
          Search the ⭐ top rated ⭐ repositories of JavaScript, Python, C, Ruby
          💎 and Elixir
        </Text>

        <Button m={['4']} size="sm" onClick={handleButtonSearch}>
          Search
        </Button>
      </Flex>

      <Flex
        flexWrap="wrap"
        justifyContent={[
          'space-between',
          'space-between',
          'center',
          'center',
          'space-between'
        ]}
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
