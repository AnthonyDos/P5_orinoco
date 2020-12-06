let cameraContainer = document.getElementById('cameras')
//==========================================================
//récupération de l'id du produit
function getId(){
	const param = window.location.search
	const id = param.replace("?id=","") //récupération de l'id et création d'une constante
	if (!id) throw new Error ('il manque l\'id')
	return id
}
//=============================================================
//récupération du produit séléctionner
fetch ("http://localhost:3000/api/cameras/" + getId())
.then(cameras => cameras.json())
.then(cameras => {
  console.log(cameras) 
	function afficherLeProduit(appareilphoto) {
        //================================================
		const divProduits = document.createElement('div');
        cameraContainer.appendChild(divProduits);
        divProduits.className = 'divProducts'
		console.log(divProduits)
		//================================================
		const divImg = document.createElement('div');
		divProduits.appendChild(divImg);
		divImg.className = 'divImg'
        //================================================
		const imgProduits = document.createElement('img');
        divImg.appendChild(imgProduits);           
        imgProduits.src = appareilphoto.imageUrl;
        imgProduits.className = 'imgProducts';
		console.log(imgProduits)
		//================================================
		const h2Produits = document.createElement('h2');
        divProduits.appendChild(h2Produits);
        h2Produits.textContent = appareilphoto.name;
        h2Produits.className = 'h2Products';
        console.log(h2Produits)
        //================================================
		const blocProduit = document.createElement("div");
		divProduits.appendChild(blocProduit);
		blocProduit.className = "blocProduct";
        //================================================
        const textProduct = document.createElement('p');
        blocProduit.appendChild(textProduct);
        textProduct.textContent = appareilphoto.description;
        textProduct.className = 'textProduct';
        //==================================================
        const optionLabel = document.createElement('label');
        blocProduit.appendChild(optionLabel);
        optionLabel.textContent = 'Choix' + ' ';
		optionLabel.className = 'optionLabel';
		//====================================================
		const optionSelect = document.createElement('select');
        blocProduit.appendChild(optionSelect);
        //====================================================
        const optionValeur = [];
        //====================================================
        const camerasQuantity = document.createElement('div');
        blocProduit.appendChild(camerasQuantity);
        camerasQuantity.className = 'quantity';
        //=====================================================
        const camerasQuantityText = document.createElement('p');
        camerasQuantity.appendChild(camerasQuantityText);
        camerasQuantityText.textContent = 'Quantité';
        //==========================================================
        const camerasQuantityInput = document.createElement('input');
        camerasQuantity.appendChild(camerasQuantityInput);
        camerasQuantityInput.setAttribute('type','number');
	    camerasQuantityInput.setAttribute('value',1);
        camerasQuantityInput.setAttribute('min',1);
        camerasQuantityInput.className = 'quantity_input';
        //===========================================================
        const priceDiv = document.createElement('div');
        blocProduit.appendChild(priceDiv);
        priceDiv.className = 'priceDiv';
        //===========================================================
        const priceProduct = document.createElement('p');
        priceDiv.appendChild(priceProduct);
        priceProduct.textContent = 'Prix:'+' '+ appareilphoto.price /100 + " "+ "€";
        priceProduct.className = 'priceProduct';
        //==========================================================================
        const divBtn = document.createElement('div');
        divProduits.appendChild(divBtn);
        divBtn.className = 'divBtn';
        //===============================================
        const btnSend = document.createElement('button');
        divBtn.appendChild(btnSend);
        btnSend.className = "btnSend"
        btnSend.innerHTML =`<a  class="liens" href="panier.html" >Ajouter</a>`
        //=====================================================================
        const btnReturn = document.createElement('button');
        divBtn.appendChild(btnReturn);
        btnReturn.className = "btnReturn";
        btnReturn.innerHTML =`<a  class="liens" href="index.html" >Retour</a>`;
        //======================================================================
        for (let i = 0 ; i < cameras.lenses.length; i = i + 1){
            console.log(cameras.lenses[i])
            optionValeur.push(document.createElement('option'))
            optionSelect.appendChild(optionValeur[i]);
            optionValeur[i].innerHTML = cameras.lenses[i];
            optionSelect.setAttribute('value',cameras.lenses[i])
            optionSelect[i].id = ('value', cameras.lenses.value)  
        }
        //===========================================================
        btnSend.addEventListener('click',envoiDuProduit) 
        function envoiDuProduit(e){

        //j'impose une condition de sélectionner une quantité           	
            if (camerasQuantityInput.value == 0 ){
                alert('Veuillez sélectionner une quantité')
                e.preventDefault();           
            }else{
                //si la condition est respectée  
                priceProduct.textContent = ((cameras.price / 100) * (+camerasQuantityInput.value)) + '€'
                //=========================================================================================
                let camerasBasket = {
                    id : cameras._id,
                    name : cameras.name,
                    price : cameras.price/100,
                    description : cameras.description,
                    imageUrl : cameras.imageUrl,
                    optionSelect: optionSelect.value,	
                    qty : camerasQuantityInput.value
                }    
                //=====================================================
                //affiche dans le local storage
                let objectifOption = JSON.stringify(camerasBasket);
                localStorage.setItem(cameras._id, objectifOption);
                const lenses = document.getElementsByTagName('select')
                buttonSend = JSON.parse(localStorage.getItem('cameras'))
                alert  (camerasQuantityInput.value + " " + appareilphoto.name + ' ' + optionSelect.value + ' ajouté au panier')
            }  
        }
    }
    afficherLeProduit(cameras)   
})
	