import os
import glob

directory = "/home/tronix/julianous"
files = glob.glob(os.path.join(directory, "*.html")) + glob.glob(os.path.join(directory, "*.css")) + glob.glob(os.path.join(directory, "*.js"))

replacements = {
    "https://anlucas.neocities.org/bg_stars.gif": "assets/bg_stars.gif",
    "https://anlucas.neocities.org/netscap3.gif": "assets/netscap3.gif",
    "https://anlucas.neocities.org/ie.gif": "assets/ie.gif",
    "https://anlucas.neocities.org/notepad.gif": "assets/notepad.gif",
    "https://anlucas.neocities.org/html40.gif": "assets/html40.gif",
    "https://anlucas.neocities.org/midi.gif": "assets/midi.gif",
    "https://anlucas.neocities.org/java.gif": "assets/java.gif",
    "https://anlucas.neocities.org/email.gif": "assets/email.gif",
    "https://anlucas.neocities.org/underconstruction.gif": "assets/underconstruction.gif",
    "https://anlucas.neocities.org/counter.gif": "assets/counter.gif",
    "https://anlucas.neocities.org/flames.gif": "assets/flames.gif",
    "https://commons.wikimedia.org/wiki/Special:FilePath/A1_music_note.gif": "assets/A1_music_note.gif",
    "https://upload.wikimedia.org/wikipedia/commons/e/ea/Dies_irae.ogg": "assets/Dies_irae.ogg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e5/Mozart_-_Symphony_No._40_in_G_minor%2C_K._550_-_I._Molto_allegro.ogg": "assets/Mozart_Symphony_40.ogg",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg": "assets/Mozart_Nachtmusik.ogg",
    "https://upload.wikimedia.org/wikipedia/commons/2/23/Choral_-_Veni_Creator_Spiritus.ogg": "assets/Veni_Creator.ogg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mozart_Requiem_Lacrimosa.jpg/400px-Mozart_Requiem_Lacrimosa.jpg": "assets/Mozart_Requiem.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bach_-_Cello_Suite_1_-_Prelude.jpg/400px-Bach_-_Cello_Suite_1_-_Prelude.jpg": "assets/Bach_Cello.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Beethoven_Moonlight_1st_movement.jpg/400px-Beethoven_Moonlight_1st_movement.jpg": "assets/Beethoven_Moonlight.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Chopin_Prelude_No._4.jpg/400px-Chopin_Prelude_No._4.jpg": "assets/Chopin_Prelude.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/DwtkII-as-dur-fuga.jpg/500px-DwtkII-as-dur-fuga.jpg": "assets/Bach_Fuga.jpg",
    "https://i.pinimg.com/736x/76/1f/40/761f402fd60d48a1d0441f1a7653661c.jpg": "assets/art.jpg",
    "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif": "assets/giphy_maitre.gif"
}

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    for old, new in replacements.items():
        if old in content:
            content = content.replace(old, new)
            modified = True
            
    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
