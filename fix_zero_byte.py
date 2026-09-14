import os
import urllib.request

files_to_fix = {
    "Dies_irae.ogg": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Dies_irae.ogg",
    "Mozart_Symphony_40.ogg": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Mozart_-_Symphony_No._40_in_G_minor%2C_K._550_-_I._Molto_allegro.ogg",
    "Mozart_Nachtmusik.ogg": "https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg",
    "Veni_Creator.ogg": "https://upload.wikimedia.org/wikipedia/commons/2/23/Choral_-_Veni_Creator_Spiritus.ogg",
    "Mozart_Requiem.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mozart_Requiem_Lacrimosa.jpg/400px-Mozart_Requiem_Lacrimosa.jpg",
    "Bach_Cello.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bach_-_Cello_Suite_1_-_Prelude.jpg/400px-Bach_-_Cello_Suite_1_-_Prelude.jpg",
    "Beethoven_Moonlight.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Beethoven_Moonlight_1st_movement.jpg/400px-Beethoven_Moonlight_1st_movement.jpg",
    "Chopin_Prelude.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Chopin_Prelude_No._4.jpg/400px-Chopin_Prelude_No._4.jpg",
    "bg_stars.gif": "https://anlucas.neocities.org/bg_stars.gif",
    "netscap3.gif": "https://anlucas.neocities.org/netscap3.gif",
    "ie.gif": "https://anlucas.neocities.org/ie.gif",
    "notepad.gif": "https://anlucas.neocities.org/notepad.gif",
    "html40.gif": "https://anlucas.neocities.org/html40.gif",
    "midi.gif": "https://anlucas.neocities.org/midi.gif",
    "underconstruction.gif": "https://anlucas.neocities.org/underconstruction.gif",
    "flames.gif": "https://anlucas.neocities.org/flames.gif",
    "counter.gif": "https://anlucas.neocities.org/counter.gif"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

for name, url in files_to_fix.items():
    path = os.path.join("/home/tronix/julianous/assets", name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print(f"Fixed {name}, size: {len(data)}")
    except Exception as e:
        print(f"Failed {name}: {e}")
