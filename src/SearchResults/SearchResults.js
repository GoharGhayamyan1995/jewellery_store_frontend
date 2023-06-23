import React from 'react';
import '../SearchResults/SearchResults.css';
import { Link } from 'react-router-dom';
import noresult from './images/noresult.jpg'

function SearchResults({ searchResults }) {
  return (
    <div className="search-results-container">
      {searchResults.length === 0 ? (
<img src={noresult} alt='' /> 
 ) : (
        searchResults.map((product) => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <img src={`http://localhost:3002/${product?.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
export default SearchResults;