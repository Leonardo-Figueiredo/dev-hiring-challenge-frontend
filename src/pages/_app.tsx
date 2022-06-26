import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Wrapper } from '../components/Wrapper'
import { apolloClient } from '../http/apollo-client.http'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/logo_ateliware.svg" />
        <title>ateliware | Dev Challenge</title>
      </Head>

      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <Wrapper>
            <Component {...pageProps} />

            <Footer />
          </Wrapper>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
