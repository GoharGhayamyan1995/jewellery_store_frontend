import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import './FavoriteItem.css'; // Импортируйте стили
import cross from '../CartProduct/cross.png'

function FavoriteItem() {
  const [favoriteItems, setFavoriteItems] = useState([]);

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
  }, []);

  const handleDeleteFavoriteItem = async (id) => {
    try {
      await fetch(`http://localhost:3002/favoriteitems/${id}`, {
        method: 'DELETE',
      });
      // Obyazatel'no ne zabud'te obnovit' spisok izbrannykh produktov
      setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-products-container">
      <h1>Продукты :</h1>
      {favoriteItems.length === 0 ? (
        <p>Ваш список избранных пуст</p>
      ) : (
        favoriteItems.map((product) => (
          <div className="cart-product-card" key={product.Product.id}>
            <img src={cross} alt="" onClick={() => handleDeleteFavoriteItem(product.id)} />
            <img
              className="cart-product-image"
              src={`http://localhost:3002/${product.Product.image}`}
              alt={product.Product.name}
            />
            <p className="cart-product-name">{product.Product.name}</p>
            <p className="cart-product-price">{product.Product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteItem;