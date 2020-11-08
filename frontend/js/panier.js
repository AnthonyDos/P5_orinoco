let basket = document.getElementById("camerasCard");
let totalP = document.getElementById("total_p")

//push id de la cameras dans le tableau products
let productsId = [];
let totalBasket = 0 ;

// const basketEmpty = document.createElement("div")
// basket.appendChild(basketEmpty);
// basketEmpty.innerHTML = "Panier vide";

// //récupération des données stocker dans le localStorage
let cameraBasket = Object.keys(localStorage) 

for (i=0; i < cameraBasket.length; i++) {

        let cameraStorage = JSON.parse(localStorage.getItem(cameraBasket[i]))
        let totalPrice = document.createElement("p");      

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
        //création des noeuds
        //basket.appendChild(basketEmpty);
        basket.appendChild(divText);
        divText.appendChild(imgCamera)
        cameraText.appendChild(priceBasket)
        divText.appendChild(titleCamera);
        divText.appendChild(cameraText);
        cameraText.appendChild(priceProductObjectif);
        cameraText.appendChild(quantity);
        cameraText.appendChild(totalProduct);

        //attribution des données
        imgCamera.setAttribute('src', cameraStorage.imageUrl)
        titleCamera.innerHTML = cameraStorage.name;
        priceProductObjectif.innerHTML = "Objectif :" + " " +cameraStorage.optionSelect  ;
        console.log(priceProductObjectif)
        quantity.innerHTML = "Quantité :"+ " "+ cameraStorage.qty  ;
        console.log(quantity)
        totalProduct.innerHTML = "Prix "+" "+cameraStorage.name+" " +":"+" "+(cameraStorage.price * cameraStorage.qty )+ " "+"€"
        totalBasket = totalBasket + (cameraStorage.price * cameraStorage.qty )
        console.log(totalBasket)
        productsId.push(cameraStorage.id);

}


// document.getElementById('remove_basket').addEventListener('click', () => {
//     localStorage.clear();
//     location.reload();
// })  
        
//afficher le prix total
let totalPrice = document.createElement("p");
totalPrice.innerHTML = "Prix total de votre panier :" + " " +  totalBasket +" "+ "€";
totalP.appendChild(totalPrice)
console.log(totalPrice)      
 
//let send = document.getElementById("send");

let returnButton = document.getElementById('return_button')
returnButton.innerHTML =`<button><a  class="liens" href="index.html" >Retour</a></button>` 
btn_send.innerHTML = `<a class='lien' href="confirmation_de_commande.html"></a>`



//Formulaire client




