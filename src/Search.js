import React from 'react';
import Book from './Book';
import {Link} from 'react-router-dom';

function Search(props){
  const {updateBook, searchBooks, searchBooksList, emptySearchBooks} = props;

return(
    
    <div className="search-books">
    <div className="search-books-bar">
      <Link to="/"><button onClick={() => emptySearchBooks()} className="close-search" >Close</button></Link>
      <div className="search-books-input-wrapper">
        <input onChange={(event) => searchBooks(event.target.value)} type="text" placeholder="Search by title or author"/>
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
          {searchBooksList.length !==0 && (searchBooksList.map(searchBook => (
            <li key={searchBook.id}><Book book={searchBook} updateBook={updateBook}/> </li>
          )))}
      </ol>
    </div>
  </div>

)}

export default Search;