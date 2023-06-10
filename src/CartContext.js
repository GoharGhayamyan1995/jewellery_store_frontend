import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProductsCount, setCartProductsCount] = useState(0);

  useEffect(() => {

    const storedCartProducts = localStorage.getItem('cartProducts');
    if (storedCartProducts) {
      const parsedCartProducts = JSON.parse(storedCartProducts);
      setCartProducts(parsedCartProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    setCartProductsCount(cartProducts.length);
  }, [cartProducts]);
    // Функция для добавления продукта в корзину


  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, cartProductsCount }}>
      {children}
    </CartContext.Provider>
  );
};