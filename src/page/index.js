import React, { useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

const getQuery = (pairAddress, unixtime) => {
  return gql`
    {
      pairDayData(id: "${pairAddress}-${unixtime}") {
        id
        date
        token0 {
          id
          symbol
          symbol
          derivedETH
        }
        token1 {
          id
          symbol
          symbol
          derivedETH
        }
        reserveUSD
      }
    }
  `
}

const getTokenPrice = (tokenId, unixtime) => {
  return gql`
    {
      tokenDayData(id: "${tokenId}-${unixtime}") {
        id
        priceUSD
      }
    }
  `
}

function ExchangeRates({ pairAddress, now, yesterday }) {
  const { loading: loadingNow, error: errorNow, data: dataNow } = useQuery(
    getQuery(pairAddress, now),
  )
  const {
    loading: loadingYesterday,
    error: errorYesterday,
    data: dataYesterday,
  } = useQuery(getQuery(pairAddress, yesterday))

  const {
    loading: loadingNowToken,
    error: errorNowToken,
    data: dataNowToken,
  } = useQuery(getTokenPrice(dataNow?.pairDayData?.token0?.id, now))

  const {
    loading: loadingYesterdayToken,
    error: errorYesterdayToken,
    data: dataYesterdayToken,
  } = useQuery(getTokenPrice(dataYesterday?.pairDayData?.token0?.id, yesterday))

  if (loadingNow) return <p>Loading...</p>
  if (errorNow) return <p>Error :(</p>
  if (loadingYesterday) return <p>Loading...</p>
  if (errorYesterday) return <p>Error :(</p>

  console.log(dataNowToken)
  return (
    <div>
      {<p>{`Today Price: ${dataNowToken?.tokenDayData?.priceUSD}$`}</p>}
      {
        <p>
          {`Yesterday Price: ${dataYesterdayToken?.tokenDayData?.priceUSD}$`}
        </p>
      }
    </div>
  )
}

function Apollo() {
  const [pairAddress, setPairAddress] = useState('')
  const [now, setNow] = useState(0)
  const [yesterday, setYesterday] = useState(0)
  const [temp, setTemp] = useState('0xd3d2e2692501a5c9ca623199d38826e513033a17')

  function handleChange(event) {
    setTemp(event.target.value)
  }

  function getUSD(e) {
    e.preventDefault()
    let now = Math.floor(new Date().getTime() / 86400000)
    let yesterday = now - 1

    setNow(now)
    setYesterday(yesterday)
    setPairAddress(temp)
  }

  return (
    <div>
      <h2>Apollo app 🚀</h2>
      <input type="text" onChange={handleChange} value={temp} />
      <button onClick={getUSD}>GET</button>
      <ExchangeRates
        pairAddress={pairAddress}
        now={now}
        yesterday={yesterday}
      />
    </div>
  )
}

export default Apollo
