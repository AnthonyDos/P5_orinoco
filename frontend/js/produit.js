let camera2 = document.getElementById('#cameras')

//récupération de l'id du produit
function getId(){
	const param = window.location.search
	const id = param.replace("?id=","") //récupération de l'id et création d'une constante
	return id
}



//récupération du produit séléctionner
fetch ("http://localhost:3000/api/cameras/" + getId())
.then(response => {
    return response.json()
})
.then(function (cameras) {
  console.log(cameras) 
  //function cameras() {

  //création des éléments de la page
                
  const cameraDiv = document.createElement('div');
  const cameraTitle = document.createElement('h2');
  const cameraImage = document.createElement('img');
  const cameraId = document.createElement('figcaption');
  const cameraDescription = document.createElement('p');
	const optionForm = document.createElement('form');
	const optionLabel = document.createElement('label');
  const optionSelect = document.createElement('select');
	const optionValeur = document.createElement('option');
	const optionValeur1 = document.createElement('option');
	const optionValeur2 = document.createElement('option');
  const buttonDiv = document.createElement('div');
	const buttonAdd = document.createElement('button');
	const buttonReturn = document.createElement('div');
  const priceDiv = document.createElement('p');
  const price = document.createElement('p');
	const cameraQuantity = document.createElement('div');
  const cameraQuantityText = document.createElement('p');
	const cameraQuantityInput = document.createElement('input');
	const divButton = document.createElement('div');
    
    
  //création des noeuds
  document.querySelector('#cameras').appendChild(cameraDiv);
  console.log(cameras)
  cameraDiv.appendChild(cameraTitle);
  cameraDiv.appendChild(cameraImage);
  cameraDiv.appendChild(cameraId);
  cameraDiv.appendChild(cameraDescription);
	cameraDiv.appendChild(optionForm);
	optionForm.appendChild(optionLabel);
	optionForm.appendChild(optionSelect);
	optionSelect.appendChild(optionValeur);
	optionSelect.appendChild(optionValeur1);
	optionSelect.appendChild(optionValeur2);
  cameraDiv.appendChild(cameraQuantity);
  cameraQuantity.appendChild(cameraQuantityText);
  cameraQuantity.appendChild(cameraQuantityInput);
  cameraDiv.appendChild(priceDiv);
  priceDiv.appendChild(price);
	divButton.appendChild(buttonDiv);
	buttonDiv.appendChild(buttonReturn);
	buttonDiv.appendChild(buttonAdd);
	cameraDiv.appendChild(divButton);
        
    
  //insertion des données
  cameraTitle.textContent = cameras.name; 
  cameraImage.src = cameras.imageUrl;
  cameraQuantityText.textContent = 'Quantité';
	cameraDescription.textContent = cameras.description;
	optionLabel.textContent = 'Choix' + ' ';
  price.textContent = 'Prix:'+ ' '+cameras.price / 100 + '€';
	buttonAdd.textContent = 'Ajouter'
	buttonReturn.innerHTML =`<button><a  class="liens" href="index.html" >Retour</a></button>` 
	
    
  //attributs
  cameraImage.setAttribute('alt', 'appareil photo');
  cameraQuantityInput.setAttribute('type','number');
  cameraQuantityInput.setAttribute('value',0);
  cameraQuantityInput.setAttribute('min',0);
	buttonAdd.setAttribute('value', 'add');
	
    
	//noms de class
	cameraDiv.className ='bloc_camera';
	cameraTitle.className = 'bloc_camera_title'
	cameraImage.className = 'camera_photo';
	cameraDescription.className ='bloc_camera_description'
  cameraQuantity.className = 'Quantity';
  cameraQuantityInput.className = 'quantity_input';
	price.className = 'price';
  buttonDiv.className = 'button';
  buttonAdd.className = 'button_add';
    
  
    
  //bouton ajout de l'article au panier pas encore fonctionnel
  buttonAdd.addEventListener('click', () =>{addTo});
    
  //récupérer les données du tableau lenses
  for (let i = 0; i  <cameras.lenses.length; i++) {
		console.log(cameras.lenses[i])
      //création du noeud
		optionSelect.appendChild(optionValeur)
  	//récupération des données et insertion
		optionValeur.textContent = cameras.lenses[0];
		optionValeur1.textContent = cameras.lenses[1];
		optionValeur2.textContent = cameras.lenses[2];
		console.log(cameras.lenses)	
  }
})        
   
