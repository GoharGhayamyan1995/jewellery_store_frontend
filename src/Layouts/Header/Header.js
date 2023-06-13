import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import montirulogo1 from '../../Layouts/Header/image/montirulogo1.jpg';
import heart from '../../Layouts/Header/image/heart.png';
import shoppingbag from '../../Layouts/Header/image/shopping-bag.png';
import key2 from '../../Layouts/Header/image/icons8-key.png';
import search from '../../Layouts/Header/image/search.png';
import arrow from '../../Layouts/Header/image/icons8-arrow.png';
import { UserContext } from '../../UserContext';
import { FavoriteListContext } from '../../FavoriteListContext';
import { CartContext } from '../../CartContext';
import { useNavigate } from 'react-router-dom';

function Header({ searchResults, setSearchResults }) {
  const navigate=useNavigate()

  const { cartProducts,setCartProducts,cartProductsCount} = useContext(CartContext);
  const { favoriteItems,setFavoriteItems,itemsCount} = useContext(FavoriteListContext);

  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3002/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const products = await response.json();
        setSearchResults(products);
        setQuery('');
      } else {
        console.error('Ошибка при выполнении запроса поиска');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    restoreUserFromLocalStorage();
    restoreCartProductsFromLocalStorage(); 
    restoreFavoriteItemsFromLocalStorage()// Восстановление товаров в корзине из localStorage

  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3002/category');
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } else {
        console.error('Ошибка при получении категорий');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const restoreUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser({ userName: user.userName });
    }
  };
  const restoreCartProductsFromLocalStorage = () => {
    const storedCartProducts = localStorage.getItem('cartProducts');
    if (storedCartProducts) {
      const cartProducts = JSON.parse(storedCartProducts);
      setCartProducts(cartProducts);
    }
  };

  const restoreFavoriteItemsFromLocalStorage = () => {
    const storedFavoriteItems= localStorage.getItem('favoriteItems');
    if (storedFavoriteItems) {
      const favoriteItems = JSON.parse(storedFavoriteItems);
      setFavoriteItems(favoriteItems);
    }
  };

  useEffect(() => {
    if (user.userName) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (favoriteItems.length > 0) {
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  
    const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('favoriteItems');
      localStorage.removeItem('cartProducts');
    
      setUser('');
       setFavoriteItems(''); 
      setCartProducts(''); 
      navigate('/');
    };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header-wrapper">
      <header>
        <div className="logotip">
          <div className="logo">
            <Link to="/">
            <img src={montirulogo1} alt="" />
            </Link>
          </div>
          <div className="icons">
            <div className="icon">
              <Link to="/favoritelist"style={{ textDecoration: 'none' }}>
                <img src={heart} alt="" />
                <span>{itemsCount}</span>
              </Link>
            </div>
            <div className="icon">
              <Link to="/cart"style={{ textDecoration: 'none' }}>
                <img src={shoppingbag} alt="" />
                <span>{cartProductsCount}</span>
              </Link>
            </div>
            {user.userName ? (
              <div className="icon">
                <img src={key2} alt="" onClick={toggleDropdown} />
                <span>{user.userName}</span>
                <img src={arrow} alt="" onClick={toggleDropdown} />
                {showDropdown && (
                  <div className="dropdown">
                    
                      <p onClick={handleLogout}>Logout</p>
                    
                  </div>
                )}
              </div>
            ) : (
              <div className="icon">
                <img src={key2} alt="" />
                <Link to="/auth"style={{ textDecoration: 'none' }}>
                  <span className="login">Войти</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="nav">
          <div className="categories" >
            {categories.map((category) => (
              <div key={category.id}>
                <Link to={`/products/${category.id}`} style={{ textDecoration: 'none' }}><p>{category.name}</p></Link>
              </div>
            ))}
          </div>
          <div className="search">
            <input type="text" placeholder="որոնում․․․" value={query} onChange={handleInputChange} />
            <Link to="/search">
              <button className="search-button" onClick={handleSearch}>
                <img src={search} alt=" " />
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;