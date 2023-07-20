import React, { useState } from 'react';

function ErrorMessage(props) {
  const { empty } = props;



  return (
    <div className={`absolute bg-slate-50 p-2 rounded-2xl ${empty==false ? 'right-5': '-right-[200px]'} transition-all top-5`}>
     Input is empty
    </div>
  );
}

export default ErrorMessage;