console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $('.get-books').on('click', function() {
    console.log('in click ');
    fetch('http://mutably.herokuapp.com/books', { method: 'get' })
    .then(function(response) {
      return response.json();
    }).then(function(res) {
      const bookNodes = [];
      Object.keys(res.books).forEach((el, ind) => {
        bookNodes.push($(`<li>Title:${res.books[ind].title}, Author:${res.books[ind].author}</li>`));
      });
      bookNodes.forEach((node) => {
        $('.list-group').append(node);
      });
    })
  });
  // code in here

});
