class JeuxDuPendule {
    constructor() {
        this.mots = ["arbre", "chaud", "maison", "soleil", "voiture", "banane", "fleur", "chaton", "chien", "cheval", 
    "avion", "train", "table", "chaise", "lampe", "stylo", "pomme", "orange", "porte", "fenêtre",
    "livre", "mur", "plage", "montre", "cloche", "savon", "balle", "marche", "jardin", "miroir",
    "village", "route", "pont", "pierre", "colline", "rivière", "chaîne", "forêt", "ciel", "nuage",
    "étoile", "neige", "mer", "océan", "vague", "pluie", "vent", "orage", "lune", "soleil",
    "éclair", "brume", "goutte", "tulipe", "rose", "lilas", "iris", "orchidée", "dauphin", "requin",
    "baleine", "lion", "tigre", "ours", "renard", "souris", "lapin", "cerf", "loup", "hibou",
    "cigogne", "hirondelle", "canard", "aigle", "faucon", "pigeon", "colombe", "grenouille", "serpent", "lézard",
    "papillon", "mouche", "abeille", "fourmi", "araignée", "escargot", "chameau", "zèbre", "girafe", "singe",
    "kangourou", "panda", "koala", "iguane", "autruche", "éléphant", "poulpe", "méduse", "mouette", "perroquet",
    "cacatoès", "lama", "dromadaire", "tortue", "caïman", "pingouin", "manchot", "flamant", "crocodile", "phoenix",
    "marmotte", "lynx", "bison", "cerf", "loutre", "chevreuil", "buffle", "iguane", "antilope", "gnu",
    "puma", "caribou", "yack", "boeuf", "bouc", "poule", "coq", "dinde", "oiseau", "cigogne",
    "hirondelle", "couveuse", "râteau", "bêche", "arrosoir", "tondeuse", "plantoir", "grelinette", "serfouette", "sécateur",
    "fourche", "pioche", "truelle", "perceuse", "visseuse", "marteau", "scie", "lime", "râpe", "ponceuse",
    "rabot", "burin", "pince", "tournevis", "clou", "vis", "écrou", "boulon", "rondelle", "cheville",
    "rivière", "torrent", "cascade", "ruisseau", "mare", "étang", "lac", "barrage", "aqueduc", "fontaine",
    "source", "puits", "crique", "delta", "marée", "vase", "corail", "atoll", "lagon", "récif",
    "sable", "gravier", "galet", "rocher", "falaise", "grotte", "gorge", "montagne", "plateau", "prairie",
    "savane", "désert", "dune", "forêt", "jungle", "taïga", "toundra", "steppe", "péninsule", "archipel",
    "volcan", "glacier", "cratère", "canyon", "vallée", "fjord", "grottes", "îlot", "détroit", "cap"];
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
