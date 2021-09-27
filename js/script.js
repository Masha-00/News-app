// Preloader
window.addEventListener('load', function(){
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});

let content = document.querySelector('.content');
let lastNew;

// draw news
function drawItem(item){
    // get format date
    let date = new Date(item.webPublicationDate);
    let day = date.getDate().toString();
    let month = date.toLocaleDateString('en-US', {month: 'long'});
    let year = date.getFullYear();
    const newsItemDate = `${month} ${day}th ${year}`;
    // draw card and insert text
    const newsItem = `
    <div class="card">
        <div class="new-img">
            <a href="details.html?post=${item.id}">
                <img src="${item.fields.thumbnail}" alt="news foto">
            </a>
        </div>
        <div class="new-info">                                      
            <a class="new-title" href="details.html?post=${item.id}">${item.webTitle}</a>
            <p class="new-text">${item.fields.bodyText}</p>
            <div class="more">
                <span class="date">${newsItemDate}</span>
                <a href="details.html?post=${item.id}" class="details">Read more</a>
            </div>
        </div>
    </div>
    `;
    const newsFragment = document.createRange().createContextualFragment(newsItem);
    content.appendChild(newsFragment);
}
// save data to local storage
function saveToLocalStorage(arr){
    localStorage.setItem("arr", JSON.stringify(arr));
}

//API
// returns the href of the current page from index
const category = new URL(window.location.href).searchParams.get('category');
// default category = "trending"
async function getResponse(category = "trending"){
    return await fetch(`https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`);
}
async function start(){
    let response = await getResponse(category);
    let data = await response.json();
    //get array
    let arr = data.response.results;
    lastNew = arr;
    //sort by publication date
    arr.sort((a, b) => {
        let c = new Date(a.webPublicationDate);
        let d = new Date(b.webPublicationDate);
        return d - c;
    });
    //save to local storage
    saveToLocalStorage(arr);
    //clear content
    content.replaceChildren();
    //draw news from arr
    arr.forEach(drawItem);
    //add class main-new to main new
    document.querySelector(".card").classList.add('main-new');
}
start();

// Search
let inputSearch = document.querySelector('.input-search[type="text"]');
inputSearch.addEventListener('keypress', function(event){
    if(event.which === 13){
        event.preventDefault();
        search(event.target.value);
    }
});
function search(item){
    let findValue = lastNew.filter((value) => value.webTitle.includes(item));
    if(findValue){
        content.replaceChildren();
        findValue.forEach((card)  => drawItem(card));
    }
    let card = document.querySelector('.card');
    card.classList.add('main-new');
}
