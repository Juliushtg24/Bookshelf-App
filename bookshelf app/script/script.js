
const ONPROGRESS_BOOK_READ = "onProgressBookList";
const COMPLETED_BOOK_READ = "completeBookshelfList";


const BOOK_ID = "bookID";






function registerBook(){
    const bookOnComplete = document.getElementById(COMPLETED_BOOK_READ);
    const bookOnProgress = document.getElementById(ONPROGRESS_BOOK_READ);

    const inputTitle = document.getElementById('inputBookTitle').value;
    const inputAuthor = document.getElementById('inputBookAuthor').value;
    const inputYear = document.getElementById('inputBookYear').value;
    const inputBookStatus = displayRadioValue();

    const book = makeBookItem(inputTitle , inputAuthor , inputYear ,inputBookStatus);
    const bookObjectData = bookObject(inputTitle , inputAuthor , inputYear, inputBookStatus);

    book[BOOK_ID] = bookObjectData.id;
    books.push(bookObjectData);

    if(inputBookStatus){ 
        bookOnComplete.append(book);
    } else { 
        bookOnProgress.append(book);
    }

    updateBookFromStorage();

}

function makeBookItem(title , author , year , status) {
     
    const textTitle = document.createElement("h2");
    textTitle.innerText = title;
 
    const textAuthor = document.createElement("h5");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.innerText = year;
 
    const bookItemContainer = document.createElement("article");
    bookItemContainer.classList.add("book_item");
    bookItemContainer.append(textTitle, textAuthor , textYear);
    
    

    if(status){
        bookItemContainer.append(undoButton(), removeBookButton());
        return bookItemContainer;
    } else {
        bookItemContainer.append(completedButton(), removeBookButton());
        return bookItemContainer;
    } 
    
}


function displayRadioValue() {
    var ele = document.getElementsByName('book_status');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
            if(ele[i].value == "OnProgress"){
                return false;
            }else if(ele[i].value == "Completed"){
                return true;
            }else{
                return -1;
            }
    }
}


function createButton(buttonText, buttonTypeClass , eventListener){ 
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.classList.add(buttonTypeClass);
    
    button.addEventListener('click' , function(event){
        eventListener(event);
    });

    return button;
}


function completedButton(){ 
    return createButton("Complete","complete_button", function(event){
        addBookToCompleted(event.target.parentElement);
   });
}

function removeBookButton(){ 
    return createButton("Remove Book" , "remove_button" , function(event){
        removeBook(event.target.parentElement);
    });
}

function undoButton(){ 
    return createButton("Undo Book" , "undo_button" , function(event){
        undoBookToOnProgress(event.target.parentElement);
    })
}

function addBookToCompleted(taskElement) {
    const textTitle = taskElement.querySelector('.book_item > h2').innerText;
    const textAuthor = taskElement.querySelector('.book_item > h5').innerText;
    const textYear = taskElement.querySelector('.book_item > p').innerText;

    const newBook = makeBookItem(textTitle , textAuthor , textYear , true);


    const book = findBook(taskElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    const bookCompleted = document.getElementById(COMPLETED_BOOK_READ);
    bookCompleted.append(newBook);
    taskElement.remove(); 
    
    updateBookFromStorage();
}

function undoBookToOnProgress(taskElement){ 
    const textTitle = taskElement.querySelector('.book_item > h2').innerText;
    const textAuthor = taskElement.querySelector('.book_item > h5').innerText;
    const textYear = taskElement.querySelector('.book_item > p').innerText;

    const newBook = makeBookItem(textTitle , textAuthor , textYear , false);

    const book = findBook(taskElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    const bookOnProgress = document.getElementById(ONPROGRESS_BOOK_READ);
    bookOnProgress.append(newBook);
    taskElement.remove();

    updateBookFromStorage();
}




function removeBook(taskElement){ 

    const dialog = document.getElementById('myDialog');
    const confirmButton = document.getElementById('confirm');
    const cancelButton = document.getElementById('cancel');

    
    dialog.style.display = "block";
    confirmButton.onclick = function(){
        dialog.style.display = "none";
        const bookRemoveIndex = findBookByIndex(taskElement[BOOK_ID]);
        books.splice(bookRemoveIndex , 1);
        console.log(bookRemoveIndex);
        taskElement.remove();
        updateBookFromStorage();
        okDialog.style.display = "block";
    }

    cancelButton.onclick = function(){
        dialog.style.display = "none";
        return -1;
    }

    window.onclick = function(event) {
        if (event.target == dialog) {
          dialog.style.display = "none";
        }

    }
    
}


function renderBookFromStorage() {
    const bookOnProgress = document.getElementById(ONPROGRESS_BOOK_READ);
    let bookOnComplete = document.getElementById(COMPLETED_BOOK_READ);
  
  
    for(book of books){
        const newBook = makeBookItem(book.title , book.author , book.year , book.isCompleted);
        newBook[BOOK_ID] = book.id;
  
  
        if(book.isCompleted){
            bookOnComplete.append(newBook);
        } else {
            bookOnProgress.append(newBook);
        }
    }
 }


function displayBook(){ 
    const bookItem = document.querySelectorAll('.book_item');
    
    for(let i = 0; i < bookItem.length; i++){ 
        bookItem[i].style.display = "";
    }
}


function searchBook(){ 
    const inputTitleSearch = document.getElementById('searchBookTitle').value;
    const filterSearch = inputTitleSearch.toUpperCase();
    const bookItem = document.querySelectorAll('.book_item');
    let titleBook;

    for (let i = 0; i < bookItem.length; i++) {
        titleBook = bookItem[i].getElementsByTagName("h2")[0];
        txtValue = titleBook.textContent || titleBook.innerText;
        if (txtValue.toUpperCase().indexOf(filterSearch) > -1) {
            bookItem[i].style.display = "";
        } else {
            bookItem[i].style.display = "none";
        }
    }

}




const submitSearchBook = document.getElementById('searchBook');


submitSearchBook.addEventListener('submit' , function(event){
    console.log("search executed");
    searchBook();
    event.preventDefault();
});

submitSearchBook.addEventListener('reset' , function(event){
    displayBook();
    event.preventDefault();
});



