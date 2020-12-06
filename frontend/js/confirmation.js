let container = document.getElementById("main_command");
//=========================================================
//Récupération localstorage
let commande =  Object.keys(localStorage);
console.log(commande)
//===================================================================
for (i=0; i < commande.length; i++) {
  let infoCommand = JSON.parse(localStorage.getItem(commande[i]))
  console.log(infoCommand)
  //===================================================================
  let divConfirmation = document.createElement("div");
  container.appendChild(divConfirmation);
  divConfirmation.className ="div_confirmation";
  //=======================================================
  let thanks = document.createElement("h2");
  divConfirmation.appendChild(thanks);
  thanks.className ="h2_thanks";
  thanks.textContent = `Confirmation de votre commande ${infoCommand.nameConfirmation}, merci pour votre achat!`;
  //==============================================================================================================
  let info = document.createElement("h3");
  divConfirmation.appendChild(info);
  info.className = "info";
  info.textContent = "Récapitulatif de votre commande :";
  //================================================================================
  let id = document.createElement("p");
  divConfirmation.appendChild(id);
  id.className = "id_commande";
  id.innerHTML = `Numéro de commande : ${infoCommand.orderId}`;
  //console.log(infoCommand.idCommande)
  //================================================================================
  let price = document.createElement("p");
  divConfirmation.appendChild(price);
  price.innerHTML = `Prix total de la commande : ${infoCommand.totalPriceBasket} €`;
  price.className ="price";
  console.log(price)  
}
//======================
localStorage.clear();

