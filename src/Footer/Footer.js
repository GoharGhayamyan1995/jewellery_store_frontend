import React from 'react';
import '../Footer/Footer.css'; 
import { Link } from 'react-router-dom';
import facebook from '../Footer/icons/icons8-facebook-новый-48 (1).png'
import instagram from '../Footer/icons/icons8-instagram-48 (2).png'

function Footer() {
  return (
     <div className='app'>
    <footer className="footer">
      <div className="column">
        <h5>Կոնտակտներ</h5>
        <ul>
          <li>հեռախոս/viber/whatsApp: +37497344511</li>
          <li>Աշխատանքային գրաֆիկ: երկ-ուրբ, 9:00-18:00</li>
          <a href="https://www.facebook.com/handmademontiru" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="" /></a>
          <a href="https://www.instagram.com/mon.tiru/" target="_blank" rel="noopener noreferrer"> <img src={instagram} alt="" /></a>
        </ul>
      </div>
      <div className="column">
        <h5>Ով ենք մենք</h5>
        <ul>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <li>Մեր մասին</li>
          </Link>
          <Link to="/shops" style={{ textDecoration: 'none' }}>
          <li>Մեր հասցեն</li>
          </Link>
        </ul>
      </div>
      <div className="column">
        <h5>Ինֆորմացիա</h5>
        <ul>
          <Link to="/quality"style={{ textDecoration: 'none' }}>
          <li>Որակի երաշխավորում</li>
          </Link>
          <li>Возврат товара</li>
          <li>Уход за бижутерией</li>
        </ul>
      </div>
    </footer>
    </div>
  );
}

export default Footer;