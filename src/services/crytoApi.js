import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const crytoApiHeader = {
    'X-RapidAPI-Key': '885df434cbmsh5638515922167c0p167f6djsn3ce665a6ebf1',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';


const createRequest = (url) => ({  url , headers :  crytoApiHeader})

export const crytoApi = createApi({
    reducerPath: 'crytoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query:(coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query:({coinId,timePeriod}) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`) 
        }),
        getExchanges: builder.query({
            query:() => createRequest('/exchanges') 
        }),
    })
})


export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery,
} = crytoApi;


// /${timePeriod}