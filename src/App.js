import React, { useState } from 'react'
import {useGetGoodsQuery,useAddProductMutation,useDeleteProductMutation}  from './redux/goodsApi'
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
    <div>
      <div>
        <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)}/>
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <div>
      <select value={count} onChange= {(e) => setCount (e.target.value) }>
          <option value=''>all</option>
          <option value="1">1</option> 
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
        <div>
        {
        data.map((item)=>{
         return <div key={item.id}>
          <h2 >
            {item.id}-{item.name}
            <button onClick={(e)=>handleDeleteProduct(item.id)}>X</button>
          </h2>
         </div>
        })
      }
        </div>
    </div>
  )
}

export default App