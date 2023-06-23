import React, { createContext, useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
export const FavoriteListContext = createContext();

export const FavoriteListProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {

    const storedFavoriteItems = localStorage.getItem('favoriteItems');
    if (storedFavoriteItems) {
      const parsedfavoriteItems = JSON.parse(storedFavoriteItems);
      setFavoriteItems(parsedfavoriteItems);
      setItemsCount(parsedfavoriteItems.length);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    setItemsCount(favoriteItems.length);
  }, [favoriteItems]);

  const addToFavoriteList = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeToken(token);
        const requestData = {
          productId,
          userId: decoded.id,
        };
  
        const response = await fetch('http://localhost:3002/favoriteitem', {
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
  
          // Обновление favoriteItems
           const updatedFavoriteItems = [...favoriteItems, responseData];
          setFavoriteItems(updatedFavoriteItems);
  
          // Обновление itemsCount
          setItemsCount(itemsCount + 1);
        } else {
          console.error('Ошибка при добавлении в список избранного:', response.status);
        }
      }
    } catch (error) {
      console.error('Ошибка при добавлении в список избранного:', error);
    }
  };


  return (
    <FavoriteListContext.Provider value={{ favoriteItems, setFavoriteItems, itemsCount,addToFavoriteList }}>
      {children}
    </FavoriteListContext.Provider>
  );
};