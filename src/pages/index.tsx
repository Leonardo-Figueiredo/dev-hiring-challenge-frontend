import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { AppContainer } from '../components/AppContainer'
import { Header } from '../components/Header'

import { SearchSection } from '../components/SearchSection'

const Home: NextPage = () => {
  return (
    <Flex flexDir="column">
      <Header />

      <AppContainer>
        <SearchSection />
      </AppContainer>
    </Flex>
  )
}

export default Home
