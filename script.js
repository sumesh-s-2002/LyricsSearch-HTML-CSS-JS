//constant variables
const url = "https://api.lyrics.ovh",
form = document.querySelector(".form"),
input = document.querySelector(".input"),
getLyricsbtn = document.querySelector(".get-lyrics"),
next = document.querySelector(".next"),
previous = document.querySelector(".previous"),
search = document.querySelector(".search"),
itemContainer = document.querySelector(".item-container"),
btnContainer = document.querySelector(".next-previous-container");
let datal;
search.addEventListener("click", getText);
itemContainer.addEventListener("click", getLyrics)
//getText function
function getText(e){
    let text = input.value.trim();
    if(text != ""){
        getLyrics(text,function(data){
            updateDOM(data);
        })
    }else{
        alert("error")
    }
    e.preventDefault()
}
//getLyrics from API
function getLyrics(text,resolve){
    fetch(`https://api.lyrics.ovh/suggest/${text}`)
    .then(res => res.json())
    .then(data => {
        resolve(data);
    });
}
//define updateDOM
function updateDOM(data){
    console.log(data)
    data.data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item")
        div.innerHTML = `
            <p><span class = "artist">${item.artist.name} </span>${item.album.title}</p>
            <button data-artist = ${item.artist.name} data-album=${item.album.title} class="btn get-lyrics">
            Get Lyrics
            </button>
         `
        itemContainer.appendChild(div);
    })
    if(data.next || data.prev){
        btnContainer.innerHTML = 
        `
        ${data.next ?`<button class = "btn next" onclick = "getMore('${data.next}')">next</button>` : ""}
        ${data.prev ?`<button class = "btn next" onclick = "getMore('${data.prev}')">next</button>`  : ""}
        `
    }
}
//defining getmore
async function getMore(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    updateDOM(data);
}