#!/usr/bin/env python3
import re

file_path = "/home/tronix/julianous/latin.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Auto-Scroll to be 4x faster (1750ms instead of 7000ms)
content = re.sub(
    r'setInterval\(\(\) => \{\s*if \(Math\.random\(\) > 0\.3\) \{',
    'setInterval(() => {\n        if (Math.random() > 0.1) {',
    content
)

content = content.replace("}, 7000);", "}, 1750);")

# 2. Add class="decl-ending" and blinking styles to all declension endings (e.g. ros-a -> ros-<span class="decl-ending">a</span>)
def ending_replacer(match):
    prefix = match.group(1) # e.g. "ros-"
    ending = match.group(2) # e.g. "am"
    return f'{prefix}<span class="decl-ending">{ending}</span>'

# Match pattern like ros-am, domin-orum, etc.
pattern = r'([a-z]+-)([a-z]+)'
content = re.sub(pattern, ending_replacer, content)

# 3. Add CSS and JS for blinking & dynamic morphing endings + extra pompous prose
extra_pompous_html = """
    <!-- GRAND PAVÉ ENCORE PLUS POMPEUX ET SURANÉ DU MAÎTRE JULIANOUS -->
    <div style="border: double 10px #800000; background: #fff0db; padding: 30px; margin: 35px 0; text-align: justify; font-family: 'Times New Roman', serif; box-shadow: 12px 12px 0px #400000;">
        <h2 style="color: darkred; text-align: center; border-bottom: double 5px darkred; padding-bottom: 12px; font-family: 'Impact', sans-serif; font-size: 2.5em; text-transform: uppercase;">
            📜 LE RÉQUISITOIRE PÉDAGOGIQUE ET MAGISTRAL DU MAÎTRE JULIANOUS 📜
        </h2>
        <p style="font-size: 1.35em; line-height: 2.0; color: #000; text-indent: 40px;">
            « Ô insensés qui foulez le sol sacré du conservatoire sans trembler ! Apollon lui-même, descendant du mont Parnasse pour contempler vos lamentables solfèges, en aurait brisé sa lyre d'or contre les rochers d'Inachus ! Comment osez-vous prétendre aborder l'art sublime du contrepoint rigoureux, alors que votre esprit embrumé tâtonne lamentablement entre le nominatif et le dative d'intérêt ? Molière, dans la grandeur de sa comédie française, fustigeait les faux savants et les pédants de cour ; mais face à la vacuité sidérale de votre ignorance solfégique, le plus grand pédant devenait un phare de la civilisation !
        </p>
        <blockquote style="border-left: solid 10px darkred; padding-left: 25px; margin: 25px 0; font-style: italic; background: #ffe6e6; font-size: 1.3em; color: #600000; line-height: 1.9;">
            « Répétez avec moi, bécasses du solfège : <em>Rosa, rosae, rosam, rosae, rosae, rosa !</em> Que chaque terminaison soit gravée dans vos mémoires déficientes à grands coups de férule et de menaces d'excommunication harmonique ! Celui qui osera murmurer une fausse note devant le buste de Mozart sera immédiatement condamné à copier mille fois le traité de composition de Jean-Philippe Rameau en caractères gothiques ! »
        </blockquote>
        <p style="font-size: 1.35em; line-height: 2.0; color: #000; text-indent: 40px;">
            Regardez vos yeux qui s'écarquillent devant les déclinaisons qui s'agitent et clignotent sur cette page ! C'est le châtiment divin de la grammaire latine qui s'empare de votre écran pour punir votre négligence ! Ne détournez pas le regard : la vérité grammaticale exige votre soumission totale ! »
        </p>
    </div>
"""

# Insert extra pompous text right before autoScrollBanner
content = content.replace('<div id="autoScrollBanner"', extra_pompous_html + '\n<div id="autoScrollBanner"')

# Add CSS for decl-ending rainbow blinking
ending_css = """
    /* Clignotement néon des terminaisons latines */
    .decl-ending {
        font-weight: bold;
        display: inline-block;
        padding: 0 2px;
        animation: rainbowBlink 0.6s infinite alternate;
    }
    @keyframes rainbowBlink {
        0% { color: #ff0000; text-shadow: 0 0 8px #ff0000; background: #ffff00; }
        25% { color: #00ff00; text-shadow: 0 0 8px #00ff00; background: #000000; }
        50% { color: #00ffff; text-shadow: 0 0 8px #00ffff; background: #ff00ff; }
        75% { color: #ff00ff; text-shadow: 0 0 8px #ff00ff; background: #000080; }
        100% { color: #ffff00; text-shadow: 0 0 8px #ffff00; background: #800000; }
    }
"""

content = content.replace("/* Effet Glitch & Baladage des déclinaisons */", ending_css + "\n    /* Effet Glitch & Baladage des déclinaisons */")

# Add JS morphEndings to mutate Latin endings text dynamically every 700ms
morph_js = """
        // 5. Clignotement et mutation dynamique permanente des terminaisons latines
        const latinEndingsList = ['a', 'ae', 'am', 'arum', 'is', 'as', 'us', 'i', 'um', 'os', 'orum', 'o', 'e', 'es', 'ium', 'ibus', 'uum', 'ebus', 'ei', 'em', 'res'];
        const endingSpans = document.querySelectorAll('.decl-ending');
        
        setInterval(() => {
            endingSpans.forEach(span => {
                if (Math.random() > 0.4) {
                    const randomEnding = latinEndingsList[Math.floor(Math.random() * latinEndingsList.length)];
                    span.innerText = randomEnding;
                }
            });
        }, 700);
"""

content = content.replace("// 4. Fonction de vérification du Cours de Latin", morph_js + "\n    // 4. Fonction de vérification du Cours de Latin")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("latin.html enhanced with 4x auto-scroll, pompous text, and morphing blinking endings!")
