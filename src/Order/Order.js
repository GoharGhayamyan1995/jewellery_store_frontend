import { decodeToken } from 'react-jwt';
import  { useState,useContext } from 'react';
import { CartContext } from '../CartContext';
import '../Order/Order.css';

const CreateOrder = () => {
  const { cartProducts } = useContext(CartContext);

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentCardNumber, setPaymentCardNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);

  const calculateTotalAmount = (cartProducts, quantities) => {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      const cartProduct = cartProducts[i];
      const quantity = quantities[i];
      total += cartProduct.Product.price * quantity;
    }
    return total;
  };

  const handleCreateOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeToken(token);
        const userId = decoded.id;
        console.log('userId:', userId);

        let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const quantities = cartProducts.map((product) => product.quantity);

        // Include product price in cartProducts
        cartProducts = cartProducts.map((product) => ({
          ...product,
          price: product.Product.price,
        }));

        const totalAmount = calculateTotalAmount(cartProducts, quantities);

        const orderData = {
          userId,
          cartProducts,
          quantity: quantities,
          totalAmount,
          address,
          postalCode,
          paymentCardNumber,
        };

        const response = await fetch('http://localhost:3002/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error('Failed to create the order.');
        }

        const result = await response.json();
        console.log(result);
        setOrderStatus('success');
        // Handle success, display a success message, redirect, or perform any other desired actions
      }
    } catch (error) {
      console.error(error);
      setOrderStatus('error');
      // Handle error, display an error message, or perform any other desired error handling
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!address) {
      errors.address = 'Address is required';
    }

    if (!postalCode) {
      errors.postalCode = 'Postal Code is required';
    }

    if (!paymentCardNumber) {
      errors.paymentCardNumber = 'Payment Card Number is required';
    } else if (!/^\d{16}$/.test(paymentCardNumber)) {
      errors.paymentCardNumber = 'Payment Card Number should be a 16-digit number';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleCreateOrder();
    }
  };
  const calculateTotalPrice = (product) => {
    return product.Product.price * product.quantity;
  };
  return (
      // <>
          <div className="order-container">
       <h4>ՊԱՏՎԵՐԻ ԳՐԱՆՑՈՒՄ</h4>
  <ul>
    {cartProducts.map((product) => (
      <li key={product.id} className="product-item">
        <div className="image-container">
          <img src={`http://localhost:3002/${product.Product.image}`} alt={product.Product.name} />
        </div>
        <div className="product-info">
          <p>{product.Product.name}</p>
          <p>Գին: {product.Product.price}</p>
          <p>քանակ: {product.quantity}</p>
        </div>
      </li>
    ))}
    <p className='total-price'>
        Ընդհանուր գին:<b> {cartProducts.reduce((total, product) => total + calculateTotalPrice(product), 0)}</b>
      </p>
  </ul>
      
      <div className="create-order-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <p>* լրացրեք համապատասխան դաշտերը և սեղմեք հաստատել</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className={errors.address && 'input-error'}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Postal Code"
            className={errors.postalCode && 'input-error'}
          />
          {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={paymentCardNumber}
            onChange={(e) => setPaymentCardNumber(e.target.value)}
            placeholder="Payment Card Number"
            className={errors.paymentCardNumber && 'input-error'}
          />
          {errors.paymentCardNumber && <span className="error-message">{errors.paymentCardNumber}</span>}
        </div>
        <button className="create-order-button" type="submit">
          Հաստատել
        </button>
        {orderStatus === 'success' && <div className="success-message">Շնորհակալություն, ձեր պատվերը մշակման փուլում է!</div>}
        {orderStatus === 'error' && <div className="error-message">Failed to create the order.</div>}
      </form>
      </div>
    </div>
   
      // </>
    
  );
};

export default CreateOrder;