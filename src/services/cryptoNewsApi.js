import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const cryptoNewsHeader ={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '885df434cbmsh5638515922167c0p167f6djsn3ce665a6ebf1',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({  url , headers :  cryptoNewsHeader})

export const crytoNewsApi = createApi({
    reducerPath: 'crytoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query:({newsCategory , count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})


export const {
    useGetCryptoNewsQuery,
} = crytoNewsApi;