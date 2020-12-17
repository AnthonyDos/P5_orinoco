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
//validation du formulaire
let form = document.getElementById('form');
form.addEventListener('submit',(e) =>{
  
  e.preventDefault();
  //======================================================

  //j'initialise l'objet
  class Client {
    constructor(lastName, firstName, address, city, email){
      this.lastName = lastName,
      this.firstName = firstName,
      this.address = address,
      this.city = city,
      this.email = email
    }  
  } 

  //===========================================
  //Je crée une instance
  let newClient =  new Client(
    document.querySelector("#lastName").value,     
    document.querySelector("#firstName").value,
    document.querySelector("#address").value,
    document.querySelector("#city").value,
    document.querySelector("#email").value,
  );

  //=========================================
  let  contact =  {
    firstName : newClient.firstName,
    lastName : newClient.lastName,
    address : newClient.address,
    city : newClient.city,
    email : newClient.email,
  }
  
  //================================================
  products = productsId;
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
  });         
})    

//======================
console.log(form) 
