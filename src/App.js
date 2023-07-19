import React, { useState } from 'react'
import {useGetGoodsQuery,useAddProductMutation,useDeleteProductMutation}  from './redux/goodsApi'
import { Link } from 'react-router-dom';
import ErrorMessage from './components/ErrorMessage';
function App() {

  const [count, setCount] = useState('')
  const [newProduct,setNewProduct]=useState('')
  //Count который мы поместили в useGetGoodsQuery пойдет в goodsApi
  const{data=[],isLoading}=useGetGoodsQuery(count);
  //Из хука достаем функцию  
  const [addProduct,{isError}]=useAddProductMutation();
  const [deleteProduct]=useDeleteProductMutation()
  
  //Вызываем функцию при клике
  const handleAddProduct= async()=>{
    console.log('clicked');
    if (newProduct) {
      await addProduct({name:newProduct}).unwrap();
      setNewProduct('')
    }
  }

  const handleDeleteProduct= async(id)=>{
    await deleteProduct(id).unwrap()
  }

  if (isLoading) return <h1>Loading</h1>
  
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex w-1/3 justify-between">
        <div className='w-full gap-[10px]'>
          <input 
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            className='py-3 pl-3 w-[65%] text-2xl'
          />
          <button className='bg-green-400' onClick={handleAddProduct}>Add product</button>
        </div>

        <div>
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

      </div>

      <div className="flex gap-10 flex-col w-1/3 mt-10">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="color-2 flex justify-center relative items-center p-5"
            >
              <Link to={`/goods/${item.id}`}>
                {item.id}.{item.name}
              </Link>
              <button
                className="absolute right-3 bg-red-700 rounded-lg text-xs p-1"
                onClick={(e) => handleDeleteProduct(item.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
      {/* При newProduct равном пустому значению, rightPosition будет '0', иначе '100px' */}
      {newProduct === '' && <ErrorMessage  newProduct={newProduct}/>}
    </div>
    </div>
  );
}

export default App