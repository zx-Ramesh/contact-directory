import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Card } from "@prisma/client";
import { initialValueType } from '@/app/components/Modal';
export const cardsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes:["Posts"],
  endpoints: (builder) => ({
    getCards: builder.query<Card[], void>({
      query: () => '/cards',
      providesTags:["Posts"]
    }),
    addCards:builder.mutation<any, Card>({
      query:(Body)=>({
        method:"POST",
        url:"/card",
        body:Body
      }),
      invalidatesTags:["Posts"]
    }),
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/card?id=${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags:["Posts"]
    }),
    editCards:builder.mutation<Card,Card>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/card?id=${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags:["Posts"]
     
    }),
    
  }),
});

export const { useGetCardsQuery,useAddCardsMutation,useDeletePostMutation,useEditCardsMutation } = cardsApi;
