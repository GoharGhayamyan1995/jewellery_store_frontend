import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../ProductByCategory/ProductByCategory.css'
function ProductList() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProductsByCategory(categoryId, currentPage);
  }, [categoryId, currentPage]);

  const fetchProductsByCategory = async (categoryId, page) => {
    try {
      const response = await fetch(`http://localhost:3002/product/category/${categoryId}?page=${page}`);
      if (response.ok) {
        const responseData = await response.json();
        const productsData = responseData.products;
        const totalPagesData = responseData.totalPages;
        setProducts(productsData);
        setTotalPages(totalPagesData);
      } else {
        console.error('Failed to fetch products for category');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePageClick(i)}>
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='productsbycategory'>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <img src={`http://localhost:3002/${product?.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>AMD {product.price}</p>
          </Link>
        </div>
      ))}
      <div className='page'>
        {currentPage > 1 && (
          <button className='btn' onClick={handlePreviousPage}>Previous</button>
        )}
        {renderPageButtons()}
        {currentPage < totalPages && (
          <button className='btn' onClick={handleNextPage}>Next</button>
        )}
      </div>
    </div>
  );
}

export default ProductList;