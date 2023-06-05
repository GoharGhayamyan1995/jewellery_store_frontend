import logo from './logo.svg';

import { Route,Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layouts/Layout.js';
import Home from './Home/Home.js'
import Footer from './Footer/Footer'
import ProductByCategory from './ProductByCategory/ProductByCategory'
import ProductInfo from './ProductInfo/ProductInfo'

import AuthRegistrationForm from './LoginRegister/AuthRegistrationForm';
import CartProduct from './CartProduct/CartProduct';
import FavoriteItem from './FavoriteItem/FavoriteItem';

function App() {
  
 

  return (
    <div className="App">
    <Layout/>
    <Routes>
    <Route path='/' element={ <Home/>}/>
    <Route path='/auth' element={<AuthRegistrationForm />}/>
    <Route path='/products/:categoryId' element={<ProductByCategory/>}/>
    <Route path="/product/:id" element={<ProductInfo />}/>
    <Route path="/cart" element={<CartProduct />}/>
    <Route path="/favoritelist" element={<FavoriteItem />}/>
 
    </Routes>
<Footer/>
    </div>
  );
}

export default App;
