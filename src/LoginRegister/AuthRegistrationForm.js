import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { decodeToken } from 'react-jwt';
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
        return response.json();
      } else {
        throw new Error('Registration failed');
      }
    })
    .then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccessMessage('');
      } else {
        setError('');
        setSuccessMessage(data.message);
      }
    })
    .catch((error) => {
      setError('Ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.');
      setSuccessMessage('');
    });
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
        {error && <p>{error}</p>}
        <form onSubmit={handleRegistration}>
          {/* Fields for registration */}
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            City:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Phone:
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="login-form-container">
        <h2>Login</h2>
        {errorLogin && <p>{errorLogin}</p>}
        <form onSubmit={handleLogin}>
          {/* Fields for login */}
          <label>
            Email:
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={passw} onChange={(e) => setPassw(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AuthRegistrationForm;