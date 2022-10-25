//Custom search on static website

let searchBar = document.querySelector('input[name="searchBar"]');
let btn = document.querySelector('input[name="search-btn"]');
let clearBtn = document.querySelector('input[name="clear-btn"]');
let result = document.querySelector('.search-result');

searchBar.addEventListener('input', searcher);
clearBtn.addEventListener('click', () => { searchBar.value = '' });
btn.addEventListener('click', searcher);

function searcher() {
    query = searchBar.value.toLowerCase()
    for (let i = 0; i < array.length; i++) {
        
    }
    fetch
}

function createResultElement(){

}