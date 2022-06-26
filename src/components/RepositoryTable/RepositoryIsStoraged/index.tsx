import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons'

interface RepositoryIsStoragedProps {
  is_stored: boolean
}

export function RepositoryIsStoraged({ is_stored }: RepositoryIsStoragedProps) {
  return is_stored ? <CheckIcon color="green" /> : <NotAllowedIcon color="red.300" />
}
