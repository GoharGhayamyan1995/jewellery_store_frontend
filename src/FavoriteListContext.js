import React, { createContext, useState, useEffect } from 'react';

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

  return (
    <FavoriteListContext.Provider value={{ favoriteItems, setFavoriteItems, itemsCount }}>
      {children}
    </FavoriteListContext.Provider>
  );
};