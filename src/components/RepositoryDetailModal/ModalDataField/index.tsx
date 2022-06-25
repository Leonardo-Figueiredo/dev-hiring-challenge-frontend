import { Flex, Text } from '@chakra-ui/react'
import { ModalValueLabel } from './ModalValueLabel'

interface ModalDataFieldProps {
  label: string
  value: any
}

export function ModalDataField({ label, value = '-' }: ModalDataFieldProps) {
  return (
    <Flex flexDir="column" my="2" mx="1">
      <ModalValueLabel label={label} />
      <Text color="gray.600">{value}</Text>
    </Flex>
  )
}
