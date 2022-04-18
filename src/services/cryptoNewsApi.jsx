import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsHeader = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': '5c32b2e697msh08cbb5cd8e5c555p169cb3jsn7c82b29a1c3e'
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com"

const createRequest = (url) => ({url,headers: cryptoNewsHeader})

export const cryptoNewsApi = createApi({

    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) =>({
      getCryptoNews: builder.query({
        query: ( {newsCategory,count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`), //
      })
    })
  })

export const { useGetCryptoNewsQuery } = cryptoNewsApi