
const toggleSpinner = displayshow =>  document.getElementById('spinners').style.display = displayshow;
const toggleSearchResult = displayshow =>  document.getElementById('card').style.display = displayshow;
document.getElementById('error-message').style.display = 'none';

const searchButton = () =>{
    const searchText = document.getElementById('input-value').value;
    document.getElementById('input-value').value ='';
    // toggleSearchResult('none');
    toggleSpinner('none');
    
        // Handle empty search request
    if (searchText === '') {
        // please write something to display
        displayError();
    }
    else {
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('card').textContent ='';
        //show spinner
         toggleSpinner('block'); 
         document.getElementById('team-numbers').style.display = 'none';
          const url =`http://openlibrary.org/search.json?q=${searchText}`;
           fetch(url)
          .then(res => res.json())
          .then(data => loadBook(data.docs))
    }
}
//display error 
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('team-numbers').textContent = '';
}
//load all book
const loadBook = books =>{
    document.getElementById('team-numbers').textContent = '';
    const cardContainer = document.getElementById('card')
    // clear all-card and replace new card
    cardContainer.textContent='';
    const bookList = books;

    if(bookList === 'null'){
      displayError()
    }
    else{
      document.getElementById('error-message').style.display ='none';
      const bookCount =  document.getElementById('team-numbers').innerText = `books Found ${bookList.length}`;
      document.getElementById('team-numbers').style.display='block';
      toggleSpinner('none');
      /* -----------display all book card -------------*/
         books?.forEach( book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div style="height:600px" class="card  me-4 my-4 shadow-lg">
        <img height='400px'  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"; class="p-4" alt="...">
        <div class="card-body">
          <h3 class="card-title ">${book.title}</h3>
          <h4 class="card-title "><span class='text-primary'>Author Name:</span> ${book.author_name}</h4>
           <h4 class="card-title "><span class='text-warning'>Publisher Name:</span> ${book.publisher.slice(0,3)}</h4>
          <p class='fs-4'><span class="text-success">First Published in:</span> ${book.first_publish_year?book.first_publish_year:''}</p>
        </div>
      </div>
        `;
        cardContainer.appendChild(div);
    })
  }
}
