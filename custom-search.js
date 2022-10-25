//Custom search on static website

let searchBar = document.querySelector('input[name="searchBar"]');
let btn = document.querySelector('input[name="search-btn"]');
let clearBtn = document.querySelector('input[name="clear-btn"]');
let result = document.querySelector('.search-result');

let articleList = JSON.parse(require('./article-list.json'));
console.log(articleList);

searchBar.addEventListener('input', searcher);
clearBtn.addEventListener('click', () => { searchBar.value = '' });
btn.addEventListener('click', searcher);

async function searcher() {
    query = searchBar.value.toLowerCase()
    for (let i = 1; i < 2; i++) {
        let url = 'https://yawgoo87.github.io/custom-static-search/articles/'+i
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


// async function pageRequest(url){
//     const response = await fetch(url)
//         .then((res) => res.text())
//         .then((html) => {
//             var parser = new DOMParser();
// 	        var doc = parser.parseFromString(html, 'text/html');
//         })
//         .then((doc) => { return doc })
//         .catch((err) => console.log(err));
//     return response;
// }
