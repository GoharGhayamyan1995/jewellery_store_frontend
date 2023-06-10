import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import { Link } from 'react-router-dom';
import tatikpapik from '../Home/foto/tatikpapik.jpg';
import home from '../Home/foto/home-image.jpg';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const response = await fetch('http://localhost:3002/products/latest');
      if (response.ok) {
        const data = await response.json();
        setLatestProducts(data.latestProducts);
        console.error('Failed to fetch latest products:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error while fetching latest products:', error);
    }
  };

  useEffect(() => {
    console.log('latestProducts:', latestProducts);
  }, [latestProducts]);

  return (
    <div className="home">
      <img src={home} alt="" className="foto-tatikpapik" />
      <div className="line-container">
        <hr className="line" />
        <span className="text">Հետաքրքիր նորույթներ</span>
        <hr className="line" />
      </div>
      <div className="latesproducts">
        {latestProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}style={{ textDecoration: 'none' }}>
            <div>
              <img src={`http://localhost:3002/${product?.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>AMD {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <hr className="liniya" />
      <div className="about">
        <p>
          MonTiru-ն Արցախի բնության գեղեցկությունը հավերժացնում է նուրբ և ինքնատիպ զարդերի մեջ։ Յուրահատուկ ու հիշվող
          նվերի փնտրտուքի մեջ, որը նաև կլինի արցախյան, MonTiru հենց այն է ինչ դու փնտրում ես։ Ցանկանում ես
          զարդատուփիդ մեջ հյուրընկալել ժամանակի զարկերակը և լինել ինքնատիպ ու էլեգանտ, ուրեմն MonTiru-ն հենց քեզ համար
          է։ Արցախյան ծաղիկներով, քարերով և ոգով պատրաստված MonTiru-ի զարդերը կզարդարեն ձեզ և ձեր ներաշխարհը։ Ստեղծի՛ր
          քո ամբողջական ու գեղեցիկ կերպարը MonTiru-ի հետ։ MonTiru-ի զարդերում պահպանվում են ամեն մի ծաղկի
          գեղեցկությունը և անկրկնելիությունը։ Մեր ստեղծած զարդերը տարբերվում են իրենց գեղեցկությամբ ու օրինակով։
          Ընտրիր քո ճաշակի մի մասնիկը մեր զարդերից
        </p>
      </div>
    </div>
  );
}

export default Home;