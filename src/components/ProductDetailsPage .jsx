import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetGoodByIdQuery } from '../redux/goodsApi';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetGoodByIdQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>Product not found</h1>;
  }

  const { name,title } = data;

  return (
    <div className='w-full bg-slate-400 flex flex-col items-center'>
      <h1 className='text-3xl'>Product Details:</h1>
      <p className='text-xl'>Name: {name}</p>
      <p className='text-xl'>Title: {title}</p>
    </div>
  );
};

export default ProductDetailsPage;