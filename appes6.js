class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    // add book to list
    addBookToList(book){
        const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class="delete"> X </a></td>
    `;

    list.appendChild(row);
    }


    // show alert
    showAlert(msg, className){
        const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(msg))

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert div before the form element in container class
    container.insertBefore(div,form);

    // timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
    }


    // delete book
    deleteBook(target){
        if(target.className = 'delete'){
            target.parentElement.parentElement.remove();
        }
    }


    // clear fields
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local storage class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){    
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        const ui = new UI();
        books.forEach(function(book){
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }


}
// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener to add book
document.getElementById('book-form').addEventListener('submit',function(e){

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    // validate
    if(title === '' || author === '' || isbn === ''){
        // error alert
        ui.showAlert('Please fill in all fields', 'error');
    }
    else{
        
    ui.addBookToList(book);

    // add to local storage
        Store.addBook(book);

    ui.clearFields();
    // success
    ui.showAlert('Book Added','success');
    }

    e.preventDefault();
})

// Event listener to delete book
document.getElementById('book-list').addEventListener('click',function(e){

    const ui = new UI();
    ui.deleteBook(e.target);

    // remove from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show alert
    ui.showAlert('Book removed!','success');

    e.preventDefault();
})