var Timer = {
    self: this,

    init: function (duration) {
        this.secondes = duration;
        this.text = "";
        this.declencheur = document.getElementById("boutonValider");
        this.declencheur.addEventListener("click", function () {
            sessionStorage.setItem("endTime", Math.floor((Date.now() / 1000) + 1200));
            document.getElementById("annuler").style.display = "block";
            clearInterval(this.interval);
            this.demarrerChrono(duration);
        }.bind(this))
    },

    annulerTemps: function () {
        document.getElementById("oui").addEventListener("click", function () {
            console.log(this);
            clearInterval(this.interval);
            document.getElementById("chrono").innerHTML = "Réservation annulée";
        }.bind(this))
    },

    chrono: function () {
        console.log(this);
        if (this.secondes > 0) {
            var minutes = Math.floor(this.secondes / 60);
            this.secondes -= minutes * 60;
            if (minutes > 0) {
                text = "Temps restant : " + minutes + " min " + this.secondes + " sec";
                this.secondes = this.secondes + (minutes * 60) - 1;
                sessionStorage.setItem("secondes", this.secondes);
            } else {
                text = "Temps restant : " + this.secondes + " sec";
                this.secondes = this.secondes + (minutes * 60) - 1;
                sessionStorage.setItem("secondes", this.secondes);
            }
        } else {
            clearInterval(this.interval);
            document.getElementById("nomStationReserve").textContent = "";
            document.getElementById("nomClient").textContent = "";
            document.getElementById("annuler").style.display = "none";
            text = "Le temps est écoulé";
            sessionStorage.clear();
        }
        document.getElementById("chrono").innerHTML = text;
    },

    verifRes: function () {
        if (sessionStorage.getItem("secondes")) {
            this.secondes = sessionStorage.getItem("endTime", Math.floor((Date.now() / 1000) + 1200)) - Math.floor(Date.now()/1000);
            this.interval = setInterval(this.chrono.bind(this), 1000);
        }
    },

    demarrerChrono: function (duration) {
        this.secondes = duration;
        this.interval = setInterval(this.chrono.bind(this), 1000);
        document.getElementById("containerCanvas").style.display = "none";
    },
}

var chrono = Object.create(Timer);
chrono.init(1200);
chrono.annulerTemps();
chrono.verifRes();