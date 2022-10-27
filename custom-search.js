//Custom search on static website

let searchBar = document.querySelector('input[name="searchBar"]');
let btn = document.querySelector('input[name="search-btn"]');
let clearBtn = document.querySelector('input[name="clear-btn"]');
let result = document.querySelector('.search-result');

searchBar.addEventListener('input', searcher);
clearBtn.addEventListener('click', () => { 
        searchBar.value = '';
        result.innerHTML = 'Введите запрос';
    });
btn.addEventListener('click', searcher);

let searchResultArray = [];

async function searcher() {
    searchResultArray = [];
    result.innerHTML = '';
    query = searchBar.value.toLowerCase()
    let articleArray = await getJsonData();

    for (let i = 0; i < articleArray.length; i++) {
        try {
            let url = 'https://yawgoo87.github.io/custom-static-search/articles/'+articleArray[i].filename;
            let result = await pageRequest(url);
            let pArray = result.querySelectorAll('p');
            let text = '';
            pArray.forEach(element => {
                text = text + ' ' + element.textContent.toLocaleLowerCase();
            });

            let articleMatches = isValidArticle(text, query);
            let snippetText;

            if (articleMatches[1] > 0) {
                snippetText = createSnippet(text, articleMatches[0], searchBar.value);
                const searchResultObject = {
                    link: url,
                    title: result.title,
                    snippet: snippetText,
                    countOfMatches: articleMatches[1]
                } 
                searchResultArray.push(searchResultObject);
                //console.log(searchResultArray);
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    //
    //console.log(searchResultArray.sort((a, b) => a.countOfMatches < b.countOfMatches ? 1 : -1));
    searchResultArray.sort((a, b) => a.countOfMatches < b.countOfMatches ? 1 : -1);
    //console.log(searchResultArray);
    generateDomResult(searchResultArray);
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

function isValidArticle(text, query){
    let result = [];
    let regex = new RegExp(query, 'g');
    let indexOfFirstMatch = text.search(regex)
    let matchArray = text.match(regex);
    let count = matchArray === null ? 0 : matchArray.length;
    //console.log([indexOfFirstMatch, count]);
    result[0] = indexOfFirstMatch;
    result[1] = count;
    return result;
}

function createSnippet(text, targetIndex, query){  
    let slicedText = text.slice(targetIndex-30 < 0 ? 0 : targetIndex-30, targetIndex+50 > text.length ? 0 : targetIndex+50);
    let regex = new RegExp(query, 'g');
    slicedText = slicedText.replace(regex, query.bold());
    return '...' + slicedText.trim() + '...';
}

function generateDomResult(array){
    if (array.length > 0){
        for (let i = 0; i < array.length; i++) {
            let wrapper = document.createElement("div");
            let link = document.createElement("a");
            let snippet = document.createElement("p");
            wrapper.append(link);
            wrapper.append(snippet);
            
            link.textContent = array[i].title;
            link.href = array[i].link;
            snippet.innerHTML = array[i].snippet;

            result.append(wrapper);
        }        
    } else {
        console.log('empty');
        let message = document.createElement("p");
        message.innerHTML = 'Совпадений не найдено';
        result.append(message);
    }

}