//Custom search on static website

let searchBar = document.querySelector('input[name="searchBar"]');
let btn = document.querySelector('input[name="search-btn"]');
let clearBtn = document.querySelector('input[name="clear-btn"]');
let result = document.querySelector('.search-result');


searchBar.addEventListener('input', searcher);
clearBtn.addEventListener('click', () => { searchBar.value = '' });
btn.addEventListener('click', searcher);



async function searcher() {
    query = searchBar.value.toLowerCase()

    let articleArray = await getJsonData();
    console.log(articleArray);

    for (let i = 1; i < 2; i++) {
        let url = 'https://yawgoo87.github.io/custom-static-search/articles/'+i;
        let b;
        let text

        let result = await pageRequest(url);
        let pArray = result.querySelectorAll('p')
        console.log(pArray);

    }  
}

async function pageRequest(url){
    let parser = new DOMParser();
    const response = await fetch(url);
    const textResult = await response.text();
    const doc = parser.parseFromString(textResult, 'text/html');
    return doc;
}

async function getJsonData(){
    let jsonUrl = 'https://yawgoo87.github.io/custom-static-search/article-list.json';
    const response = await fetch(jsonUrl);
    const json = response.json();
    return json;
}
