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
    for (let i = 1; i < 2; i++) {
        fetch('https://yawgoo87.github.io/custom-static-search/articles/'+i)
            .then((res) => console.log(res));
    }
    
}

function createResultElement(){

}