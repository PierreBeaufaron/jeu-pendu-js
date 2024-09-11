class JeuxDuPendule {
    constructor() {
        this.mots = ["arbre", "chat", "maison", "soleil", "voiture"];
        this.lettreDonner = document.getElementById('letter');
        this.wordContainer = document.getElementById('word-container');
        this.subButton = document.getElementById('subButton');
        this.score = document.getElementById('score');
        this.initButton = document.getElementById('initgame'); // Bouton pour réinitialiser le jeu
        this.vie = 10;
        this.mot = '';
        this.lettresTrouvees = []; // Pour garder une trace des lettres trouvées
        
        this.subButton.addEventListener('click', () => this.wordVerification());
        this.initButton.addEventListener('click', () => this.reinitialiserJeu()); // Nouveau listener pour réinitialiser

        this.reinitialiserJeu(); // Lancer un nouveau jeu au démarrage
    }

    motAuHasard() {
        const index = Math.floor(Math.random() * this.mots.length);
        this.mot = this.mots[index];
    }

    affichCase() {
        this.wordContainer.innerHTML = ''; 
        this.lettresTrouvees = Array(this.mot.length).fill(false); // Initialiser le tableau des lettres trouvées

        for (let i = 0; i < this.mot.length; i++) {
            const listItem = document.createElement('div');
            listItem.id = 'lettre' + i;
            listItem.textContent = '_';  // Afficher les underscores pour chaque lettre du mot
            listItem.classList.add('letter');
            this.wordContainer.appendChild(listItem); 
        }
    }

    wordVerification() {
        const lettre = this.lettreDonner.value.toLowerCase(); // Convertir en minuscule pour gérer la casse
        if (lettre.length !== 1) {
            alert('Veuillez entrer une seule lettre');
            return;
        }

        let lettreTrouvee = false;
        for (let i = 0; i < this.mot.length; i++) {
            if (this.mot[i] === lettre && !this.lettresTrouvees[i]) {
                document.getElementById('lettre' + i).textContent = lettre;
                this.lettresTrouvees[i] = true;
                lettreTrouvee = true;
            }
        }

        if (!lettreTrouvee) {
            this.vie -= 1;
            this.score.textContent = `Vies restantes : ${this.vie}`;
            if (this.vie === 0) {
                this.finDeJeu(false); // Perdu
            }
        } else if (this.lettresTrouvees.every(val => val)) {
            this.finDeJeu(true); // Gagné si toutes les lettres sont trouvées
        }

        this.lettreDonner.value = ''; // Réinitialiser le champ input
    }

    finDeJeu(gagne) {
        if (gagne) {
            alert('Félicitations, vous avez gagné !');
        } else {
            alert('Dommage, vous avez perdu !');
            // Afficher le mot complet en rouge
            for (let i = 0; i < this.mot.length; i++) {
                const div = document.getElementById('lettre' + i);
                div.textContent = this.mot[i];
                div.style.color = 'red';
            }
        }
    }

    reinitialiserJeu() {
        this.vie = 10;
        this.score.textContent = `Vies restantes : ${this.vie}`;
        this.motAuHasard();
        this.affichCase(); // Réinitialiser l'affichage avec des underscores
        this.lettreDonner.value = ''; // Réinitialiser le champ input
        this.wordContainer.querySelectorAll('div').forEach(div => {
            div.style.color = ''; // Réinitialiser la couleur des lettres
        });
        alert('Un nouveau jeu commence !');
    }
}

const jeu = new JeuxDuPendule();
