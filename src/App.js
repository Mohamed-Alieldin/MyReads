import React, { Component } from 'react'
import './App.css'
import AllBooksList from './AllBooksList';
import Search from './Search';
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI';


class BooksApp extends Component{
  state ={
    books:[],
    searchbooks:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksdata) => 
    {
        this.setState({books:booksdata});
    })
  }
  
  // Empty the SearchBooks state
  emptySearchBooks = () =>{
    this.setState({searchbooks:[]});
  }

    // Update Book Shelf from main page
    updateBookFromMain = (book, shelf) => {
      BooksAPI.update(book, shelf)
      .then((res)=>{
        this.setState((prevState) => {
          let newbooks = [...prevState.books]
          newbooks[newbooks.findIndex(b => (b===book))].shelf = shelf
          return {books: newbooks} 
        })
      })
    } 

    // Update Book Shelf from Search
    updateBookFromSearch = (book, shelf) => {
      BooksAPI.update(book, shelf)
      .then((res)=>{
        this.setState((prevState) => {
          let newbooks = [...prevState.books]
          // add or update shelf property to the book
          let bookInBooks = newbooks.find((b) => b.id === book.id)
          if(bookInBooks === undefined){ // add shelf
            book.shelf = shelf
            newbooks.push(book)
          }
          else{
            if(bookInBooks.shelf !== shelf){ // update shelf
              newbooks[newbooks.findIndex(bo => (bo.id===book.id))].shelf = shelf
            }
          }

          return {books: newbooks} 
        })
      })
    } 

    // Calling Search API
    searchBooks = (query) => {
      query = query.trim()
      if(query === undefined || query === null || query===''){ //handling empty query
        this.setState({searchbooks : []})
      }
      else{
        BooksAPI.search(query)
        .then((searchBooksResult) => {
          if(Array.isArray(searchBooksResult)){ // handling query errors
            // Adding shelf property to the book if it exists in books array
            searchBooksResult.map((searchBook) => {
              let currentBook = this.state.books.find(b => b.id === searchBook.id)
              if (currentBook !== undefined){
                searchBook.shelf = currentBook.shelf
              }
              return null
            })

            this.setState({
              searchbooks : searchBooksResult
            })
          }
          else{ // handling query errors
            this.setState({ 
              searchbooks : [] 
            })
          }               
        })
      }
    }


  render(){
    return(
      <div className="app">        
        <Route path="/search" render={() => (<Search 
        updateBook={this.updateBookFromSearch}
        searchBooks={this.searchBooks} 
        searchBooksList={this.state.searchbooks}
        emptySearchBooks={this.emptySearchBooks}/>)}/>        
        <Route exact path="/" render={()=>(<AllBooksList updateBook={this.updateBookFromMain} books={this.state.books} />)}/>                
      </div>
    )
  }  
}

export default BooksApp
