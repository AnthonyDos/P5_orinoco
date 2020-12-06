//section divs , je récupére la div pour incorporer mes éléments de la caméra
let container = document.getElementById("produit");


//requête fetch
fetch('http://localhost:3000/api/cameras') 
  .then(function(response){                   //je récupére les données de l'api
    return response.json()
  }).then (function (data) {
  //console.log(data)
  for(let i = 0; i <data.length; i++){         // je fais une boucle pour récupéré toutes les caméras du tableau
    const cameras = document.createElement('div');
    container.appendChild(cameras);
    cameras.className = ('cameras')

    function afficherLesImages(camerasInfo){
      const imagesCam = document.createElement('img');
      cameras.appendChild(imagesCam);
      imagesCam.src = `${camerasInfo[i].imageUrl} `;
      imagesCam.className = 'images';
      imagesCam.setAttribute = alt='caméras'
      console.log(imagesCam)
    }
    afficherLesImages(data)

    const textProducts = document.createElement('div');
    cameras.appendChild(textProducts);
    textProducts.className = 'text_produit';

    function afficherLesNoms(camerasInfo){
      const name = document.createElement('h2');
      textProducts.appendChild(name);
      name.textContent = camerasInfo[i].name;
    }
    afficherLesNoms(data)

    function descriptionCameras(camerasInfo){
      const infoCamera = document.createElement('p');
      textProducts.appendChild(infoCamera);
      infoCamera.textContent = camerasInfo[i].description;
      infoCamera.className = 'description'
    }
    descriptionCameras(data);

    function priceCamera(camerasInfo){
      const price = document.createElement('p');
      textProducts.appendChild(price);
      price.textContent = `${camerasInfo[i].price/100} €`;
      price.className = 'price';  
    }
    priceCamera(data);

    function buttonId (camerasInfo){
      const buttonInfo = document.createElement('button');
      textProducts.appendChild(buttonInfo);
      buttonInfo.className = "button";
      buttonInfo.innerHTML = `<a  class="liens" href="produit.html?id=${data[i]._id}" >Aperçu</a>`
    }
    buttonId(data)  
  }       
}) 
.catch(function(error) {
  console.log(error)
});










































