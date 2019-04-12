var Diaporama = {
    items: document.getElementsByClassName("item"),
    imageNum: 0,
    playing: true,

    infosClavier: function (e) {
        if (e.keyCode === 39) {
            document.addEventListener("keydown", this.suivant());
        } else if (e.keyCode === 37) {
            document.addEventListener("keydown", this.precedent());
        }
    },


    suivant: function () {
        this.items[this.imageNum].style.opacity = "0";
        if (this.imageNum === 3) {
            this.imageNum = 0;
        } else {
            this.imageNum++;
        }
        this.items[this.imageNum].style.opacity = "1";
    },


    precedent: function () {
        this.items[this.imageNum].style.opacity = "0";
        if (this.imageNum === 0) {
            this.imageNum = 3;
        } else {
            this.imageNum--;
        }
        this.items[this.imageNum].style.opacity = "1";
    },


    changeImg: function () {
        this.items[this.imageNum].style.opacity = "0";
        if (this.imageNum < this.items.length - 1) {
            this.imageNum++;
        } else {
            this.imageNum = 0;
        }
        this.items[this.imageNum].style.opacity = "1";
    },

    autoSlide: function () {
        self.interval = setInterval(this.changeImg.bind(this), 5000);
    },

    pause: function () {
        clearInterval(self.interval);
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "block";
    },

    play: function () {
        self.interval = setInterval(this.changeImg.bind(this), 5000);
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
    }

}


document.getElementById("bouttonDroit").addEventListener("click", Diaporama.suivant.bind(Diaporama));

document.getElementById("bouttonGauche").addEventListener("click", Diaporama.precedent.bind(Diaporama));

document.addEventListener("keydown", Diaporama.infosClavier.bind(Diaporama));

document.getElementById("pause").addEventListener("click", Diaporama.pause.bind(Diaporama));

document.getElementById("play").addEventListener("click", Diaporama.play.bind(Diaporama));

var slider = Object.create(Diaporama);
slider.autoSlide();
