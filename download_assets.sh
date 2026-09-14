#!/bin/bash
mkdir -p /home/tronix/julianous/assets
cd /home/tronix/julianous/assets

# Neocities
wget -qO bg_stars.gif "https://anlucas.neocities.org/bg_stars.gif"
wget -qO netscap3.gif "https://anlucas.neocities.org/netscap3.gif"
wget -qO ie.gif "https://anlucas.neocities.org/ie.gif"
wget -qO notepad.gif "https://anlucas.neocities.org/notepad.gif"
wget -qO html40.gif "https://anlucas.neocities.org/html40.gif"
wget -qO midi.gif "https://anlucas.neocities.org/midi.gif"
wget -qO java.gif "https://anlucas.neocities.org/java.gif"
wget -qO email.gif "https://anlucas.neocities.org/email.gif"
wget -qO underconstruction.gif "https://anlucas.neocities.org/underconstruction.gif"
wget -qO counter.gif "https://anlucas.neocities.org/counter.gif"
wget -qO flames.gif "https://anlucas.neocities.org/flames.gif"

# Wikimedia
wget -qO A1_music_note.gif "https://commons.wikimedia.org/wiki/Special:FilePath/A1_music_note.gif"
wget -qO Dies_irae.ogg "https://upload.wikimedia.org/wikipedia/commons/e/ea/Dies_irae.ogg"
wget -qO Mozart_Symphony_40.ogg "https://upload.wikimedia.org/wikipedia/commons/e/e5/Mozart_-_Symphony_No._40_in_G_minor%2C_K._550_-_I._Molto_allegro.ogg"
wget -qO Mozart_Nachtmusik.ogg "https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg"
wget -qO Veni_Creator.ogg "https://upload.wikimedia.org/wikipedia/commons/2/23/Choral_-_Veni_Creator_Spiritus.ogg"
wget -qO Mozart_Requiem.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mozart_Requiem_Lacrimosa.jpg/400px-Mozart_Requiem_Lacrimosa.jpg"
wget -qO Bach_Cello.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bach_-_Cello_Suite_1_-_Prelude.jpg/400px-Bach_-_Cello_Suite_1_-_Prelude.jpg"
wget -qO Beethoven_Moonlight.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Beethoven_Moonlight_1st_movement.jpg/400px-Beethoven_Moonlight_1st_movement.jpg"
wget -qO Chopin_Prelude.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Chopin_Prelude_No._4.jpg/400px-Chopin_Prelude_No._4.jpg"
wget -qO Bach_Fuga.jpg "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/DwtkII-as-dur-fuga.jpg/500px-DwtkII-as-dur-fuga.jpg"

# Pinterest / Giphy
wget -qO art.jpg "https://i.pinimg.com/736x/76/1f/40/761f402fd60d48a1d0441f1a7653661c.jpg"
wget -qO giphy_maitre.gif "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif"

# Copy local downloads
cp "/home/tronix/Downloads/Point Education GIF by Lights.gif" /home/tronix/julianous/assets/point_education.gif
cp "/home/tronix/Downloads/Teachers Day School GIF by Sesame Street.gif" /home/tronix/julianous/assets/teachers_day.gif

echo "Assets downloaded successfully!"
