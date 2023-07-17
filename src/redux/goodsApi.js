import { createApi,fetchBaseQuery}from '@reduxjs/toolkit/query/react'

 export const goodsApi=createApi({
    reducerPath:'goodsApi',
    //tagTypes-можно называть как угодно,это сущности с которыми мы работает,даем название
    tagTypes:['Products'],
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001/'}),
    endpoints:(build)=>({
        getGoods:build.query({
            query: (limit='')=> `goods?${limit && `_limit=${limit}`}`,

            //Тут мы должны уточнить с чем мы работали
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
        })
    })
 })
 //Экспортируем
 export const {useGetGoodsQuery,useAddProductMutation,useDeleteProductMutation}=goodsApi