import { Flex, Text } from '@chakra-ui/react'

interface ModalValueLabelProps {
  label: string
}

export function ModalValueLabel({ label }: ModalValueLabelProps) {
  return (
    <Flex>
      <Text fontWeight="medium">{label}</Text>
    </Flex>
  )
}
