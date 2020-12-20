//Récupération localstorage
let infoCommand = JSON.parse(localStorage.getItem('commande'))
//si le local storage ne contient aucun article envoyer depuis la page panier alors:
if(infoCommand == null) {
    let commandeNull = document.getElementById('commandeNull')
    commandeNull.className = "commandeNull"
    commandeNull.innerHTML = "Vous n\' avez pas de commande !"
}else {
    //sinon il affiche le numéro de commande 
    let thanks = document.getElementById('h2_thanks')
    thanks.textContent = `Confirmation de votre commande ${infoCommand.nameConfirmation}, merci pour votre achat !`;

    let info = document.getElementById('info')
    info.textContent = "Récapitulatif de votre commande :";

    let id = document.getElementById('id_commande')
    id.innerHTML = `Numéro de commande : ${infoCommand.orderId}`;

    let price = document.getElementById('priceConfirmation')
    price.innerHTML = `Prix total de la commande : ${infoCommand.totalPriceBasket} €`;

    localStorage.clear();
}
