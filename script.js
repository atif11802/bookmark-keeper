let modal=document.getElementById("modal");
let modalshow=document.getElementById("show-modal");
let modalclose= document.getElementById("close-modal");

let bookmarkform=document.getElementById("bookmark-form");
let websitename=document.getElementById("website-name");
let websiteurl=document.getElementById("website-url");
let bookmarkscontainer= document.getElementById("bookmarks-container");

let bookmarks= [];

//show modal, focus on input

function showModal(){
    modal.classList.add('show-modal');
    websitename.focus();

}

function removemodal(){
    modal.classList.remove('show-modal');
    
}



//modal event listener
modalshow.addEventListener("click", showModal);
modalclose.addEventListener("click", removemodal);
window.addEventListener("click", (e)=>(e.target=== modal? modal.classList.remove('show-modal'): false));


//validateform
function validate(namevalue,urlvalue){

    const expression= /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex= new RegExp(expression);
    if(!namevalue || !urlvalue){
        alert("please submit values for both fieleds");
        return false;
    }
    if(!urlvalue.match(regex)){
        alert('please provide a valide web address ');
        return false    ;
    }

    return true;
    
    
}
//building bookmarks structures
function buildbookmarks(){

    bookmarkscontainer.textContent=""

    bookmarks.forEach((bookmark)=>{
        const{ name, url}=bookmark;
        //ITEM
        let item=document.createElement('div');
        item.classList.add('item');

        //close icon
        let closeicon= document.createElement('i');
        closeicon.classList.add('fas','fa-times');
        closeicon.setAttribute('title','Delete Bookmark');
        closeicon.setAttribute("onclick", `deletebookmark('${url}')`)
        //
        const linkinfo= document.createElement('div');
        linkinfo.classList.add('name');

        let favicon= document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);

        favicon.setAttribute('alt', 'Favicon');

        let link=document.createElement('a');
        link.setAttribute('href', `${url}/`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkinfo.append(favicon, link);
        item.append(closeicon,linkinfo);

        bookmarkscontainer.appendChild(item);

    });
}

//fetch bookmarks

function fetchbookmarks(){
    //get books if available

    if(localStorage.getItem('bookmarks')){
        bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        bookmarks=[
            {
                name:'heheh',
                url:"https://www.google.com",
            },
            
            localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
        ];
    }
    
  
    buildbookmarks();
}

//delete a bookmark

function deletebookmark(url){
    bookmarks.forEach((bookmark, i)=>{
        if(bookmark.url===url){
            bookmarks.splice(i,1);
        }
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchbookmarks();
}

//handle date from form



function storebookmark(e){
    e.preventDefault();
    const namevalue=websitename.value;
    let urlvalue=websiteurl.value;
    if(!urlvalue.includes('http://','https://')){
        urlvalue= `https://${urlvalue}`;
    }
   
    if(!validate(namevalue,urlvalue)){
        return false;
    }
    

    const bookmark={
        name: namevalue,
        url: urlvalue,
    };

    bookmarks.push(bookmark);
    

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchbookmarks();

    bookmarkform.reset();
    websitename.focus();


}


bookmarkform.addEventListener("submit", storebookmark);

fetchbookmarks();