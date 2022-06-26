import { Center, Text, HStack, Link } from '@chakra-ui/react'
import { AiFillLinkedin, AiFillGithub, AiFillMail } from 'react-icons/ai'
import { IconLink } from './IconLink'

export function Footer() {
  return (
    <Center flexDir="column" width="100%" height="200px" mt="10" bg="#222" color="white">
      <HStack mb="5" spacing="4">
        <IconLink
          icon={AiFillLinkedin}
          url="https://www.linkedin.com/in/leonardo-rodrigues-figueiredo/"
        />
        <IconLink icon={AiFillGithub} url="https://github.com/Leonardo-Figueiredo" />
        <IconLink icon={AiFillMail} url="mailto:leo.nardorf22@gmail.com" />
      </HStack>

      <Text color="gray.500" fontSize="sm" textAlign="center">
        Made by Leonardo Figueiredo - 2022
        <br />
        <Link href="mailto:leo.nardorf22@gmail.com">leo.nardorf22@gmail.com</Link>
      </Text>
    </Center>
  )
}
