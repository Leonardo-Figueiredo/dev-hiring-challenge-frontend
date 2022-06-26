import { Flex, Link, Text } from '@chakra-ui/react'
import { ModalValueLabel } from './ModalValueLabel'

interface ModalDataFieldProps {
  label: string
  value: any
  link?: string
}

export function ModalDataField({ label, value = '-', ...rest }: ModalDataFieldProps) {
  return (
    <Flex flexDir="column" my="2" mx="1">
      <ModalValueLabel label={label} />
      {rest?.link ? (
        <Link isExternal href={rest.link} display="flex" alignItems="center">
          {value}
        </Link>
      ) : (
        <Text color="gray.600">{value}</Text>
      )}
    </Flex>
  )
}
