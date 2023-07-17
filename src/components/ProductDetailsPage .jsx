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

  const { name } = data;

  return (
    <div>
      <h1>Product Details:</h1>
      <p>Name: {name}</p>
    </div>
  );
};

export default ProductDetailsPage;