console.log('Sanity Check: JS is working!')

$(document).ready(() => {
  $('.get-books').on('click', allBooks)
  $('#add-book').on('click', addBook)
})


/**
 * Gets all books from mutably, updates the DOM
 * with this (adds each book as
 * a node to the ul with class list-group.)
 * @return {Promise} - resolves to undefined
 */
function allBooks() {
  fetch('http://mutably.herokuapp.com/books', { method: 'get' })
    .then(response =>
      response.json()
    ).then((res) => {
      const bookNodes = []
      res.books.forEach((book) => {
        bookNodes.push($(`<li>${book.title} by ${book.author}</li>
          <button class=get-book id=${book._id}>Details</button>
          <button class=delete-book id=D${book._id}>Delete</button>`))
      })
      $('.list-group').empty()
      bookNodes.forEach((node) => {
        $('.list-group').append(node)
      })
      $('.get-book').on('click', getBook)
      $('.delete-book').on('click', deleteBook)
    })
}

/**
 * Gets the details of a book from mutably & updates DOM with this info.
 * @return {Promise} - Resolves to undefined
 */
function getBook() {
  fetch(`http://mutably.herokuapp.com/books/${this.id}`, { method: 'delete' })
    .then(response =>
      response.json()
    ).then((book) => {
      $('.list-group').empty()
      $('.list-group').append($(`<li><h3>Title: ${book.title}</h3></li>
        <li>Author: ${book.author}</li>
        <li>Image: <img src="${book.image}"/></li>
        <li>Release Date: ${book.releaseDate}</li>`))
    })
    .catch(console.error)
}
//
// tomorrow: make some sort of form on page
//   to enter new book information
//   then make edit & save buttons to edit/update the book info.
//   then use a ui library to make it look nice
//   then deploy on Heroku!!
//
function addBook(event) {
  console.log('adding book')
  const title = $('#add-title')[0].value
  const author = $('#add-author')[0].value
  const image = $('#add-image')[0].value
  const releaseDate = $('#add-releaseDate')[0].value

  console.log($('#add-title')[0].value)
  fetch('http://mutably.herokuapp.com/books', { method: 'post',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ title, author, image, releaseDate }) })
    .then(() => {
      window.setTimeout(allBooks, 300)
    })
  // $('.list-group').empty()
  // $('.list-group').append($(`<`))
}

/**
 * Deletes a selected book from mutably and calls allBooks to update the DOM.
 * @return {Promise} - Resolves to undefined
 */
function deleteBook() {
  const id = this.id.slice(1);
  fetch(`http://mutably.herokuapp.com/books/${id}`, { method: 'delete' })
    .then(() =>
      allBooks()
    )
    .catch(console.error)
}
