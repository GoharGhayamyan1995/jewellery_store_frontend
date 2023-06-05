import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import montirulogo1 from '../../Layouts/Header/image/montirulogo1.jpg';
import heart from '../../Layouts/Header/image/heart.png';
import shoppingbag from '../../Layouts/Header/image/shopping-bag.png';
import key from '../../Layouts/Header/image/key.png';
import key1 from '../../Layouts/Header/image/free-icon-key-705755.png'
import key2 from '../../Layouts/Header/image/icons8-key.png'
import search from '../../Layouts/Header/image/search.png';
import arrow from '../../Layouts/Header/image/icons8-arrow.png'
import  { useContext } from 'react';
import { UserContext } from '../../UserContext'
import { decodeToken } from 'react-jwt';



function Header({ searchResults, setSearchResults}) {
  // const { data } = useContext(UserContext);
  const {user,setUser}= useContext(UserContext);


  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
 

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3002/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
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
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = decodeToken(token);
    const user = { userName: decoded.userName };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
};


  return (
    <div className="header-wrapper">
  
      <header>
        <div className="logotip">
          <div className="logo">
            <img src={montirulogo1} alt="" />
          </div>
          <div className="icons">
            <div className="icon">
              <Link to="/favoritelist">
              <img src={heart} alt="" /><span>0</span></Link>
            </div>
            <div className="icon">
            <Link to="/cart"><img src={shoppingbag} alt="" /><span>0</span></Link>
            </div>
            {/* <Link to="/auth">
            <div className="icon">
            <img src={key2} alt="" /> <p>voyti</p>
            </div>
            </Link> */}
 {user.userName ? (
  <div className="icon">
    <img src={key2} alt="" />
    <span>{user.userName}</span><img src={arrow} alt=""/>
  </div>
) : (
  <div className="icon">
    <img src={key2} alt="" />
    <Link to="/auth"><span className='login'>Войти</span></Link>
  </div>
)}
          </div>
        </div>
        <div className="nav">
        <div className="categories">
          {categories.map((category) => (
            <span key={category.id}>   <Link  to={`/products/${category.id}`}>{category.name}  </Link></span>
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