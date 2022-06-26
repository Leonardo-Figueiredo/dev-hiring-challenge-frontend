import { Flex } from '@chakra-ui/react'
import { ReactProps } from '../../interfaces/default-props.interface'

export function Wrapper({ children }: ReactProps) {
  return (
    <Flex>
      <Flex flexDirection="column" width="100%" minHeight="100vh" justifyContent="space-between">
        {children}
      </Flex>
    </Flex>
  )
}
