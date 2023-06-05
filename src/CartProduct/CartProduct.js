

import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import './CartProduct.css'; // Импортируйте стили
import cross from './cross.png'


function CartProduct() {
 
  const [cartProducts, setCartProducts] = useState([]);
 

  useEffect(() => {
   
    const fetchCartProducts = async () => {
      try {
        const user = localStorage.getItem('token');
        if (user) {
          const decoded = decodeToken(user);
          const id = decoded.id;

          const response = await fetch(`http://localhost:3002/cartProduct/${id}`);
          const cartProductData = await response.json();
          setCartProducts(cartProductData);
          console.log(cartProductData)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleDeleteCartProduct = async (id) => {
   
    try {
      console.log(id)
      await fetch(`http://localhost:3002/cartproduct/${id}`, {
        method: 'DELETE',
      });
      // Obyazatel'no ne zabud'te obnovit' spisok izbrannykh produktov
      setCartProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);  
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await fetch(`http://localhost:3002/cartProducts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      if (quantity === 0) {
        // Если количество равно нулю, удаляем продукт из состояния cartProducts
        setCartProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
      } else {
        // Обновляем количество продукта в состоянии cartProducts
        setCartProducts((prevProducts) =>
          prevProducts.map((item) => {
            if (item.id === id) {
              return { ...item, quantity };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className="cart-products-container">
      <h1>Продукты в корзине:</h1>
      {cartProducts.length === 0 ? (
        <p>Ваш список избранных пуст</p>
      ) : (
      cartProducts.map((product) => (
        <div className="cart-product-card" key={product.Product.id}>
          <img src={cross} alt="" onClick={() => handleDeleteCartProduct(product.id)} />
          <img className="cart-product-image" src={`http://localhost:3002/${product.Product.image}`} alt={product.Product.name} />
          <p className="cart-product-name">{product.Product.name}</p>
          <p className="cart-product-price">{product.Product.price}</p>
          <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
       
      <input value={product.quantity} readOnly  />
    
          <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
        </div>
      )))}
    </div>
  );
}

export default CartProduct;




