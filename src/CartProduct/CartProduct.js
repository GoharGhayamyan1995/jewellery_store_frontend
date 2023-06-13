import { useEffect, useState ,useContext} from 'react';
import { decodeToken } from 'react-jwt';
import './CartProduct.css'; // Импортируйте стили
import cross from './cross.png'
import { CartContext } from '../CartContext';



function CartProduct() {

  const [totalPrice, setTotalPrice] = useState(0);

  // const [cartProducts, setCartProducts] = useState([]);
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
          // setContextCartProducts(cartProductData);
          localStorage.setItem('cartProducts', JSON.stringify(cartProductData)); // Добавлено обновление localStorage
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
  
      // Удаляем продукт из состояния cartProducts
      setCartProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  // Обновляем localStorage при изменении cartProducts
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}, [cartProducts]);

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
        // Если количество равно нулю, удаляем продукт из состояния cartProducts
        setCartProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));

      } else {
        // Обновляем количество продукта в состоянии cartProducts
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
      <h1>Продукты в корзине:</h1>
      {cartProducts.length === 0 ? (
  <p>Ваш список избранных пуст</p>
) : (
  cartProducts.map((product) => (
    <div className="cart-product-card" key={product?.Product?.id}>
      <img src={cross} alt="" onClick={() => handleDeleteCartProduct(product.id)} />
      {product.Product && (
        <>
          <img className="cart-product-image" src={`http://localhost:3002/${product.Product.image}`} alt={product.Product.name} />
          <p className="cart-product-name">{product.Product.name}</p>
      
      <p className="cart-product-price">AMD {product.Product.price}</p>
          <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
       
      <input value={product.quantity} readOnly  />
    
          <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
          </>
      )}
        </div>
      )))}
       <div>
        <p>Общая цена: {totalPrice}</p>
       </div>
    </div>
  );
}

export default CartProduct;