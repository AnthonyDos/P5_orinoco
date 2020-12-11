//section divs , je récupére la div pour incorporer mes éléments de la caméra
let container = document.getElementById("produit");
//=================================================================================
//requête fetch
fetch('http://localhost:3000/api/cameras') 
.then(function(response){                   //je récupére les données de l'api
  return response.json()
})
.then (function (data) {
  for(let element of data)  { 
    console.log(element)     // je fais une boucle pour récupéré toutes les données du tableau
    //============================================================
    const cameras = document.createElement('div');
    container.appendChild(cameras);
    cameras.className = ('cameras')
    //============================================================
    function afficherLesImages(element){
      const imagesCam = document.createElement('img');
      cameras.appendChild(imagesCam);
      imagesCam.src = element.imageUrl;       
      imagesCam.className = 'images';
      imagesCam.setAttribute = alt='caméras'
      console.log(imagesCam)
    }
    afficherLesImages(element)
    //================================================================
    const textProducts = document.createElement('div');
    cameras.appendChild(textProducts);
    textProducts.className = 'text_produit';
    //================================================================
    function afficherLesNoms(element){
      const name = document.createElement('h2');
      textProducts.appendChild(name);
      name.textContent = element.name;
    }
    afficherLesNoms(element)
    //================================================================
    function descriptionCameras(element){
      const infoCamera = document.createElement('p');
      textProducts.appendChild(infoCamera);
      infoCamera.textContent = element.description;
      infoCamera.className = 'description'
    }
    descriptionCameras(element);
    //================================================================
    function priceCamera(element){
      const price = document.createElement('p');
      textProducts.appendChild(price);
      price.textContent = `${element.price/100} €`;
      price.className = 'price';  
    }
    priceCamera(element);
    //================================================================
    function buttonId (){
      const buttonInfo = document.createElement('button');
      textProducts.appendChild(buttonInfo);
      buttonInfo.className = "button";
      buttonInfo.innerHTML = `<a  class="liens" href="produit.html?id=${element._id}" >Aperçu</a>`
    }
    buttonId(element)  
  }       
}) 
.catch(function(error) {
  console.log(error)
});










































