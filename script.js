
function genererQuestion() {
const bonPays = choisirAuHasard(pays);
const bonneReponse = bonPays.capitale;
// on part de la bonne réponse, puis on ajoute 3 distracteurs distincts
const propositions = [bonneReponse];
while (propositions.length < 4) {
const autre = choisirAuHasard(pays);
if (!propositions.includes(autre.capitale)) {
propositions.push(autre.capitale);
}
}
return {
    enonce: `Quelle est la capitale du pays : ${bonPays.nom} ?`,
    bonneReponse: bonneReponse,
    propositions: melanger(propositions)
};
}
function genererQuestions(nombre) {
const liste = [];
for (let i = 0; i < nombre; i++) {
liste.push(genererQuestion());
}
return liste;
}
// --- On saisit les éléments de la page (une seule fois) ---
const ecranAccueil = document.querySelector("#accueil");
const ecranQuiz = document.querySelector("#quiz");
const ecranResultat = document.querySelector("#resultat");
const champPseudo = document.querySelector("#pseudo");
const btnCommencer = document.querySelector("#btn-commencer");
const btnRejouer = document.querySelector("#btn-rejouer");
const elProgression = document.querySelector("#progression");
const elEnonce = document.querySelector("#enonce");
const elScoreFinal = document.querySelector("#score-final");
const boutonsReponse = document.querySelectorAll(".reponse"); // 4 boutons
// --- L'état du jeu ---
let questions = [];
let indexQuestion = 0;
let score = 0;
let pseudo = "";
// --- N'afficher qu'un seul écran ---
function afficherEcran(ecran) {
ecranAccueil.classList.add("cachee");
ecranQuiz.classList.add("cachee");
ecranResultat.classList.add("cachee");
ecran.classList.remove("cachee");
}
// --- Afficher la question courante ---
function afficherQuestion() {
const q = questions[indexQuestion];
elProgression.textContent = `Question ${indexQuestion + 1} / ${questions.length}`;
elEnonce.textContent = q.enonce;
// remplir les 4 boutons avec les 4 propositions (i = position du bouton)
boutonsReponse.forEach((bouton, i) => {
bouton.textContent = q.propositions[i];
});
}
// --- Traiter une réponse cliquée ---
function repondre(texteChoisi) {
const q = questions[indexQuestion];
if (texteChoisi === q.bonneReponse) {
score = score + 1;
}
indexQuestion = indexQuestion + 1;
if (indexQuestion < questions.length) {
afficherQuestion(); // question suivante
} else {
terminerQuiz(); // c'était la dernière
}
}
// --- Fin du quiz ---
function terminerQuiz() {
elScoreFinal.textContent =
`Bravo ${pseudo} ! Ton score : ${score} / ${questions.length}`;
afficherEcran(ecranResultat);
}
// --- Démarrer une partie ---
function demarrerQuiz() {
pseudo = champPseudo.value;
if (pseudo === "") {
pseudo = "Joueur";
}
score = 0;
indexQuestion = 0;
questions = genererQuestions(10);
afficherEcran(ecranQuiz);
afficherQuestion();
}
// Cliquer sur "Mode Capitales" démarre le quiz
btnCommencer.addEventListener("click", demarrerQuiz);
// Cliquer sur une réponse appelle repondre() avec le texte du bouton
boutonsReponse.forEach((bouton) => {
bouton.addEventListener("click", (event) => {
repondre(event.target.textContent);
});
});
// Cliquer sur "Rejouer" revient à l'accueil
btnRejouer.addEventListener("click", () => {
    afficherEcran(ecranAccueil);
});