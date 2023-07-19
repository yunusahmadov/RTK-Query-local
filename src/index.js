import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import ProductDetailsPage from './components/ProductDetailsPage ';
import '../src/index.css'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/goods/:id" element={<ProductDetailsPage />} /> 
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);