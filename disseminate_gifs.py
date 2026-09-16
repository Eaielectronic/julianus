#!/usr/bin/env python3
"""
Disseminate the 4 animated GIFs directly into the HTML body flow (search area, headers, widgets, results)
across index.html, results.html, and all other site pages.
"""
import re

# 1. Update index.html
with open("/home/tronix/julianous/index.html", "r", encoding="utf-8") as f:
    idx_content = f.read()

search_area_gif = """
    <div class="search-area" style="position: relative;">
        <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 15px;">
            <img src="assets/giphy_maitre.gif" alt="Professeur sévère" style="height: 90px; border: outset 4px red; box-shadow: 4px 4px 8px black;" />
            <h3 style="margin: 0; flex: 1; text-align: center;">Quelle notion musicale ou littéraire désirez-vous ardemment assimiler en ce jour ?</h3>
            <img src="assets/teachers_day.gif" alt="Jour du professeur" style="height: 90px; border: outset 4px gold; box-shadow: -4px 4px 8px black;" />
        </div>
        <form action="results.html" method="GET">
            <input type="text" name="q" placeholder="Veuillez décliner votre requête céans..." />
            <br>
            <button type="submit">Initier la quête intellectuelle</button>
        </form>
    </div>
"""

idx_content = re.sub(r'<div class="search-area">.*?</div>', search_area_gif, idx_content, flags=re.DOTALL)

# Add point_education.gif and maitre_orchestra.gif into index widgets
widget_gif_block = """
        <div style="display: flex; justify-content: center; gap: 20px; margin: 25px 0; align-items: center; background: #fff0f0; border: double 6px red; padding: 15px;">
            <img src="assets/point_education.gif" alt="Point Éducation" style="height: 100px; border: outset 3px #dfdfdf;" />
            <div style="text-align: center; flex: 1;">
                <h3 style="color: darkred; margin: 0; font-family: 'Impact'; font-size: 1.6em;">⚠️ L'OBSERVATOIRE PERMANENT DU MAÎTRE ⚠️</h3>
                <p style="margin: 5px 0; font-size: 1.2em; font-weight: bold;">Le Professeur vérifie la rigueur de vos révisions à chaque seconde !</p>
            </div>
            <img src="assets/maitre_orchestra.gif" alt="Maître d'orchestre" style="height: 100px; border: outset 3px gold;" />
        </div>
"""

if 'assets/point_education.gif' not in idx_content:
    idx_content = idx_content.replace('<div class="widgets">', widget_gif_block + '\n    <div class="widgets">')

with open("/home/tronix/julianous/index.html", "w", encoding="utf-8") as f:
    f.write(idx_content)

print("Updated index.html with embedded GIFs!")


# 2. Update results.html ("recherche")
with open("/home/tronix/julianous/results.html", "r", encoding="utf-8") as f:
    res_content = f.read()

res_search_gif = """
    <div class="search-area" style="padding: 20px; text-align: center; background: #fff8e6; border: double 6px gold; margin: 20px 0;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 15px;">
            <img src="assets/giphy_maitre.gif" alt="Professeur Baguette" style="height: 80px; border: outset 3px red;" />
            <form action="results.html" method="GET" style="flex: 1;">
                <input type="text" name="q" id="searchInput" style="width: 75%; font-size: 1.3em; padding: 6px; border: outset 3px gold;" placeholder="Nouvelle recherche musicale..." />
                <button type="submit" style="font-size: 1.2em; padding: 6px 18px; background: darkred; color: yellow; font-weight: bold; border: outset 4px gold; cursor: pointer;">Rechercher</button>
            </form>
            <img src="assets/teachers_day.gif" alt="Teachers Day" style="height: 80px; border: outset 3px gold;" />
        </div>
    </div>
"""

res_content = re.sub(r'<div class="search-area".*?</div>\s*</div>', res_search_gif, res_content, flags=re.DOTALL)

# Add embedded gif decorative block inside results area
res_decor_block = """
    <div class="results" id="resultsArea" style="display: block; background: #fff; border: outset 5px #dfdfdf; padding: 20px; margin-top: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: dashed 3px red; padding-bottom: 10px;">
            <img src="assets/point_education.gif" alt="Point Ed" style="height: 70px; border: outset 2px gray;" />
            <span style="font-weight: bold; font-size: 1.3em; color: darkred;">📜 ARCHIVES IMPÉRIALES DES RÉSULTATS DU MAÎTRE 📜</span>
            <img src="assets/maitre_orchestra.gif" alt="Orchestra" style="height: 70px; border: outset 2px gold;" />
        </div>
        <div id="responseText"><p style="font-size: 1.5em; color: blue;">Recherche en cours dans les grimoires mondiaux...</p></div>
    </div>
"""

res_content = re.sub(r'<div class="results" id="resultsArea".*?</div>\s*</div>', res_decor_block, res_content, flags=re.DOTALL)

with open("/home/tronix/julianous/results.html", "w", encoding="utf-8") as f:
    f.write(res_content)

print("Updated results.html with embedded GIFs!")
