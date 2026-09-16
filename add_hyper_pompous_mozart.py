#!/usr/bin/env python3
import re

file_path = "/home/tronix/julianous/latin.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Hyper pompous Mozart content and buttons block to insert
mozart_hyper_pompous_block = """
    <!-- NOUVELLE SECTION HYPER POMPEUSE : LE MANIFESTE SACRÉ DE MOZART ET DU MAÎTRE -->
    <div style="background: linear-gradient(135deg, #400000, #800000, #000040); border: double 12px gold; padding: 30px; margin: 35px 0; color: white; box-shadow: 15px 15px 0px #000; text-align: center;">
        <h2 style="font-family: 'Impact', sans-serif; font-size: 3em; color: yellow; text-shadow: 4px 4px 0px black; text-transform: uppercase;">
            👑 LE MANIFESTE ABSOLU DE LA SOUVERAINETÉ MOZARTIENE 👑
        </h2>
        <h3 class="blink" style="color: cyan; font-size: 1.8em; margin-bottom: 25px;">
            « CUM MOZART LOQUITUR, CANCRES TACEANT ET FLENT ! »
        </h3>

        <!-- BOUTONS D'ACTION RÉTRO UN PEU PARTOUT -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-bottom: 30px;">
            <button style="background: red; color: yellow; font-size: 1.2em; font-weight: bold; padding: 12px 20px; border: outset 5px gold; cursor: pointer;" onclick="triggerPartitionPopupExplosion()">
                ⚡ DÉCLENCHER LE FOUET DE SOLFÈGE ⚡
            </button>
            <button style="background: darkblue; color: cyan; font-size: 1.2em; font-weight: bold; padding: 12px 20px; border: outset 5px cyan; cursor: pointer;" onclick="toggleAudio()">
                🎹 ÉCOUTER LA MUSIQUE DU MAÎTRE 🎹
            </button>
            <button style="background: darkgreen; color: lime; font-size: 1.2em; font-weight: bold; padding: 12px 20px; border: outset 5px lime; cursor: pointer;" onclick="alert('📜 CERTIFICAT D\'IGNORANCE DÉLIVRÉ :\n\nLe Maître Julianous atteste que votre niveau en contrepoint est nul, non avenu et punissable par décret impérial !');">
                📜 AFFICHER VOTRE CERTIFICAT D'IGNORANCE 📜
            </button>
            <button style="background: purple; color: white; font-size: 1.2em; font-weight: bold; padding: 12px 20px; border: outset 5px magenta; cursor: pointer;" onclick="triggerPartitionPopupExplosion()">
                💣 EXPLOSER TOUTES LES RÉCLAMES 💣
            </button>
        </div>

        <!-- TEXTE HYPER POMPEUX N°1 : LA LETTRE PERDUE DE MOZART -->
        <div style="background: #fff8e6; color: black; padding: 25px; border: outset 6px gold; text-align: justify; font-family: 'Times New Roman', serif; margin-bottom: 25px;">
            <h3 style="color: #800000; text-align: center; border-bottom: solid 3px #800000; padding-bottom: 8px; font-family: 'Impact'; font-size: 1.9em;">
                ✉️ LA LETTRE SECRÈTE DE MOZART À SON PÈRE LEOPOLD (ANNOTÉE EN ROUGE PAR LE MAÎTRE) ✉️
            </h3>
            <p style="font-size: 1.3em; line-height: 1.9; text-indent: 30px;">
                « Mon très cher père, à Vienne ce 14 Octobre 1781... Je composais hier soir un menuet en Ré majeur lorsque me vint la pensée terrifiante des élèves du futur ! S'ils osent jouer mes sonates sans respecter la justesse des dièses et la rigueur de la cadence parfaite, je préfère que mes partitions soient brûlées en place publique ! »
            </p>
            <blockquote style="border-left: solid 8px red; padding-left: 20px; background: #ffe6e6; font-style: italic; font-size: 1.25em; color: darkred; margin: 15px 0;">
                <strong style="color: black;">🔥 Note fulminante du Maître Julianous :</strong><br>
                « Vous l'entendez, misérables ignorants ? Mozart lui-même préférait voir ses chefs-d'œuvre détruits plutôt que d'entendre vos doigts hésitants massacrer ses arpèges ! »
            </blockquote>
        </div>

        <!-- RECLAME RÉTRO INTERMÉDIAIRE FLAMBOYANTE -->
        <div style="background: yellow; color: black; padding: 15px; border: dashed 6px red; margin-bottom: 25px; text-align: center;">
            <h3 class="blink" style="color: red; font-size: 2em; margin: 0;">
                🎺 SPONSOR DE L'IMPERIAL CONSERVATOIRE 🎺
            </h3>
            <p style="font-size: 1.3em; font-weight: bold; margin: 8px 0;">
                VINAIGRE SOLFÉGIQUE DU MAÎTRE : Purifiez vos oreilles après l'écoute d'une fausse note ! (-95% pour les cancres).
            </p>
            <button style="background: black; color: lime; font-size: 1.3em; font-weight: bold; padding: 8px 25px; border: outset 4px white; cursor: pointer;" onclick="triggerPartitionPopupExplosion()">
                🛒 ACHETER LE VINAIGRE PURIFICATEUR
            </button>
        </div>

        <!-- TEXTE HYPER POMPEUX N°2 : LE TRAITÉ DE LA SYMPHONIE EN UT MINEUR -->
        <div style="background: #f0f7ff; color: black; padding: 25px; border: outset 6px #000080; text-align: justify; font-family: 'Times New Roman', serif; margin-bottom: 25px;">
            <h3 style="color: #000080; text-align: center; border-bottom: solid 3px #000080; padding-bottom: 8px; font-family: 'Impact'; font-size: 1.9em;">
                🎼 ANALYSE MAGISTRALE : LA SUPRÉMATIE DU CONTREPOINT MOZARTIEN 🎼
            </h3>
            <p style="font-size: 1.3em; line-height: 1.9; text-indent: 30px;">
                La Symphonie en Ut mineur n'est pas un divertissement pour esprits frivoles ! C'est une cathédrale sonore construite sur les fondations granitiques de la basse continue et de la fugue à quatre voix. Quiconque n'est pas capable de chanter la partie de basse à livre ouvert sera séance tenante privé de récréation pour les trente prochaines années !
            </p>
            <div style="text-align: center; margin-top: 20px;">
                <button style="background: #000080; color: white; font-size: 1.2em; font-weight: bold; padding: 10px 20px; border: outset 4px gold; cursor: pointer;" onclick="alert('🎺 BÂTON PÉDAGOGIQUE ACTIF !\n\nLe Maître frappe votre pupitre avec vigueur !');">
                    💥 FRAPPER LE PUPITRE DU CANCRE
                </button>
            </div>
        </div>

        <!-- BOUTONS D'ACTION SECONDAIRES -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 20px;">
            <button style="background: gold; color: black; font-size: 1.2em; font-weight: bold; padding: 12px 20px; border: outset 5px black; cursor: pointer;" onclick="triggerPartitionPopupExplosion()">
                🎺 COMMANDER LA RÈGLE EN FER DE 50CM 🎺
            </button>
            <button style="background: darkred; color: white; font-size: 1.2em; font-weight: bold; padding: 12px 20px; border: outset 5px red; cursor: pointer;" onclick="alert('🕊️ PIGEON VOYAGEUR ENVOYÉ !\n\nUne convocation officielle a été expédiée à vos parents avec mention : CANCRE ASSIGNÉ AU CHÂTIMENT !');">
                🕊️ ENVOYER UN CHÂTIMENT PAR PIGEON VOYAGEUR 🕊️
            </button>
        </div>
    </div>
"""

# Insert this block right before the BOUTON RETOUR in latin.html
content = content.replace("<!-- BOUTON RETOUR -->", mozart_hyper_pompous_block + "\n    <!-- BOUTON RETOUR -->")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Hyper pompous Mozart content, extra buttons, and flashy ads added to latin.html!")
