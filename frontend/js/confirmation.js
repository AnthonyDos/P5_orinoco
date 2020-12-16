//Récupération localstorage
let commande =  Object.keys(localStorage);
let infoCommand = JSON.parse(localStorage.getItem(commande))
if (commande == 0){
    let commandeNull = document.getElementById('commandeNull')
    commandeNull.className = "commandeNull"
    commandeNull.innerHTML = "Vous n\' avez pas de commande !"
}else {
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
