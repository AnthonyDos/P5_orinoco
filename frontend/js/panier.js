let basket = document.getElementById("camerasCard");
let totalP = document.getElementById("total_p");
let mainBasket = document.getElementById("main_basket")

//push id de la cameras dans le tableau products
let productsId = [];
let totalBasket = 0 ;

// //récupération des données stocker dans le localStorage
let cameraBasket = Object.keys(localStorage) 
if (cameraBasket.length == 0) {
    let basketEmpty = document.createElement("p");
    mainBasket.appendChild(basketEmpty);
    basketEmpty.className = "basket_empty"
    basketEmpty.innerHTML =`Votre panier est vide. <i class="far fa-frown"></i>`
}else{
    for (i=0; i < cameraBasket.length; i++) {
        
        
        let cameraStorage = JSON.parse(localStorage.getItem(cameraBasket[i]))
        let totalPrice = document.createElement("p");      
        ///////////////////////////////////////////
        //création des éléments de la page
        let divContainerPanier = document.createElement("div");
        let divText = document.createElement('div');
        let imgCamera = document.createElement("img");
        let titleCamera = document.createElement('h2');
        let priceProductObjectif = document.createElement('p');
        let priceBasket = document.createElement('p');
        let quantity = document.createElement("p");
        let totalProduct = document.createElement("p");
        let cameraText = document.createElement("div")
        ////////////////////////////////////////
        //création des class
        divContainerPanier.className = "container_basket";
        divText.className = "container_basket_text";
        imgCamera.className = "container_basket_img";
        titleCamera.className = "container_basket_title";
        priceProductObjectif.className = "container_basket_objectif";
        priceBasket.className = "container_basket_price_basket";
        quantity.className = "container_basket_quantity";
        totalProduct.className = "container_basket_total_product";
        cameraText.className = "container_basket_camera_text";
        ////////////////////////////////////////
        //création des noeuds
         basket.appendChild(divText);
        divText.appendChild(imgCamera)
        cameraText.appendChild(priceBasket)
        divText.appendChild(titleCamera);
        divText.appendChild(cameraText);
        cameraText.appendChild(priceProductObjectif);
        cameraText.appendChild(quantity);
        cameraText.appendChild(totalProduct);
        ////////////////////////////////////////
        //attribution des données
        imgCamera.setAttribute('src', cameraStorage.imageUrl)
        titleCamera.innerHTML = cameraStorage.name;
        priceProductObjectif.innerHTML = "Objectif :" + " " +cameraStorage.optionSelect  ;
        console.log(priceProductObjectif)
        quantity.innerHTML = "Quantité :"+ " "+ cameraStorage.qty  ;
        console.log(quantity)
        totalProduct.innerHTML = "Prix "+" " +":"+" "+(cameraStorage.price * cameraStorage.qty ) +" "+"€"
        totalBasket = totalBasket + (cameraStorage.price * cameraStorage.qty )
        console.log(totalBasket)
        productsId.push(cameraStorage.id);
    }
}
        
//////////////////////////////////////////////
//bouton supprimer les articles
document.getElementById('remove_basket').addEventListener('click', () => {
     localStorage.clear(); //efface
    location.reload(); //recharge la page
 })  
//////////////////////////////////////////////     
//afficher le prix total
let totalPrice = document.createElement("p");
totalPrice.className = 'total_price';
totalPrice.innerHTML = "Prix total de votre panier :" + " " +  totalBasket +" "+ "€";
totalP.appendChild(totalPrice)
console.log(totalPrice)      
 
//let send = document.getElementById("send");

let returnButton = document.getElementById('return_button')
returnButton.innerHTML =`<button><a  class="liens" href="index.html" >Retour</a></button>` 
btn_send.innerHTML = `<button><a class='lien' href="confirmation_de_commande.html"></a></button>`



//Formulaire client
function sendOrder(){
    const name = document.getElementById("last_name").value;
    const firstname = document.getElementById("first_name").value;
    const mail = document.getElementById("adress").value;
    const adress = document.getElementById("city").value;
    const city = document.getElementById("mail").value;  

    const formInformation = new infoForm (name, firstname, mail, adress, city);
    const basketContent = JSON.parse(localStorage.getItem("cameraBasket"));

    let idOrder = [];
    
    for (let i = 0; i < cameraBasket.length; i =  i + 1){
        cameraBasket[i].id;
        idOrder.push(cameraBasket[i].id);
    }
    const command = new orderInfo(formInformation, idOrder);
    post("http://localhost:3000/api/cameras/order", command).then( function(response){
        localStorage.setItem("camerabasket", JSON.stringify([])); 
        localStorage.setItem("orderConfirmation", response.orderId);
        window.location.href = "confirmation_de_commande.html"; // on va à la page de confirmation
    }).catch(function(err){
        console.log(err);
        if(err === 0){ // requete ajax annulée
            alert("serveur HS");
        }
    });
}


