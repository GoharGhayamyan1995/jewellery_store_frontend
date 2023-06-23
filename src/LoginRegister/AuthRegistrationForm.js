import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { decodeToken } from 'react-jwt';
import { CartContext } from '../CartContext';
import { FavoriteListContext } from '../FavoriteListContext';

import '../LoginRegister/AuthRegitrationForm.css';

const AuthRegistrationForm = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [passw, setPassw] = useState('');
  const [error, setError] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setCartProducts} = useContext(CartContext);
  const { setFavoriteItems } = useContext(FavoriteListContext);

  

  const handleRegistration = (e) => {
  e.preventDefault();
  fetch('http://localhost:3002/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      city,
      email,
      password,
      phone,
    }),
  })
    .then((response) => {
      if (response.ok) {
        setFirstName('');
        setLastName('');
        setCity('');
        setEmail('');
        setPassword('');
        setPhone('');
        setSuccessMessage('Registration successful');

        return response.json();
      }  else {
        return response.json().then((data) => {
          if (data.error) {
            setError(data.error);
          }
        });
      }
    })
    .catch((error) => {
      setError('Ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.');
    });
};


const fetchCartProducts = async () => {
  try {
    const user = localStorage.getItem('token');
    if (user) {
      const decoded = decodeToken(user);
      const id = decoded.id;

      const response = await fetch(`http://localhost:3002/cartProduct/${id}`);
      const cartProductData = await response.json();
      setCartProducts(cartProductData);
      // localStorage.setItem('cartProducts', JSON.stringify(cartProductData));
      console.log(cartProductData);
    }
  } catch (error) {
    console.error(error);
  }
};
const fetchFavoriteItems = async () => {
  try {
    const user = localStorage.getItem('token');
    if (user) {
      const decoded = decodeToken(user);
      const id = decoded.id;

      const response = await fetch(`http://localhost:3002/favoriteitem/${id}`);
      const favoriteProductsData = await response.json();
      setFavoriteItems(favoriteProductsData);
      // localStorage.setItem('favoriteItems', JSON.stringify(favoriteProductsData));

      console.log(favoriteProductsData)
  } 
} catch (error) {
  console.error(error);
}
};


  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: mail,
        password: passw,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        const { userName, role, jwt } = data;
        setUser((prevUser) => ({ ...prevUser, userName: userName }));
        if (data.error) {
          setErrorLogin(data.error);
        }
        if (data.role === 'user') {
          navigate('/');
          fetchCartProducts();
          fetchFavoriteItems()

        } else {
          navigate('/auth');
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="auth-registration-form">
      <div className="registration-form-container">
        <h2>Registration</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleRegistration}>
          {/* Fields for registration */}
          <label>
            <p>Անուն(մին․ 3 սիմվոլ)*</p>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
          <p>Ազգանուն(մին․ 3 սիմվոլ)*</p>

            <input type="text"  value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
          <p>Քաղաք(մին․ 3 սիմվոլ)*</p>
            <input type="text"  value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
          <p>էլ․ փոստ*</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
          <p>Գաղտնաբառ*</p>
            <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
          <p>Հեռախոս*</p>

            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="login-form-container">
        <h2>Login</h2>
        {errorLogin && <p className='error'>{errorLogin}</p>}
        <form onSubmit={handleLogin}>
          {/* Fields for login */}
          <label>
          <p>Էլ․ փոստի հասցե*</p>
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
          </label>
          <label>
          <p>Գաղտնաբառ*</p>
            <input type="password"   value={passw} onChange={(e) => setPassw(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AuthRegistrationForm;