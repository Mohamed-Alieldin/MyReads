import React from 'react';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

function AllBooksList(props){

  const{books, updateBook} = props;
  const currentlyReadingBooks = books.filter(book => book.shelf ==='currentlyReading')
  const wantToReadBooks = books.filter(book => book.shelf ==='wantToRead')
  const readBooks = books.filter(book => book.shelf ==='read')



return(
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf title="Currently Reading" books={currentlyReadingBooks} updateBook={updateBook}/>
        <BookShelf title="Want to Read" books={wantToReadBooks} updateBook={updateBook}/>
        <BookShelf title="Read" books={readBooks} updateBook={updateBook}/>
      </div>
    </div>
    <div className="open-search">
      <Link to="/search"><button>Add a book</button></Link>
    </div>
  </div>

)}

export default AllBooksList;