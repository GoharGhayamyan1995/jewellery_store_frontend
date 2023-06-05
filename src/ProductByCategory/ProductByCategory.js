import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';

function ProductList() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory(categoryId);
  }, [categoryId]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:3002/product/category/${categoryId}`);
      if (response.ok) {
        const responseData = await response.json();
        const productsData = responseData.rows; // Используйте свойство "rows" для получения массива продуктов
        setProducts(productsData);
      } else {
        console.error('Failed to fetch products for category');
      }
    } catch (error) {
      console.error(error);
    }
  };

 
    return (
        <div>
          {products.map((product) => (
            <div key={product.id}>
                <Link  to={`/product/${product.id}`}>
                 <img src={`http://localhost:3002/${product?.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p> AMD {product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      );
    }
 

export default ProductList;