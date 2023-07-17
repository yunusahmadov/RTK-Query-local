import React, { useState } from 'react'
import {useGetGoodsQuery,useAddProductMutation}  from './redux/goodsApi'
function App() {

  const [count, setCount] = useState('')
  const [newProduct,setNewProduct]=useState('')
  //Count который мы поместили в useGetGoodsQuery пойдет в goodsApi
  const{data=[],isLoading}=useGetGoodsQuery(count);
  //Из хука достаем функцию  
  const [addProduct,{isError}]=useAddProductMutation();
  
  //Вызываем функцию при клике
  const handleAddProduct= async()=>{
    if (newProduct) {
      await addProduct({name:newProduct}).unwrap();
      setNewProduct('')
    }
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
      {
        data.map((item)=>{
         return <h2 key={item.id}>
            {item.id}-{item.name}
          </h2>
        })
      }
    </div>
  )
}

export default App