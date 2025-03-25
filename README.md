# Documentation du Projet

## Technologies Utilisées

### HTML
Le projet utilise du HTML standard pour structurer le contenu de la page. Cette approche garantit une compatibilité maximale avec tous les navigateurs et une base solide pour l'accessibilité.

### SCSS
J'ai choisi sass pour plusieurs raisons :
- **Organisation modulaire** : Les styles sont divisés en composants réutilisables (comme en témoigne la structure des fichiers header)
- **Maintenabilité** : L'utilisation de variables permet un code plus propre et facile à maintenir
- **Granularité des fichiers** : La séparation en plusieurs fichiers (_header.scss, _topBar.scss, etc.) facilite la gestion du code

### JavaScript Vanilla
Le JavaScript est utilisé dans sa forme vanilla pour :
- Gérer les interactions utilisateur (comme le menu déroulant)
- Gérer les animations
- Permettre de ne pas alourdir ce projet en y incluant des dépendances trop gourmandes pour le besoin

## Comment testé le projet ? 

Le site est hébergé à l'aide de Github Pages et voici son lien : https://snoprod.github.io/test-smartfire/

Le menu est développé pour Desktop comme demandé, il est également disponible pour mobile.
Si vous souhaitez voir la version tiny du menu, il vous faudra ajouter le dataset "variant" sur la div .menu avec la valeur "tiny".

Cela devrait ressembler à ceci : 
```html
<div class="menu" data-active="false" data-variant="tiny">
```


