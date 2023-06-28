import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import free from '../ProductInfo/images/free-delivery.png'
import whatsapp from '../ProductInfo/images/whatsapp.png'
import '../ProductInfo/ProductInfo.css'
import { CartContext } from "../CartContext";
import { FavoriteListContext } from "../FavoriteListContext";



export default function Product() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const { id } = useParams();
  const [data, setData] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { addToFavoriteList } = useContext(FavoriteListContext);
  useEffect(() => {
    console.log(data, "data");
    console.log('ID:', id);
    fetch('http://localhost:3002/one/' + id)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [id]);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, []);

  return (
    <div className="more_info">
      <img src={data?.image ? `http://localhost:3002/${data.image}` : ''} alt={data && data.name} />
      <div className="info">
        <h2>{data.name}</h2>
        <h3>գինը: {data.price} AMD</h3>

        <h3>մետաղի տեսակ: {data.metal}</h3>
        {/* <p>{data.description}</p> */}
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
              if (userAuthenticated) {
                addToCart(data.id);
              } else {
                alert('Խնդրում ենք զամբյուղին կամ ընտրյալների ցանկին տվյալներ ավելացնելու համար գրանցվել, կամ մուտք գործել համակարգ');
              }
            }}
          >
            Ավելացնել զամբյուղին
          </button>


          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              if (userAuthenticated) {
                addToFavoriteList(data.id);
              } else {
                alert('Խնդրում ենք զամբյուղին կամ ընտրյալների ցանկին տվյալներ ավելացնելու համար գրանցվել, կամ մուտք գործել համակարգ');
              }
            }}
          >
            Ընտրյալների ցանկին
          </button>
        </div>


      </div>
    </div>
  );
}