

window.addEventListener('DOMContentLoaded', function() {
    
    const submitBook = document.getElementById('inputBook');
    

    submitBook.addEventListener('submit' , function(event){
        registerBook();
        event.preventDefault();
    });


    if(checkStorage()){
        loadBookData();
        console.log("Storage web exist");
    }
});

document.addEventListener("ondataloaded", () => {
    renderBookFromStorage();
});