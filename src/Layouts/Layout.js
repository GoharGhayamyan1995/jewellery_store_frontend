import React, { useState } from 'react';
import Header from './Header/Header';
import SearchResults from '../SearchResults/SearchResults';
import { Outlet, Route, Routes } from 'react-router-dom';

function Layout() {
  const [searchResults, setSearchResults] = useState([]);
 

  return (
  
      <div>
        <Header searchResults={searchResults} setSearchResults={setSearchResults}  />
        <Routes>
        <Route path="/search" element={<SearchResults searchResults={searchResults} />} />
        </Routes>
        <Outlet/>
      </div>
 
  );
}
export default Layout;