import { Container } from '@chakra-ui/react'
import { ReactProps } from '../../interfaces/default-props.interface'

function AppContainer({ children }: ReactProps) {
  return (
    <Container
      py={[4]}
      maxW={['1200px']}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Container>
  )
}

export { AppContainer }
