import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import { Link } from 'react-router-dom';
import tatikpapik from '../Home/foto/tatikpapik.jpg';



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
  console.log(latestProducts,'cvhsb')
  return (
    <div className="home">
      <img src={tatikpapik} alt="" className="foto-tatikpapik" />
      <div className="line-container">
        <hr className="line" />
        <span className="text">Հետաքրքիր նորույթներ</span>
        <hr className="line" />
      </div>
      {Array.isArray(latestProducts) ? (
        latestProducts.map((product) => (
          <div key={product.id}>
            <Link  to={`/product/${product.id}`}>
            <img    src={`http://localhost:3002/${product?.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p> AMD {product.price} </p>
            </Link>
          </div>
        ))
      ) : (
        <p>No latest products available</p>
      )}
    </div>
  );
}

export default Home;