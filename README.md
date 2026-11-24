# Calculatrice

Une calculatrice scientifique : tape ton calcul au clavier ou clique sur les touches, le résultat s'affiche pendant que tu écris, et chaque calcul reste dans l'historique pour être réutilisé.

*English version: [README.en.md](README.en.md)*

## En toutes lettres, avec les unités (nouveau en 1.4.0)

20 % de 85 € + 12 €, 3 jours en heures, 100 km / 2 h, des variables : la calculatrice comprend les phrases et les unités.

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

## En toutes lettres, avec les unités (1.4.0)

Tape comme tu parles :

- **Pourcentages** : `20 % de 85 €` (17 €), `85 € + 20 %` (102 €), `12 € - 10 %` (10,8 €).
- **Unités** : longueurs (m, km, cm, mile, pied, pouce), surfaces, volumes (L, cl, ml), masses (g, kg, t, livre, once), durées (s, min, h, jour, semaine, mois, an), vitesses (km/h, m/s, mph), données (o, Ko, Mo, Go, To), températures (°C, °F, K) et monnaies (€, $, £, ¥, CHF, sans taux de change). `2 h 30 min` s’additionnent tout seuls, `100 km / 2 h` donne 50 km/h, `60 km/h * 2 h` donne 120 km.
- **Conversions** avec « en », « in », « to » ou « → » : `3 jours en heures` (72 h), `20 °C en °F` (68 °F), `1 Go en Mo`.
- **Mots** : plus, moins, fois, divisé par.
- **Variables** : `prix = 40 €`, puis `prix * 3 - 10 %`. Elles restent en haut du ticket.

Ajouter deux unités qui ne vont pas ensemble (des mètres et des kilos) affiche « unités incompatibles ».

## Historique

Les 50 derniers calculs s'affichent à droite, comme sur un ticket. **Clic sur un résultat** pour le remettre dans la saisie ; **Effacer** vide l'historique.

## Données et synchronisation

L'historique est rangé dans le dossier du plugin et sauvegardé par NeoDex, mais il n'est pas synchronisé : chaque PC garde le sien.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Calculatrice → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

## Version 1.3.0

- La calculatrice grandit avec la fenêtre : touches, écran et historique s'agrandissent (touches de 46 px dans une petite fenêtre, jusqu'à près de 80 px en plein écran).
- La touche degrés / radians s'appelle « D/R » (bulle d'aide au survol), pour tenir dans sa case.
