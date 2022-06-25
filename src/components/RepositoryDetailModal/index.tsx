import {
  Button,
  Flex,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react'
import { CheckIcon, ExternalLinkIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { Repo } from '../../entities/repo.entity'
import { ModalValueLabel } from './ModalDataField/ModalValueLabel'
import { useCallback, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  CreateRepo,
  CreateRepoInput,
  CreateRepoVars,
  CREATE_REPO
} from '../../graphql/mutations/github-repository/createRepo.mutation'
import { REPO_FIND_ALL } from '../../graphql/queries/github-repository/repoFindAll.query'
import { formatNumber } from '../../utils/format-number.util'
import {
  FindOneRepo,
  FindOneRepoInput,
  REPO_FIND_ONE
} from '../../graphql/queries/github-repository/repoFindOne.query'
import { formatDate } from '../../utils/format-date.util'
import { ModalDataField } from './ModalDataField'

interface RepositoryDetailModalProps {
  isOpen: boolean
  onClose: () => void
  repository_full_name: string
}

export function RepositoryDetailModal({
  isOpen,
  onClose,
  repository_full_name
}: RepositoryDetailModalProps) {
  const toast = useToast()

  const [saveRepository, { loading: saveRepositoryLoading }] = useMutation<
    CreateRepo,
    CreateRepoVars
  >(CREATE_REPO)
  const [findOneRepo, { loading: findOneRepoLoading }] = useLazyQuery<
    FindOneRepo,
    FindOneRepoInput
  >(REPO_FIND_ONE)

  const [repository, setRepository] = useState<Repo>({} as Repo)

  useEffect(() => {
    async function fetchRepository() {
      const { data: findOneRepoData } = await findOneRepo({
        variables: { repository_full_name }
      })

      if (findOneRepoData?.repoFindOne) setRepository(findOneRepoData.repoFindOne)
    }

    if (repository_full_name && isOpen) fetchRepository()
  }, [findOneRepo, repository_full_name, isOpen])

  const handleSaveRepository = useCallback(async () => {
    const clonedRepository = structuredClone(repository)
    delete clonedRepository?.db_id
    delete clonedRepository?.is_storaged
    delete clonedRepository?.storaged_at

    const createRepoInput: CreateRepoInput = clonedRepository

    const { data: saveRepositoryData } = await saveRepository({
      variables: { createRepoInput },
      refetchQueries: [
        { query: REPO_FIND_ALL },
        {
          query: REPO_FIND_ONE,
          variables: { repository_full_name }
        }
      ],
      awaitRefetchQueries: true
    })

    if (saveRepositoryData?.createRepo) setRepository(saveRepositoryData.createRepo)

    toast({
      title: `Repository ${saveRepositoryData?.createRepo?.name || repository.name} saved!`,
      description: '',
      status: 'success'
    })
  }, [repository, saveRepository, repository_full_name, toast])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Repository additional info</ModalHeader>
        <ModalCloseButton />

        {findOneRepoLoading ? (
          <Flex height="450px">
            <Spinner alignSelf="center" marginX="auto" />
          </Flex>
        ) : (
          <>
            <ModalBody>
              <Flex alignItems="center" justifyContent="space-between">
                <ModalDataField label="Name" value={repository.name} />

                <HStack alignItems="center" my="1">
                  <ModalValueLabel label="Storaged:" />
                  {repository.is_storaged ? (
                    <CheckIcon color="green" />
                  ) : (
                    <NotAllowedIcon color="red.300" />
                  )}
                </HStack>
              </Flex>

              <ModalDataField
                label="Full name"
                value={
                  <Text color="gray.600">
                    <Link isExternal href={repository.html_url} display="flex" alignItems="center">
                      {repository.full_name}
                      <ExternalLinkIcon ml="1" />
                    </Link>
                  </Text>
                }
              />

              <ModalDataField label="Description" value={repository.description} />
              <Flex justifyContent="space-between" flexWrap="wrap">
                <ModalDataField label="Stars" value={formatNumber(repository.stargazers_count)} />
                <ModalDataField label="Watchers" value={formatNumber(repository.watchers_count)} />
                <ModalDataField label="Language" value={repository.language} />
                <ModalDataField label="Open issues" value={repository.open_issues} />
                <ModalDataField label="Forks" value={repository.forks} />
              </Flex>

              <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <ModalDataField
                  label="Created on Github"
                  value={formatDate(repository.created_at)}
                />
                <ModalDataField
                  label="Last Github update"
                  value={formatDate(repository.updated_at)}
                />
                {repository?.is_storaged && (
                  <ModalDataField label="Storaged at" value={formatDate(repository.storaged_at)} />
                )}
              </Flex>
            </ModalBody>

            <ModalFooter>
              {!repository?.is_storaged && (
                <Button
                  variant="outline"
                  colorScheme="green"
                  onClick={handleSaveRepository}
                  isLoading={saveRepositoryLoading}
                  disabled={saveRepositoryLoading}
                >
                  Save
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
