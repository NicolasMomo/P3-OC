var Reservation = {
    self: this,
    form: document.querySelector('form'),
    ecraseResa: document.getElementById("ecraserResa"),
    canvas: document.getElementById("containerCanvas"),
    signature: document.getElementById("canvas"),

    init: function () {
        this.form.addEventListener("submit", function (e) {
            e.preventDefault();
            this.nomStation = document.getElementById("nomStation");
            this.nomStationReserve = document.getElementById("nomStationReserve");
            this.nomClient = document.getElementById("nomClient");
            this.annuler = document.getElementById("annuler");
            this.annulation = document.getElementById("annulation");
            this.nom = document.getElementById("nom");
            localStorage.setItem("nomClient", self.nom.value);
            this.prenom = document.getElementById("prenom");
            localStorage.setItem("prenomClient", self.prenom.value);
            this.infoStation = document.getElementById("infoStation");
            sessionStorage.setItem("infoStation", self.infoStation);
            this.placesStation = document.getElementById("placesStation");
            this.velosDispo = document.getElementById("velosdispo");
            this.statut = document.getElementById("statut");
            this.erreur = document.getElementById("erreur");
            this.erreurInformation = document.getElementById("erreurInformation");
            this.ecraseResa = document.getElementById("ecraserResa");
            this.canvas = document.getElementById("containerCanvas");
            this.reserver = document.getElementById("reserver");

            if ((self.infoStation.textContent == "") || (self.placesStation.textContent == "") || (self.velosDispo.textContent == "") || (self.statut.textContent == "")) {
                this.erreur.style.display = "block";
                this.erreurInformation.textContent = "Veuillez selectionner une station";
            } else if (sessionStorage.getItem("clientNom")) {
                this.ecraseResa.style.display = "block";
            } else {
                this.canvas.style.display = "block";
            }
            document.getElementById("annuler")
        });
    },

    ecraserResa: function () {
        var self = this;
        document.getElementById("yes").addEventListener("click", function () {
            console.log(self);
            self.canvas.style.display = "block";
            self.ecraseResa.style.display = "none";
        })
        document.getElementById("no").addEventListener("click", function () {
            self.ecraseResa.style.display = "none";
        })
    },

    validerResa: function () {
        document.getElementById("boutonValider").addEventListener("click", function () {
            document.getElementById("nomStationReserve").textContent = self.nomStation.textContent;
            sessionStorage.setItem("stationNom", self.nomStation.textContent);
            document.getElementById("nomClient").textContent = self.nom.value + " " + self.prenom.value;
            sessionStorage.setItem("clientNom", self.nom.value);
            sessionStorage.setItem("clientPrenom", self.prenom.value);
        })
    },

    verifResa: function () {
        if (sessionStorage.getItem("secondes")) {
            self.annuler.style.display = "block";
            self.secondes = sessionStorage.getItem("secondes");
            self.nomStationReserve.textContent = sessionStorage.getItem("stationNom");
            self.nomClient.textContent = sessionStorage.getItem("clientNom") + " " + sessionStorage.getItem("clientPrenom");

        }
    },

    demandeAnnulerResa: function () {
        self.annuler.addEventListener("click", function () {
            self.annulation.style.display = "block";
        })
    },

    annulerResa: function () {
        document.getElementById("oui").addEventListener("click", function () {
            sessionStorage.clear();
            self.nomStationReserve.textContent = " ";
            self.nomClient.textContent = " ";
            self.annulation.style.display = "none";
            self.annuler.style.display = "none";
        })
        document.getElementById("non").addEventListener("click", function () {
            self.annulation.style.display = "none";
        })
    },

    local: function () {
        if (localStorage.getItem("nomClient")) {
            self.nom.value = localStorage.getItem("nomClient");
            self.prenom.value = localStorage.getItem("prenomClient");
        }
    }
};

var reserve = Object.create(Reservation);
reserve.init();
reserve.validerResa();
reserve.verifResa();
reserve.demandeAnnulerResa();
reserve.annulerResa();
reserve.local();
reserve.ecraserResa();



document.getElementById("ok").addEventListener("click", function () {
    document.getElementById("erreur").style.display = "none";
})
