let basket = document.getElementById("camerasCard");
let totalP = document.getElementById("total_p");
let mainBasket = document.getElementById("main_basket")
//===================================================================
//push id de la cameras dans le tableau products
let productsId = [];
let totalBasketProduct = 0 ;
//======================================================================
//récupération des données stocker dans le localStorage
let cameraBasket = Object.keys(localStorage) 
console.log(cameraBasket)
//========================================================
function recuperationBasket(totalPanier) {
    if (cameraBasket.length == 0) {
        //===========================================
        let basketEmpty = document.createElement("p");
        mainBasket.appendChild(basketEmpty);
        basketEmpty.className = "basket_empty"
        basketEmpty.innerHTML =`Votre panier est vide. <i class="far fa-frown"></i>`
    }else{
        for (i=0; i < cameraBasket.length; i++) {
            //console.log(cameraBasket[i])
            //======================================================================
            let cameraStorage = JSON.parse(localStorage.getItem(cameraBasket[i]))
            console.log(cameraStorage)
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
            objectifBasket.innerHTML = `Objectif : ${cameraStorage.optionSelect}`;
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
            //=========================================
            productsId.push(cameraStorage.id)
            console.log(productsId)
        }
    }
}
//======================================================    
recuperationBasket(cameraBasket) 
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
let returnButton = document.getElementById('return_button')
returnButton =`<a  class="liens" href="index.html" >Retour</a>` 
btn_send = `<button><a class='lien' href="confirmation.html"></a></button>`
console.log(btn_send)
//=======================================================================================
class Client {
    constructor(lastName, firstName, address, city, email){
        this.lastName = lastName,
        this.firstName = firstName,
        this.address = address,
        this.city = city,
        this.email = email
    }  
} 
console.log(Client)
//=========================================================================================
let form = document.getElementById('form');
form.addEventListener('submit',(e) =>{
    if (!document.querySelector('#firstName').value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/)){
        alert('Le champs nom contient des erreurs');
        window.location ='panier.html';
    } 
    //=======================================================================================
    if (!document.querySelector('#lastName').value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/)){
        alert('Le champs prénom contient des erreurs');
        window.location ='panier.html';
    }
    //============================================================================================================
    if(!document.querySelector('#address').value.match(/^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/)){
        alert('Le champs adresse contient des erreurs');
        window.location ='panier.html';
    }
    //=====================================================================================
    if (!document.querySelector('#city').value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/)){
        alert('Le champs ville contient des erreurs');
        window.location ='panier.html';
    }
    //========================================================================================================
    if (!document.querySelector('#email').value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        alert('Le champs email contient des erreurs');
        window.location ='panier.html';
    }
    //======================================================
    e.preventDefault();
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
    console.log(contact);
    products = productsId;
    //================================================
    let send = {
        contact,
        products,
    }
    console.log(send)
    //==========================================================
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
