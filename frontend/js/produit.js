let camera2 = document.getElementById('#cameras')

//récupération de l'id du produit
function getId(){
	const param = window.location.search
	const id = param.replace("?id=","") //récupération de l'id et création d'une constante
	if (!id) throw new Error ('il manque l\'id')
	return id
}

//récupération du produit séléctionner
fetch ("http://localhost:3000/api/cameras/" + getId())
.then(cameras => {
    return cameras.json()
})
.then(function (cameras) {
  console.log(cameras) 
//   function cameras() {

	//création des éléments de la page             
	const cameraDiv = document.createElement('div');
	const cameraTitle = document.createElement('h2');
	const cameraImage = document.createElement('img');
	const cameraId = document.createElement('figcaption');
	const cameraDescription = document.createElement('p');
	const optionForm = document.createElement('form');
	const optionLabel = document.createElement('label');
	const optionSelect = document.createElement('select');
	const optionValeur = [];
	const buttonDiv = document.createElement('div');
	const buttonAdd = document.createElement('div');
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
	cameraDiv.appendChild(optionLabel);
	cameraDiv.appendChild(optionSelect);
	cameraDiv.appendChild(cameraQuantity);
	cameraQuantity.appendChild(cameraQuantityText);
	cameraQuantity.appendChild(cameraQuantityInput);
	cameraDiv.appendChild(priceDiv);
	priceDiv.appendChild(price);
	divButton.appendChild(buttonDiv);
	buttonDiv.appendChild(buttonReturn);
	buttonDiv.appendChild(buttonAdd);
	cameraDiv.appendChild(divButton);
				
	//j'insers les données
	cameraTitle.textContent = cameras.name; 
	cameraImage.src = cameras.imageUrl;
	cameraQuantityText.textContent = 'Quantité';
	cameraDescription.textContent = cameras.description;
	optionLabel.textContent = 'Choix' + ' ';
	price.textContent = 'Prix:'+ ' '+cameras.price / 100 + '€';
	buttonReturn.innerHTML =`<button><a  class="liens" href="index.html" >Retour</a></button>` 
	buttonAdd.innerHTML =`<button><a  class="liens" href="panier.html" >Ajouter</a></button>`
		
	//attributs
	cameraImage.setAttribute('alt', 'appareil photo');
	cameraQuantityInput.setAttribute('type','number');
	cameraQuantityInput.setAttribute('value',1);
	cameraQuantityInput.setAttribute('min',1);
	buttonAdd.setAttribute('value', 'add');
	
	//noms de class
	cameraDiv.className ='bloc_camera';
	cameraTitle.className = 'bloc_camera_title'
	cameraImage.className = 'camera_photo';
	cameraDescription.className ='bloc_camera_description'
	cameraQuantity.className = 'quantity';
	cameraQuantityInput.className = 'quantity_input';
	price.className = 'price';
	buttonDiv.className = 'button';
	buttonAdd.className = 'button_add';
	
	//récupérer les données du tableau lenses
	for (let i = 0; i  <cameras.lenses.length; i = i + 1) {
		console.log(cameras.lenses[i])

		//envoi des données dans option 
		optionValeur.push(document.createElement('option'))

		//création du noeud optionValeur à optionSelect
		optionSelect.appendChild(optionValeur[i])

		//récupération des données et insertion
		optionValeur[i].innerHTML = cameras.lenses[i];
		console.log(cameras.lenses)	
		
		//j'attibue les données valeur = donnée récupéré dans la boucle au dessus
		optionSelect.setAttribute('value',cameras.lenses[i])
		optionSelect[i].id = ('value', cameras.lenses.value) 
		
		//ajout au panier
		buttonAdd.onclick =
			function  (){
				//j'impose une condition de sélectionner une quantité
				if( cameraQuantityInput.value == 0 ){
					alert('Veuillez sélectionner une quantité');
				}else{
				//si la condition est respectée 
				price.textContent = ((cameras.price / 100) * (+cameraQuantityInput.value)) + '€'
				let camerasOption = {
					id : cameras._id,
					name : cameras.name,
					price : cameras.price/100,
					description : cameras.description,
					image : cameras.imageUrl,
					optionSelect: cameras.lenses,	
				}
				//affiche dans le local storage
				let objectifOption = JSON.stringify(camerasOption);
				localStorage.setItem(cameras._id, objectifOption);
				const lenses = document.getElementsByTagName('select')
		
				//let buttonAdd = JSON.parse(localStorage.getItem('cameras'))
				//alert("ajouté au panier")
				alert (cameraQuantityInput.value + " " + cameras.name + ' ' + optionSelect.value + ' ajouté au panier')
			}	
		}
	}		
}).catch(error => console.log(error))
