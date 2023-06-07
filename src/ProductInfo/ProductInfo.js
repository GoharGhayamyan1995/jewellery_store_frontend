import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import free from '../ProductInfo/free-delivery.png'
import whatsapp from '../ProductInfo/whatsapp.png'
import '../ProductInfo/ProductInfo.css'


export default function Product() {
  // const { handleClick } = useContext(CountContext);

  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3002/one/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  async function addToCart(productId) {
    try {
      const user = localStorage.getItem("token");
      if (user) {
        const decoded = decodeToken(user);
        console.log(decoded);
        const requestData = {
          productId,
          userId: decoded.id,
          quantity: 1,
        };

        const response = await fetch("http://localhost:3002/cartproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData, "data");
        } else {
          console.error("Error occurred while adding to cart:", response.status);
        }
      }
    } catch (error) {
      console.error("Error occurred while adding to cart:", error);
    }
  }
  async function addToFavoriteList(productId) {
    try {
      const user = localStorage.getItem("token");
      if (user) {
        const decoded = decodeToken(user);
        console.log(decoded);
        const reqData = {
          productId,
          userId: decoded.id,
         
        };

        const response = await fetch("http://localhost:3002/favoriteitem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        });

        if (response.ok) {
          const resData = await response.json();
          console.log(resData, "data");
        } else {
          console.error("Error occurred while adding to favoritelist:", response.status);
        }
      }
    } catch (error) {
      console.error("Error occurred while adding to favoritelist:", error);
    }
  }

  return (
    <div className="more_info">
      <img src={`http://localhost:3002/${data.image}`} alt={data.name} />
      <div className="info">
        <h2>{data.name}</h2>
        <h3>գինը` {data.price} AMD</h3>
      
        <p><b>մետաղի տեսակ՝</b> {data.metal}</p>
        <p>{data.description}</p>
        <div className="free">
       <img src={free} alt="" /> <p>ԱՆվճար առաքում սկսած 5000 դրամից</p>
       </div>
       <div className="whatsapp">
       <img src={whatsapp} alt="" /> <p>whatsapp բոլոր հարցերը</p>
       </div>
     
       <div className="btn-container">
  <button
    className="btn"
    onClick={(e) => {
      e.preventDefault();
      addToCart(data.id);
    }}
  >
    Add to cart
  </button>

  <button
    className="btn"
    onClick={(e) => {
      e.preventDefault();
      addToFavoriteList(data.id);
    }}
  >
    Add to favoritelist
  </button>
</div>
        
      </div>
    </div>
  );
}