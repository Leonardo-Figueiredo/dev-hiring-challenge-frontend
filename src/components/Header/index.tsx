import { Center, Img, Text } from '@chakra-ui/react'
const ateliwareLogo = '/assets/logo_ateliware.svg'

export function Header() {
  return (
    <Center mt={['10', '20', '20', '40']} width="100%">
      <Center
        rounded="full"
        border="solid 2px #222"
        bgColor="#222"
        p="2"
        mx={['5']}
      >
        <Img src={ateliwareLogo} width={['30px']} />
      </Center>

      <Text fontSize={['2xl', '2xl', '3xl']}>
        Ateliware Dev Hiring Challenge
      </Text>
    </Center>
  )
}
