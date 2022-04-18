import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': '5c32b2e697msh08cbb5cd8e5c555p169cb3jsn7c82b29a1c3e'
}

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
    })
  })
})

export const {  useGetCryptosQuery, useGetGlobalStatsQuery } = cryptoApi;

