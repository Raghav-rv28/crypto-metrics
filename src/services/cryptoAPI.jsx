import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': '5c32b2e697msh08cbb5cd8e5c555p169cb3jsn7c82b29a1c3e'
}
 // v2 headers "x-access-token": "coinranking84add9d45080b98c59d9efc452e08593491ca02a0d661f2f"
// v2 url: https://api.coinranking.com/v2/
 const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url) => ({url,headers: cryptoApiHeaders})


export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) =>({
    getCryptos: builder.query({
      query: () => createRequest('/coins'),
    }),
    getGlobalStats: builder.query({
      query: ( ) => createRequest('/stats'),
    }),
    getCoinStats: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCoinHistory: builder.query({
    query: ({coinId }) => createRequest(`/coin/${coinId}/history/`)
}),
  })
})

export const {  useGetCryptosQuery, useGetGlobalStatsQuery, useGetCoinStatsQuery, useGetCoinHistoryQuery  } = cryptoApi;

// , useGetSearchResultsQuery
// getSearchResults: builder.query({
//   query: ({query}) => createRequest(`/search-suggestions?query=${query}`)
// })