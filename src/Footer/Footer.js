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
        <h5>Контакты</h5>
        <ul>
          <li>Телефон/viber/whatsApp: +37497344511</li>
          <li>График работы: Пн-Пт, 9:00-18:00</li>
          <a href="https://www.facebook.com/handmademontiru" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="" /></a>
          <a href="https://www.instagram.com/mon.tiru/" target="_blank" rel="noopener noreferrer"> <img src={instagram} alt="" /></a>
        </ul>
      </div>
      <div className="column">
        <h5>Кто мы</h5>
        <ul>
          <li>Наша команда</li>
          <li>Наши магазины</li>
        </ul>
      </div>
      <div className="column">
        <h5>Информация</h5>
        <ul>
          <li>Гарантия качества</li>
          <li>Возврат товара</li>
          <li>Уход за бижутерией</li>
        </ul>
      </div>
    </footer>
    </div>
  );
}

export default Footer;