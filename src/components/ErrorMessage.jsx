import React from 'react';

function ErrorMessage(props) {
  const { newProduct } = props;
    
  return (
    <div className={`absolute bg-slate-50 p-2 rounded-2xl ${newProduct==''? 'right-0': '-right-[200px]'}`}>
     Input is empty
    </div>
  );
}

export default ErrorMessage;