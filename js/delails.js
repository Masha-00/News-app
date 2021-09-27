//get arr from local storage
const dataFromStorage = localStorage.getItem("arr");
const arr = JSON.parse(dataFromStorage);
//returns the href of the current page
const postId = new URL(window.location.href).searchParams.get("post");
//find one new
const post = arr.find((post) => post.id === postId);
// get selector container 
let mainSection = document.querySelector('.main-section');
//draw content
function drawDetails(item) {
    //format date
    let date = new Date(item.webPublicationDate);
    let day = date.getDate().toString();
    let month = date.toLocaleDateString('en-US', { month: 'long' });
    let year = date.getFullYear();
    // draw layout
    const newItemDate = `${month} ${day} ${year}`;
    const author = `Writen by ${post.fields.byline}`;
    const newItem = `
    <div class="open-new">
        <img src="${post.fields.thumbnail}" alt="open new">
    </div>
    <div class="detail-content">
        <h1 class="open-title">${post.webTitle}</h1>
        <span class="open-author">${author}<span>
        <span class="open-data">${newItemDate}</span>
        <hr class="detail-hr">
    </div>
    `;
    const newFragment = document.createRange().createContextualFragment(newItem);
    mainSection.appendChild(newFragment);
}
drawDetails(post);