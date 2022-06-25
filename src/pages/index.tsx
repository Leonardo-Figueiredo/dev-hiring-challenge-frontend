import type { NextPage } from 'next'
import { AppContainer } from '../components/AppContainer'
import { Header } from '../components/Header'

import { SearchSection } from '../components/SearchSection'

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <AppContainer>
        <SearchSection />
      </AppContainer>
    </>
  )
}

export default Home
