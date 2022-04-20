import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'X-RapidAPI-Key': '5c32b2e697msh08cbb5cd8e5c555p169cb3jsn7c82b29a1c3e'
}

 const baseUrl = "https://coingecko.p.rapidapi.com/"

const createRequest = (url) => ({url,headers: cryptoApiHeaders})


export const cryptoApi = createApi({

  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) =>({
    getCoins: builder.query({
      query: () => createRequest('/coins'),
    }),
    getCoinHistory: builder.query({
      query: ({coinId, timeperiod}) => createRequest(`/coin/${coinId}/history/${timeperiod}`)
    })
  })
})

export const {  } = cryptoApi;

