Les differentes pages de cette application type "Netflix" sont :
"/" : Page principale decrivant les series
"/admin" ; Page home de l'admin
"/admin/users" : Page affichant tous les users
"/admin/users/id" : Page decrivant un certain user
"/admin/tvshows/" : Page affichant toutes les series
"/admin/tvshows/id" : Page decrivant une certaine serie
"/admin/tvshows/id/edit" : Page éditant une certaine serie
"/admin/tvshows/id/new" : Page permettant d'ajouter une serie

Ces pages sont non fonctionnelles, la partie back-end n'etant pas faite

L'application a été créée autour d'une base de données MongoDB remplie en partie par les algorithmes presents dans le dossier "seeds" et manuellement pour la propriété "background".
Les données de la base de données sont fournie dans les fichiers "export-tvshows.json" et "export-users.json" dans le dossier "seeds".