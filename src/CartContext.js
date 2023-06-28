import React, { createContext, useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProductsCount, setCartProductsCount] = useState(0);

  useEffect(() => {
    const storedCartProducts = localStorage.getItem('cartProducts');
    if (storedCartProducts) {
      const parsedCartProducts = JSON.parse(storedCartProducts);
      setCartProducts(parsedCartProducts);
      setCartProductsCount(parsedCartProducts.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    setCartProductsCount(cartProducts.length);
  }, [cartProducts]);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeToken(token);
        const requestData = {
          productId,
          userId: decoded.id,
          quantity: 1,
        };

        const response = await fetch('http://localhost:3002/cartproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData, 'data');


          const updatedCartProducts = [...cartProducts, responseData];
          setCartProducts(updatedCartProducts);
          // setCartProductsCount(cartProductsCount + 1);


        } else {
          console.error('Error occurred while adding to cart:', response.status);
        }
      }
    } catch (error) {
      console.error('Error occurred while adding to cart:', error);
    }
  };




  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        cartProductsCount,
        addToCart,


      }}
    >
      {children}
    </CartContext.Provider>
  );
};