
let APIURL = "http://localhost:8080/api/user/"

// action when document is ready  see at the end of script
ready(event => {
  dataStorage()
  document.getElementById('nolink').onclick = function(e){
    e.preventDefault()
    console.log('nolink')
    getNew()   
  }
})

function getNew(){
  getUser()  
}
function getUser() {
  fetch(APIURL +'1')
  .then( response => {
    console.log(response) 
      
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then( data => {
      console.log(data.content)      
      document.getElementById('master').innerHTML = data.content
  })
  .catch(error => console.log(error))
}
// called by click on button Add article
function addArticle() {
  console.log('callserver')
  const article= {
    title: "post 34", 
    content: "QDefsf boubtrooi sd freolki dortavdsnd wxcn wkxcl mdgmoern! mgdfogpa" 
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article)
  }
  
  fetch(APIURL + 'article', requestOptions)      
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then( data => {
        //console.log(data[0].insertId)
        article.id = data[0].insertId
        console.log(article)
    })
    .catch(error => console.log('Error' + error))
  
}

// equivalent à  $(document).ready(function(){})
function ready(callbackFunction){
  if(document.readyState != 'loading')
    callbackFunction()
  else 
    document.addEventListener("DOMContentLoaded", callbackFunction)  
}

// on document.ready test
function dataStorage(){

  // "teddies" "furniture" "cameras"
   if(!localStorage.getItem("isLogged")){
     localStorage.setItem("isLogged", false);
     console.log("localStorage isLogged created");
   };
   if(!localStorage.getItem("rememberMe")){
     localStorage.setItem("rememberMe", false); 
     console.log("localStorage rememberMe created");
   };
 }