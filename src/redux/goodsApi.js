import { createApi,fetchBaseQuery}from '@reduxjs/toolkit/query/react'
import { MAIN_URL } from '../URL/URL'

 export const goodsApi=createApi({
    reducerPath:'goodsApi',
    //tagTypes-можно называть как угодно,это сущности с которыми мы работает,даем название
    tagTypes:['Products'],
    baseQuery:fetchBaseQuery({baseUrl:`${MAIN_URL}`}),
    endpoints:(build)=>({
        getGoods:build.query({
            query: (limit='')=> `goods?${limit && `_limit=${limit}`}`,

            //Уточняем с чем мы работали
            providesTags:(result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Products', id })),
                  { type: 'Products', id: 'LIST' },
                ]
              : [{ type: 'Products', id: 'LIST' }],
        }),
        //Cоздаем новый endpoint с методом POST c baseUrl+url и передаем body
        addProduct:build.mutation({
            query:(body)=>({
                url:'goods',
                method: 'POST',
                body,
            }),
        //Тут мы указываем что у нас поменялось и нужно обновить список
        invalidatesTags:[{type:'Products',id:'LIST'}]
        }),

        deleteProduct: build.mutation({
            query:(id)=>({
                url:`goods/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:[{type:'Products',id:'LIST'}]
        }),
        getGoodById: build.query({
            query: (id) => `goods/${id}`, // В данном случае мы используем id для составления запроса
            providesTags: ['Products'], // Указываем тег, который будет инвалидирован при получении новых данных
        }),
    })
 })
 //Экспортируем
 export const {useGetGoodsQuery,useAddProductMutation,useDeleteProductMutation,useGetGoodByIdQuery}=goodsApi