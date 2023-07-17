import { createApi,fetchBaseQuery}from '@reduxjs/toolkit/query/react'

 export const goodsApi=createApi({
    reducerPath:'goodsApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001/'}),
    endpoints:(build)=>({
        getGoods:build.query({
            query: (limit='')=> `goods?${limit && `_limit=${limit}`}`,
        }),
        //Cоздаем новый endpoint с методом POST c baseUrl+url и передаем body
        addProduct:build.mutation({
            query:(body)=>({
                url:'goods',
                method: 'POST',
                body,
            })
        })
    })
 })
 //Экспортируем
 export const {useGetGoodsQuery,useAddProductMutation}=goodsApi