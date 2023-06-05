import React from 'react';
import '../SearchResults/SearchResults.css'
import { Link } from 'react-router-dom';

function SearchResults({ searchResults }) {
  return (
    <div>
      {searchResults.map((product) => (
        <div key={product.id}>
          <Link  to={`/product/${product.id}`}>
            <img src={`http://localhost:3002/${product?.image}`} alt={product.name} />
          <p>{product.name}</p>
          <p>{product.price}</p>
          </Link>

        </div>
      ))}
    </div>
  );
}

export default SearchResults;