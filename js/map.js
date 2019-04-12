/**** Map / Info station ****/

var Maps = {
    lat: 45.764270,
    long: 4.835776,

    // Initialise la carte de l'API googleMap
    initMap: function () {
        var map = new google.maps.Map(document.getElementById("carte"), {
            center: {
                lat: this.lat,
                lng: this.long
            },
            zoom: 13
        });

        // Récupère les données de l'API JC Decaux
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c64b65767d21949e150e33b006124a867467a461", function (reponse) {
            var veloData = JSON.parse(reponse);

            // Affiche un marqueur pour chaque station
            veloData.forEach(function (element) {
                var image = "";
                var marker = new google.maps.Marker({
                    position: element.position,
                    map: map,
                });

                marker.addListener("click", function () {
                    document.getElementById("nomStation").textContent = "Station : " + element.name;
                    document.getElementById("infoStation").textContent = element.address;
                    document.getElementById("placesStation").textContent = element.available_bike_stands + " places";
                    document.getElementById("velosDispo").textContent = "Vélos disponibles : " + element.available_bikes;
                    document.getElementById("statut").textContent = "Statut : " + element.status;
                    Maps.checkStatus(element.status);
                    Maps.checkPlaces(element.available_bikes);
                })

            });

        });
    },
    checkStatus: function (status) {
        if (status === "CLOSED") {
            document.getElementById("statut").style.color = "red";
            document.getElementById("erreur").style.display = "block";
            document.getElementById("erreurInformation").textContent = "Cette station est fermée";
        } else {
            document.getElementById("statut").style.color = "black";
        }
    },
    checkPlaces: function (available_bikes) {
        if (available_bikes === 0) {
            document.getElementById("velosDispo").style.color = "red";
            document.getElementById("erreur").style.display = "block";
            document.getElementById("erreurInformation").textContent = "Aucun vélo n'est disponible à cette station";
        } else {
            document.getElementById("velosDispo").style.color = "black";
        }
    }
};

function initApp() {
    var carte = Object.create(Maps);
    carte.initMap();
};
