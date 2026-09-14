import os
import random

directory = "/home/tronix/julianous"

pages = {
    "etudes.html": {
        "title": "Études Classiques Obligatoires",
        "subtitle": "La souffrance mène à la perfection",
        "paragraphs": [
            "L'étude du contrepoint sévère n'est pas une option, c'est une nécessité vitale. Quiconque ose utiliser des quintes parallèles sera immédiatement foudroyé et renvoyé à l'école primaire.",
            "L'harmonie tonale est un privilège que vous ne méritez pas encore. Votre cerveau est ramolli par la musique populaire, une abomination qui devrait être interdite par la loi divine de Bach.",
            "Chaque note de cette partition doit être jouée avec la précision d'un métronome suisse et la passion d'un volcan en éruption. Si vous transpirez, c'est que vous commencez seulement à comprendre."
        ]
    },
    "requiem.html": {
        "title": "Le Requiem de Mozart",
        "subtitle": "Votre enterrement musical",
        "paragraphs": [
            "Le Dies Irae est la seule musique appropriée pour juger vos misérables tentatives de déchiffrage. Chaque fausse note est un pas de plus vers les flammes éternelles de l'enfer musical.",
            "Vous pleurez ? Le Lacrimosa n'a pas été écrit pour consoler les faibles, mais pour illustrer l'immensité du génie que vous ne toucherez jamais du doigt, même dans vos rêves les plus fous.",
            "Écoutez et tremblez ! Le chef-d'œuvre inachevé vous regarde de haut. Et moi aussi."
        ]
    },
    "chatiments.html": {
        "title": "Châtiments Corporels et Moraux",
        "subtitle": "Le bâton est le meilleur ami de l'élève",
        "paragraphs": [
            "La règle en fer sur les doigts n'est plus légale, hélas. Mais la violence psychologique reste une méthode pédagogique éprouvée et approuvée par le Conservatoire de Paris en 1842.",
            "Recopier 500 fois 'Je ne ferai plus d'octaves cachées' est un minimum syndical. Ceux qui osent contester verront leur instrument confisqué et jeté aux lions.",
            "L'humiliation publique devant vos camarades est le seul moyen de graver la théorie musicale dans vos mémoires défaillantes."
        ]
    },
    "livre-dor.html": {
        "title": "Livre d'or (Sévèrement modéré)",
        "subtitle": "Signez, mais sans faire de fautes",
        "paragraphs": [
            "Je ne tolérerai aucun commentaire positif. Seules les excuses publiques et les témoignages de repentance pour votre niveau pitoyable seront acceptés ici.",
            "Si votre message contient ne serait-ce qu'une erreur de conjugaison, votre adresse IP sera signalée à l'Académie Française et votre ordinateur explosera.",
            "Merci de laisser votre dignité à l'entrée. Et n'oubliez pas d'allumer vos haut-parleurs pour subir ma sélection musicale !"
        ]
    }
}

base_html = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Julianous - {title}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 50px;">
        <div style="text-align: center;">
            <h1>Julianous</h1>
            <h2>L'excellence intellectuelle par la douleur pédagogique</h2>
            <div style="margin-top:10px; font-weight:bold; color: yellow; text-shadow: 1px 1px red; font-size: 1.2em;" class="blink">Le Maître vous observe... Le contrôle frappera quand vous vous y attendrez le moins !</div>
        </div>
    </div>
    
    <div class="nav-menu">
        <a href="index.html">Accueil</a> | 
        <a href="etudes.html">Études Classiques</a> | 
        <a href="requiem.html">Requiem de Mozart</a> | 
        <a href="chatiments.html">Châtiments Corporels</a> | 
        <a href="auditions.html">Auditions</a> |
        <a href="livre-dor.html">Livre d'or</a>
    </div>

    <div style="border: outset 10px {border_color}; padding: 20px; background: {bg_color}; margin: 20px 0; box-shadow: 15px 15px 0px #000;">
        <h2 style="color: {title_color}; text-align: center; border-bottom: double 5px {title_color}; padding-bottom: 10px; font-family: 'Impact', sans-serif; font-size: 2.5em;">{title}</h2>
        <h3 class="blink" style="text-align: center; color: red; font-size: 1.8em;">{subtitle}</h3>
        
        <table style="width: 100%; border: inset 8px {border_color}; margin: 30px 0; background: url('assets/bg_stars.gif'); color: white;">
            <tr>
                <td style="padding: 30px;">
                    <p style="font-size: 1.6em; line-height: 1.6; text-align: justify; border: dashed 4px yellow; padding: 20px; background: rgba(0,0,0,0.8); box-shadow: 5px 5px 10px black;">{p1}</p>
                    
                    <div style="text-align: center; margin: 30px 0; background: #fff; padding: 10px; border: solid 3px red; display: inline-block;">
                        <img src="assets/underconstruction.gif" alt="Construction">
                        <img src="assets/flames.gif" alt="Flammes" style="margin: 0 20px;">
                        <img src="assets/underconstruction.gif" alt="Construction">
                    </div>
                    
                    <p style="font-size: 1.6em; line-height: 1.6; text-align: justify; border: double 6px cyan; padding: 20px; background: rgba(0,0,100,0.8); box-shadow: 5px 5px 10px black;">{p2}</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <marquee scrollamount="20" style="color: yellow; font-size: 2em; font-weight: bold; background: red; padding: 10px; border: solid 3px black;">VOUS N'AVEZ TOUJOURS RIEN COMPRIS !!! VOTRE IGNORANCE EST AFFLIGEANTE !!!</marquee>
                    </div>
                    
                    <p style="font-size: 1.6em; line-height: 1.6; text-align: justify; border: dotted 5px lime; padding: 20px; background: rgba(50,0,0,0.8); box-shadow: 5px 5px 10px black;">{p3}</p>
                </td>
            </tr>
        </table>
        
        <div style="text-align: center; padding: 25px; background: #ffffcc; border: solid 6px #000080; color: #000080; font-family: 'Times New Roman', serif; box-shadow: 10px 10px 0px gray;">
            <strong style="font-size: 1.5em; text-transform: uppercase;">🌐 Archive du Web Antique (Pensée du Maître) 🌐</strong><br><br>
            <i style="font-size: 1.3em;">"Lorem ipsum dolor sit amet, consectetuer adipiscing elit... BLABLABLA ! La vérité est que votre niveau est si lamentable que même le latin perd son sens face à votre ignorance crasse. Les balises HTML de 1998 ont plus de structure que vos compositions. Retournez travailler vos gammes avant que je ne détruise votre clavier avec un marteau !"</i>
        </div>
    </div>
</div>
<script src="script.js"></script>
</body>
</html>
"""

colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff9900", "#cc00cc"]

for page_file, data in pages.items():
    bg = random.choice(["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"])
    border = random.choice(colors)
    title_c = random.choice(["darkred", "navy", "darkgreen", "purple"])
    
    html = base_html.format(
        title=data["title"],
        subtitle=data["subtitle"],
        p1=data["paragraphs"][0],
        p2=data["paragraphs"][1],
        p3=data["paragraphs"][2],
        bg_color=bg,
        border_color=border,
        title_color=title_c
    )
    with open(os.path.join(directory, page_file), "w") as f:
        f.write(html)
