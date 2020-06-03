import React, {Component} from 'react';

class Book extends Component{



  render(){
  const {book, updateBook} = this.props;

return(
  <div className="book">
  <div className="book-top">
    <div className="book-cover" style={book.imageLinks === undefined?
    { width: 128, height: 193 }:
    { width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }
    }></div>
    <div className="book-shelf-changer">
      <select  onChange={(e) => updateBook(book,e.target.value)} value={book.shelf !== undefined? book.shelf:"none"}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading" >Currently Reading</option>
        <option value="wantToRead" >Want to Read</option>
        <option value="read" >Read</option>
        <option value="none" >None</option>
      </select>
    </div>
  </div>
<div className="book-title">{book.title}</div>
{book.authors !== undefined? book.authors.map(author => (<div className="book-authors" key={author}>{author}</div>)):null}
</div>
)}}


export default Book;