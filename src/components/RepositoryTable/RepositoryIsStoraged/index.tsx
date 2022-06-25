import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons'

interface RepositoryIsStoragedProps {
  is_storaged: boolean
}

export function RepositoryIsStoraged({ is_storaged }: RepositoryIsStoragedProps) {
  return is_storaged ? <CheckIcon color="green" /> : <NotAllowedIcon color="red.300" />
}
