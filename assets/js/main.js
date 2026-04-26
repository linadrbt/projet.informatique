// Les variables sont mises en dehors de tout pour pouvoir les utiliser partout
var contenu = "";
var mots = [];
var lignestexte = [];

function segmentation() {
// Envoie directement vers le fichier choisi
var boutonfichier = document.getElementById("fichier");
var fichier = boutonfichier.files[0];

// Si aucun fichier n'est sélectionné, l'erreur s'affiche
if (!fichier) {
document.getElementById("affichage").innerHTML = "<h2>Erreur : Veuillez d'abord choisir un fichier .txt</h2>"; return;
}

// Le lecteur de fichier
var lecturetexte = new FileReader();
lecturetexte.onload = function(e) {
contenu = e.target.result; // Tout le texte est  dans la variable

var delimiteurs = document.getElementById("delimiteurs").value;
var decoupage = new RegExp("[" + delimiteurs + "]+", "g");
var motsdecoupes = contenu.split(decoupage); // On coupe le texte en fonction des délimiteurs

// Pour éviter les cases vides
mots = [];
for (var i = 0; i < motsdecoupes.length; i++) {
if (motsdecoupes[i].trim() !== "") {
mots.push(motsdecoupes[i]); // Ajout au tableau
}

var lignes = contenu.split("\n");
lignestexte = [];
for (var j = 0; j < lignes.length; j++) {
lignestexte.push(lignes[j]);
}
}

// Préparation des stats
var message = "<h3>Fichier charge avec succes</h3>";
message += "<p>Nombre de Tokens : " + mots.length + "</p>";
message += "<p>Nombre de lignes : " + lignestexte.length + "</p>";

//Mise en page des stats
var affichage = message;
affichage += "<table class='table-globale'><tr>";
affichage += "<td class='colonne-gauche'>";
affichage += contenu.split("\n").join("<br/>"); // <br/> pour le html
affichage += "</td>";
affichage += "<td id='resultat-resultat' class='colonne-droite' style='text-align:left;'>";
affichage += mots.join(" "); // Recoller les mots avec des espaces
affichage += "</td>";
affichage += "</tr></table>";

document.getElementById("affichage").innerHTML = affichage; // Pour que la partie "affichage" s'affiche
};
lecturetexte.readAsText(fichier);
}

function afficherAide() { // Explique comment utiliser le site
var texteAide = "<h2>Aide a l'utilisation du site.</h2>";
texteAide += "<p>Selectioner un fichier .txt</p><br/>";
texteAide += "<p>Choisir un parametre : delimiteur, pole, longueur.</p><br/>";
texteAide += "<p>- Segmentation : Affiche le decoupage du texte.<br/>";
texteAide += "- Concordancier : Cherche le mot dans Pole et le met dans son contexte.<br/>";
texteAide += "- Nombre de phrases : Compte le nombre de phrases dans le texte</p>";
document.getElementById("affichage").innerHTML = texteAide;
}

function direBonjour() {
document.getElementById("affichage").innerHTML = "Bonjour !";
}

function concordancier() {
if (mots.length == 0) { // Message d'erreur si aucun fichier n'est choisi
alert("Erreur : Veuillez d'abord charger un fichier !");
return;
}
console.log("test")
var pole = document.getElementById("pole").value; // Récupère le mot cherché
if (pole.trim() === "") {
alert("Erreur : Veuillez écrire un mot dans la case POLE !");
return;
}
var taille = Number(document.getElementById("longueur").value); // Bien mettre en chiffre sinon ca devient du texte
var tableau = "<h3>Concordancier pour : " + pole + "</h3>";
tableau += "<table>";
tableau += "<tr><th>Contexte gauche</th><th>Pole</th><th>Contexte droit</th></tr>";

// Cherche le mot exact
var regexPole = new RegExp("^" + pole + "$");

// Cherche tous les mots
for (var i = 0; i < mots.length; i++) {

// Cherche les mots d'avant
if (mots[i].match(regexPole)) {
var partiegauche = [];
for (var g = i - taille; g < i; g++) {
if (g >= 0) {
partiegauche.push(mots[g]); 
}
}

// Cherche les mots d'après
var partiedroite = [];
var fin = i + taille;
for (var d = i + 1; d < fin; d++) {
if (d < mots.length) {
partiedroite.push(mots[d]);
}
}

// Ajout d'une ligne chaque fois qu'un mot est trouvé
tableau += "<tr>";
tableau += "<td>" + partiegauche.join(" ") + "</td>";
tableau += "<td style='text-align:center;'><strong>" + mots[i] + "</strong></td>";
tableau += "<td>" + partiedroite.join(" ") + "</td>";
tableau += "</tr>";
}
}
tableau += "</table>";

//Le tableau dans la colone de droite
var resultat = document.getElementById("resultat-resultat");
if (resultat) {
resultat.innerHTML = tableau;
}
}

function nombrePhrases() {
if (contenu == "") {
alert("Veuillez d'abord charger un fichier !");
return;
}
 // Couper sur les points, points d'exclamations et points d'interrogations
var regexPhrases = new RegExp("[.!?]+", "g");
var decoupage = contenu.split(regexPhrases);

var nb = 0;
for (var i = 0; i < decoupage.length; i++) { // Compter les parties non vides
if (decoupage[i].trim() !== "") {
nb++;
}
}

var resultat = document.getElementById("resultat-resultat");
if (resultat) {
resultat.innerHTML = "<h3>Nombre de phrases</h3><p>Il y a <strong>" + nb + "</strong> phrases dans ce texte.</p>";
} else {
alert("Chargez d'abord le fichier pour voir le résultat !");
}
}
