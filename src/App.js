import logo from './logo.svg'
import './App.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

import Apollo from './page/index'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ApolloProvider client={client}>
          <Apollo />
        </ApolloProvider>
      </header>
    </div>
  )
}

export default App
