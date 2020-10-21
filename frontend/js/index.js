let cameras = document.getElementsByClassName("cameras");

//Je fais ma requête afin de récupérer le tableau contenant les différentes valeurs des produits.
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.response);
        console.log(response)
        //La boucle for me permet d'incrémenter les données a chaque balise section de mon HTML.
        for (let i = 0; i < 4; i++ ) {
            cameras[i].innerHTML = `<img class=imagescamera + src="${response[i].imageUrl}" alt="caméras"/><figcaption id="text_produit"><h2>${response[i].name}</h2><p> Description: ${response[i].description}</p><p> Prix: ${response[i].price}€</p><a href="html/produit.html?id=${response[i]._id} class="liens"><button>Aperçu</button></a></figcaption>`
            cameras[i].setAttribute("data-id", response[i]._id)
        };
    };
};

request.open("GET", "http://localhost:3000/api/cameras", true);
request.send();

