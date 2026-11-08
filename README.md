# Calculatrice

Une calculatrice scientifique : tape ton calcul au clavier ou clique sur les touches, le résultat s'affiche pendant que tu écris, et chaque calcul reste dans l'historique pour être réutilisé.

*English version: [README.en.md](README.en.md)*

## Comment l'utiliser

- Tape une expression entière, par exemple `2(3+4)^2 ÷ 5` ou `sin(30) + √16`. Le résultat provisoire (« = … ») s'affiche en direct sous la saisie.
- **Entrée** ou **=** calcule : le résultat remplace l'expression et rejoint l'historique.
- **Échap** ou **C** efface la saisie, **⌫** retire le dernier caractère.
- Les touches à l'écran insèrent leur symbole là où se trouve le curseur.

## Ce qu'elle comprend

- Les quatre opérations (`+ − × ÷`, ou `* /` au clavier), les parenthèses et les priorités habituelles.
- Les puissances avec `^` (x² et xʸ sur les touches) ; elles se calculent de droite à gauche : `2^3^2` vaut 512.
- `n!` (factorielle, jusqu'à 170) et `%` (`50%` vaut 0,5).
- Les fonctions `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `ln` (logarithme naturel), `log` (base 10), `√` ou `sqrt`, `abs`, `exp`, `round`, `floor`, `ceil`.
- Les constantes `π` (ou `pi`) et `e`, et **Ans**, le dernier résultat.
- Le produit implicite : `2π`, `3(4+1)`, `2sin(30)`.
- La virgule comme séparateur décimal (`1,5`), le point aussi.
- **DEG/RAD** bascule les angles entre degrés et radians ; le mode actif est affiché.

Les erreurs sont dites en clair : expression incomplète, division par zéro, factorielle impossible, caractère inattendu. Les très grands et très petits nombres s'affichent en notation scientifique, avec 14 chiffres significatifs au plus.

## Historique

Les 50 derniers calculs s'affichent à droite, comme sur un ticket. **Clic sur un résultat** pour le remettre dans la saisie ; **Effacer** vide l'historique.

## Données et synchronisation

L'historique est rangé dans le dossier du plugin et sauvegardé par NeoDex, mais il n'est pas synchronisé : chaque PC garde le sien.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Calculatrice → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
