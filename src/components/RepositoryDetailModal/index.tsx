import {
  Button,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react'
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { Repo } from '../../entities/repo.entity'
import { ModalValueLabel } from './ModalValueLabel'
import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import {
  CreateRepo,
  CreateRepoInput,
  CREATE_REPO
} from '../../graphql/mutations/github-repository/createRepo.mutation'
import { REPO_FIND_ALL } from '../../graphql/queries/github-repository/repoFindAll.query'

interface RepositoryDetailModalProps {
  isOpen: boolean
  onClose: () => void
  repository: Repo
}

export function RepositoryDetailModal({
  isOpen,
  onClose,
  repository
}: RepositoryDetailModalProps) {
  const toast = useToast()
  const [saveRepository, { loading }] = useMutation<Repo, CreateRepo>(
    CREATE_REPO
  )

  const handleSaveRepository = useCallback(async () => {
    const clonedRepository = structuredClone(repository)

    delete clonedRepository.db_id
    delete clonedRepository.is_storaged
    delete clonedRepository.created_at
    delete clonedRepository.updated_at
    delete clonedRepository.deleted_at

    const createRepoInput: CreateRepoInput = clonedRepository

    try {
      const { data } = await saveRepository({
        variables: { createRepoInput },
        refetchQueries: [{ query: REPO_FIND_ALL }]
      })

      toast({
        title: `Repository ${data?.name || repository.name} saved!`,
        description: '',
        status: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  }, [repository, saveRepository, toast])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Repository additional info</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <ModalValueLabel label="Name" />
          <Text color="gray.600">{repository.name}</Text>

          <ModalValueLabel label="Full name" />
          <Text color="gray.600">
            <Link isExternal href={repository.html_url}>
              {repository.full_name}
            </Link>
          </Text>

          <ModalValueLabel label="Description" />
          <Text color="gray.600">{repository.description}</Text>

          <ModalValueLabel label="Stars" />
          <Text color="gray.600">{repository.stargazers_count}</Text>

          <ModalValueLabel label="Watchers" />
          <Text color="gray.600">{repository.watchers}</Text>

          <ModalValueLabel label="Language" />
          <Text color="gray.600">{repository.language}</Text>

          <ModalValueLabel label="Open issue" />
          <Text color="gray.600">{repository.open_issues}</Text>

          <ModalValueLabel label="Forks" />
          <Text color="gray.600">{repository.forks}</Text>

          <HStack alignItems="center">
            <ModalValueLabel label="Saved:" />
            {repository.is_storaged ? (
              <CheckIcon color="green" />
            ) : (
              <NotAllowedIcon color="red.300" />
            )}
          </HStack>

          {repository?.is_storaged && (
            <>
              <ModalValueLabel label="Saved at" />
              <Text color="gray.600">{repository.is_storaged}</Text>

              <ModalValueLabel label="Updated at" />
              <Text color="gray.600">{repository.is_storaged}</Text>

              <ModalValueLabel label="Deleted at" />
              <Text color="gray.600">{repository.is_storaged}</Text>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {!repository.is_storaged && (
            <Button
              variant="outline"
              onClick={handleSaveRepository}
              isLoading={loading}
            >
              Save
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
