// let n = 45;
// let n2 = n; 
// let n3 = n+n2;
// console.log(n);
// console.log("n2= "+n2);
// console.log("n3= "+n3);

// let obj = {
//     name: "Bitangimana",
//     last_name: "Uzair",
//     age: 34
// };
// console.log("object name = "+obj.name);
// let obj2 = obj;
// console.log("object2= "+obj2);
// obj.gender = "Male";
// console.log("object= "+obj);
// console.log("object2= "+obj2);

// let list = ["Bonjour"];
// list.push("cava");
// console.log(list);

// let container = document.querySelector(".container");
// newElement = document.createElement("div")
// console.log(newElement)
// console.log(container)
// newElement.textContent = obj.gender
// container.appendChild(newElement)

// validation of fields

// function manageFormFields(inPut){
    
//       if(inPut.value.trim()===''){
//         message = "field is empty"
//       }
//       else{
//         message = "field have data"
//       }
//       return message
// }
// exercices on how to get values in fields
// function submitForm(){
//     try {
//         const form = document.getElementById("form")
//         form.addEventListener("submit",(event)=>{
//             event.preventDefault();
//             const name = document.getElementById("name")
//             const postname = document.getElementById("postname")
//             message=manageFormFields(name)
//             console.log(message)
           
//             message=manageFormFields(postname)
//             console.log(message)
//             console.log("successfully")
//         } )
        
//     } catch (error) {
//         console.log("an exception occured")
        
//     }
// }

// submitForm()

//displaying articles from a json file
async function displayingArticles(){
  const response = await fetch("../files/articles.json");
  let articles = await response.json();
  let ListElement = document.createElement("div");
  for(let i=0; i<articles.length; i++){
    console.log(articles[i])
    let listElement = document.createElement("ul");
    listElement.innerHTML += `<li> <label>Name:</label>${articles[i].name}</li>` +`<li><label>Category:</label>${articles[i].categorie}</li>`+`<li><label>Price:</label>${articles[i].price}</li>`;
    ListElement.appendChild(listElement)
  }
   let articleDisplay = document.querySelector(".articles");
    articleDisplay.appendChild(ListElement);
  // mapping 

  let mapList = articles.map(articles=>articles.name)
  console.log(mapList)
  // sorted by price
  // copy array
  let newList = Array.from(articles)
  let sortedList = newList.sort((a, b)=> b.price-a.price)
  for (let i=0; i<newList.length; i++){
    console.log(sortedList[i].name)
  }
  // filter a table

  let filtedList = articles.filter(articles=>articles.name==="underware")
  console.log(filtedList)
}

// function that help us to do an article research
 function searchArticle(){
      try {
          const searchBtnn = document.getElementById("searchbttn");
          searchBtnn.addEventListener("click", async(event)=>{
              event.preventDefault();
              const articleName = document.querySelector("[name ='search']").value;
              console.log("name equals "+articleName);
              //let articleValue = articleName.value;
              let response = await fetch("../files/articles.json");
              const articles = await response.json();
              let demandedArticles = articles.filter(articles=>articles.name===articleName);
              //get where to display articles 
              let articleDisplay = document.querySelector(".articles");
              articleDisplay.innerHTML = "";
              if(demandedArticles.length === 0){
                console.log("je entre reellement")
                let messageElement = document.createElement("h2");
                messageElement.innerText = "Article not found";
                articleDisplay.appendChild(messageElement);
              }
              else{
                    let articlesDiv = document.createElement("div");
                    for(let i=0; i<demandedArticles.length; i++){
                      console.log(demandedArticles[i])
                      let listElement = document.createElement("ul");
                      listElement.innerHTML += `<li> <label>Name:</label>${demandedArticles[i].name}</li>` +`<li><label>Category:</label>${demandedArticles[i].categorie}</li>`+`<li><label>Price:</label>${demandedArticles[i].price}</li>`;
                      articlesDiv.appendChild(listElement);
                      articleDisplay.appendChild(articlesDiv);
                    }
                    
              }
          } );
          
      } catch (error) {
          console.log("an exception occured")
          
      }
  }

// fetching data from an external api
 function fetchingApiData(){
  // let burundiLat = -3.6156;
  // let burundiLong = 29.9256;
  const appid = "dde0a4dcefbdab3fac4077a9e9c86a05";
  const checkBttn = document.getElementById("validateBttn");
  let displaySpace = document.querySelector(".weather-data");
  displaySpace.innerHTML = "";
  checkBttn.addEventListener("click", async(event)=>{
    console.log("ndinjira")
    event.preventDefault();
    let latitude = document.getElementById("lat").value;
    let longitude = document.getElementById("lon").value;
    console.log(latitude)
    try {
      //this is an API from openweathermap.org 
      // it is a current weather data api
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+appid+'');
      const weatherData = await response.json();
     
      displaySpace.innerHTML = `<label>Name : ${weatherData.name} </label>`+`<br>`+`<label>Weather : ${weatherData.weather[0].main}</label>`+`<br>`+`<label>Description : ${weatherData.weather[0].description}</label>`+`<br>`+`<label>Wind Speed : ${weatherData.wind.speed}</label>`+`<br>`+`<label>Country : ${weatherData.sys.country}</label>`;

      console.log("weatherdescription "+ weatherData.weather[0].description)
      console.log("weather data "+weatherData.name);
      
    } catch (error) {
      console.log(error)
      
    }
    })
  
  
  }
try {
  displayingArticles();
  searchArticle();
  fetchingApiData();
  
} catch (error) {
  console.log(error)
  
}
 
  

