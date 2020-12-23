//Je récupére les élèments 
let basket = document.getElementById("camerasCard");
let totalP = document.getElementById("total_p");
let mainBasket = document.getElementById("main_basket")

//===================================================================
//Création de la variable
let totalBasketProduct = 0 ;
//======================================================================

//récupération des données stocker dans le localStorage
let cameraBasket = Object.keys(localStorage) 
//console.log(cameraBasket)
//========================================================

//création d'une condition pour si le panier est vide
if (cameraBasket.length == 0) {
    //===============
    let basketEmpty = document.createElement("p");
    mainBasket.appendChild(basketEmpty);
    basketEmpty.className = "basket_empty"
    basketEmpty.innerHTML =`Votre panier est vide. <i class="far fa-frown"></i>`
}else{
  function recuperationBasket() {
    //création d'une boucle pour récupérer les éléments du panier
		for(let element of cameraBasket){
      console.log(element)

      //======================================================================
			let cameraStorage = JSON.parse(localStorage.getItem(element))
      console.log(cameraStorage)
      
      //=========================================================
      const imgBasket = document.createElement('img');
      basket.appendChild(imgBasket);
      imgBasket.src = cameraStorage.imageUrl;
      imgBasket.setAttribute('alt', 'appareil photo');
      imgBasket.className = 'imgBasket';
      console.log(imgBasket)

      //=========================================================
      const h2Basket = document.createElement("h2");
      basket.appendChild(h2Basket);
      h2Basket.textContent = cameraStorage.name;
      h2Basket.className = "h2Basket";
      console.log(h2Basket);
      //============================================================
      const objectifBasket = document.createElement("p");
      basket.appendChild(objectifBasket);
      objectifBasket.innerHTML = `Objectif : ${cameraStorage.select}`;
      objectifBasket.className = "objectifBasket";
      console.log(objectifBasket)
      //==============================================================
      const qtyBasket = document.createElement("p");
      basket.appendChild(qtyBasket);
      qtyBasket.innerHTML = `Quantité : ${cameraStorage.qty}`
      qtyBasket.className = "qtyBasket";
      console.log(qtyBasket)
      //==============================================================
      const priceProductBasket = document.createElement("p");
      basket.appendChild(priceProductBasket);
      priceProductBasket.innerHTML = `Prix : ${cameraStorage.price * cameraStorage.qty} €`;
    	console.log(priceProductBasket.innerHTML)
      priceProductBasket.className = "priceProductBasket";
      console.log(priceProductBasket)

      //============================================================================================
      totalBasketProduct = totalBasketProduct + (cameraStorage.price * cameraStorage.qty );
      console.log(totalBasketProduct)
    }
  }
  recuperationBasket(cameraBasket) 
}

//FIN DE LA FONCTION
//==========================================================
//bouton supprimer les articles
document.getElementById('remove_basket').addEventListener('click', () => {
  localStorage.clear(); //efface
  location.reload(); //recharge la page
})

//==========================================================================     
//afficher le prix total
let totalPriceBasket = document.createElement("p");
totalPriceBasket.className = 'totalPriceBasket';
totalPriceBasket.innerHTML = `Prix total de votre panier : ${totalBasketProduct} €`;
totalP.appendChild(totalPriceBasket)
//console.log(totalPriceBasket)

//======================================================================================   
//Bouton envoi
btn_send = `<button><a class='lien' href="confirmation.html"></a></button>`;
console.log(btn_send)

//=========================================================================================
//récupération de l'id produit
let productsId = [];
console.log(productsId)
function recupId() {
  for(let element of cameraBasket){
    console.log(element)
    let cameraStorage = JSON.parse(localStorage.getItem(element))
    console.log(cameraStorage)
    productsId.push(cameraStorage.id)
  }
}
recupId(cameraBasket)
console.log(cameraBasket)

//========================================================



let reponseLastName = document.getElementById('reponseLastName')

let mailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/
let NameReg = /^[a-zA-z ]{2,}$/
let addressReg = /^[0-9]{1,3}([a-zA-Z ]+)$/
let cityReg = /^[a-zA-z ]{2,}$/

let reponseAddress = document.getElementById('reponseAddress')
let reponseCity = document.getElementById('reponseCity')
let reponseMail = document.getElementById('reponseMail')

function lastNameTest(value) {
  return /^[a-zA-z ]{2,}$/.test(value)
}

lastName.addEventListener('change', function (e) {

  if(!lastNameTest(lastName.value)){
    reponseLastName.textContent = 'le champs nom comporte des erreurs'
    e.preventDefault()
    return false
  } else {
    console.log('true')
  }
})

function firstNameTest(value) {
  return /^[a-zA-z ]{2,}$/.test(value)
}
firstName.addEventListener('change', function (e) {
//function firstName (e){
  if(!firstNameTest(firstName.value)){
  reponseFirstName.textContent = 'le champs prénom comporte des erreurs'
  e.preventDefault()
  return false
  }else{
  console.log('true')
  }
})

function addressTest(value) {
  return /^[0-9]{1,3}([a-zA-Z ]+)$/.test(value)
}
address.addEventListener('change', function (e) {

  if(!addressTest(address.value)){
  reponseAddress.textContent = 'le champs adresse comporte des erreurs'
  e.preventDefault()
  return false
  }else{
  console.log('true')
  }
})

function cityTest(value) {
  return /^[a-zA-z ]{2,}$/.test(value)
}
city.addEventListener('change', function (e) {

  if(!cityTest(city.value)){
  reponseCity.textContent = 'le champs city comporte des erreurs'
  e.preventDefault()
  return false
  }else{
  console.log('true')
  }
})

function mailTest(value) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(value)
}
email.addEventListener('change', function (e) {
//function email (e){
  if(!mailTest(email.value)){
  reponseMail.textContent = 'le champs email comporte des erreurs'
  e.preventDefault()
  return false
  }else{
  console.log('true')
  }
})



//=========================================================================================
let form = document.getElementById('form');
form.addEventListener('submit',(e) =>{
  
  if (lastNameTest(lastName.value) && firstNameTest(firstName.value) && addressTest(address.value) && cityTest(city.value) && mailTest(email.value) ){
     
  }else {
    e.preventDefault()
    return false
  }

  //=========================================
  let  contact =  {
    firstName : firstName.value,
    lastName : lastName.value,
   address : address.value,
    city : city.value,
   email : email.value,
  }
  console.log(contact)

  
  e.preventDefault();
  //================================================
  products = productsId
  let send = {
    contact,
    products,
  }
  console.log(send)
  //==========================================================
  //j'envoi les donnée avec post
  fetch('http://localhost:3000/api/cameras/order',{
    method: 'POST',
    headers : {
      'content-type': 'application/json'
    },
    body : JSON.stringify(send)
  })  
  //==============================================================
  
  .then(response => response.json())   
  .then(response => {
		localStorage.clear();
    let envoiCommande = {  
    	orderId : response.orderId ,
      totalPriceBasket : totalBasketProduct,
      nameConfirmation : firstName.value,    
    }    
    let commande = JSON.stringify(envoiCommande);
    localStorage.setItem('commande', commande); 
    window.location = 'confirmation.html'
  })


}) 

//======================
console.log(form)