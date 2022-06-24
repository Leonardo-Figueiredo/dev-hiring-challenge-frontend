import type { NextPage } from 'next'
import { AppContainer } from '../components/AppContainer'
import { Header } from '../components/Header'
import { RepositoryTable } from '../components/RepositoryTable'

const Home: NextPage = () => {
  return (
    <AppContainer>
      <Header />

      <RepositoryTable />
    </AppContainer>
  )
}

export default Home
