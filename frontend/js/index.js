//section de mes divs
document.getElementById("produit");
let cameras = document.getElementsByClassName("cameras");

//requête
fetch('http://localhost:3000/api/cameras') 
  .then(function(response){
    return response.json()
  }).then (function (data) {
  console.log(data)
  for(let i = 0; i <data.length; i++){
    cameras[i].innerHTML = `
    <img class=images + src="${data[i].imageUrl}" alt="caméras"/>
    <figcaption id="text_produit">
      <h2>${data[i].name}</h2>
      <p class="description"> Description: ${data[i].description}</p>
      <p id="price"> Prix: ${data[i].price/100}€</p>
      <button><a  class="liens" href="produit.html?id=${data[i]._id}" >Aperçu</a></button>
    </figcaption>`
    cameras[i].setAttribute("data-id", data[i]._id) 
    
  }        
}) 
.catch(function(err) {
  console.log('Fetch Error ', error);
});
