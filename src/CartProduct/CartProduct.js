import { useEffect, useState, useContext } from 'react';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import './CartProduct.css';
import cross from '../CartProduct/images/cross.png'
import emptycart from '../CartProduct/images/empty-cart.jpg'

import { CartContext } from '../CartContext';



function CartProduct() {

  const [totalPrice, setTotalPrice] = useState(0);
  const { cartProducts, setCartProducts } = useContext(CartContext);


  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const user = localStorage.getItem('token');
        if (user) {
          const decoded = decodeToken(user);
          const id = decoded.id;

          const response = await fetch(`http://localhost:3002/cartProduct/${id}`);
          const cartProductData = await response.json();
          setCartProducts(cartProductData);
          console.log(cartProductData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartProducts();
  }, [setCartProducts]);

  const handleDeleteCartProduct = async (id) => {
    try {
      console.log(id);
      await fetch(`http://localhost:3002/cartproduct/${id}`, {
        method: 'DELETE',
      });

      setCartProducts((prevProducts) =>
        prevProducts.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };


  const updateQuantity = async (id, quantity) => {

    try {
      await fetch(`http://localhost:3002/cartProducts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      if (quantity === 0) {
        setCartProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));

      } else {
        setCartProducts((prevProducts) =>
          prevProducts.map((item) => {
            if (item.id === id) {
              return { ...item, quantity };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartProducts.forEach((product) => {
        totalPrice += product?.Product?.price * product.quantity;
      });
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartProducts]);



  return (
    <div className="cart-products-container">
      <h2>ԶԱՄԲՅՈՒՂ</h2>
      {cartProducts.length === 0 ? (
        <div>
          <p>Ձեր զամբյուղը դատարկ է</p>
          <img src={emptycart} alt='' />
        </div>
      ) : (
        <>
          {cartProducts.map((product) => (
            <div className="cart-product-card" key={product?.Product?.id}>
              <img src={cross} alt="" onClick={() => handleDeleteCartProduct(product.id)} />
              {product.Product && (
                <>
                  <img
                    className="cart-product-image"
                    src={`http://localhost:3002/${product.Product.image}`}
                    alt={product.Product.name}
                  />
                  <p className="cart-product-name">{product.Product.name}</p>
                  <p className="cart-product-price">AMD {product.Product.price}</p>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, Math.max(product.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <input
                    value={product.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      updateQuantity(product.id, newQuantity);
                    }}
                  />
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        Math.min(product.quantity + 1, product.Product.quantity)
                      )
                    }
                  >
                    +
                  </button>
                </>
              )}
            </div>
          ))}
          <div className="priceandorder">
            <p>Ընդհանուր գին: {totalPrice}</p>
            <Link to="order">
              <button className="btnorder">Գրանցել պատվերը</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartProduct;