import { Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

interface IconLinkProps {
  icon: IconType
  url: string
}

export function IconLink({ icon, url }: IconLinkProps) {
  return (
    <Link href={url} isExternal>
      <Icon as={icon} width="12" height="12" />
    </Link>
  )
}
