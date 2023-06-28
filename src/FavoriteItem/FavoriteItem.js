import { useEffect, useState, useContext } from 'react';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import './FavoriteItem.css';
import { FavoriteListContext } from '../FavoriteListContext';

import cross from '../CartProduct/images/cross.png'

function FavoriteItem() {
  const { favoriteItems, setFavoriteItems } = useContext(FavoriteListContext);

  useEffect(() => {

    const fetchFavoriteItems = async () => {
      try {
        const user = localStorage.getItem('token');
        if (user) {
          const decoded = decodeToken(user);
          const id = decoded.id;

          const response = await fetch(`http://localhost:3002/favoriteitem/${id}`);
          const favoriteProductsData = await response.json();
          setFavoriteItems(favoriteProductsData);
          console.log(favoriteProductsData)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteItems();
  }, [setFavoriteItems]);

  const handleDeleteFavoriteItem = async (id) => {
    try {
      await fetch(`http://localhost:3002/favoriteitems/${id}`, {
        method: 'DELETE',
      });
      setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="cart-products-container">
      <h2>ՆԱԽԸՆՏՐԱԾՆԵՐԻ ՑԱՆԿ</h2>
      {favoriteItems.length === 0 ? (
        <p>Ձեր ընտրյալների ցանկը դատարկ է</p>
      ) : (

        favoriteItems.map((product) => (

          <div className="cart-product-card" key={product?.Product?.id}>
            <img src={cross} alt="" onClick={() => handleDeleteFavoriteItem(product.id)} />
            {product.Product && (
              <>
                <Link to={`/product/${product.Product.id}`} style={{ textDecoration: 'none' }}>

                  <img
                    className="cart-product-image"
                    src={`http://localhost:3002/${product.Product.image}`}
                    alt={product.Product.name}
                  />
                </Link>
                <p className="cart-product-name">{product.Product.name}</p>
                <p className="cart-product-price"> AMD {product.Product.price}</p>

              </>
            )}
          </div>

        ))
      )}
    </div>
  );
}

export default FavoriteItem;