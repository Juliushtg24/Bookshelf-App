const BOOK_STORAGE_KEY = "BOOK_SHELF";

let books = [];

function checkStorage(){ 
    if(typeof(Storage) === "undefined"){ 
        console.log("Browser is not supported");
        return false;
    } else { 
        return true;
    }
}


function bookObject(title , author , year , isComplete){
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
    };
}


function saveBookData(){ 
    const parsed = JSON.stringify(books);
    localStorage.setItem(BOOK_STORAGE_KEY, parsed);
}

function loadBookData(){ 
    const bookData = localStorage.getItem(BOOK_STORAGE_KEY);

    let data = JSON.parse(bookData); 

    if(data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}


function updateBookFromStorage(){ 
    if(checkStorage()){
        saveBookData();
    }
}


function findBook(bookID){
    for(let book of books){
        if(book.id === bookID)
            return book;
    }
    return null;
}


function findBookByIndex(bookID){ 
    let index = 0;
    for(let book of books){
        if(book.id === bookID)
            return index;
        index++;
    }
}