#!/bin/bash
cd /home/tronix
wget -qO yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
chmod a+rx yt-dlp

cd /home/tronix/julianous/assets

# Téléchargement au format mp4, limité en résolution si besoin, mais 'best[ext=mp4]' est souvent assez léger pour de courtes vidéos.
/home/tronix/yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' --merge-output-format mp4 -o "audition1.%(ext)s" "https://www.youtube.com/watch?v=gm3a25BdFpo"

/home/tronix/yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' --merge-output-format mp4 -o "audition2.%(ext)s" "https://www.youtube.com/watch?v=_c0LVeAnLRY"

/home/tronix/yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' --merge-output-format mp4 -o "audition3.%(ext)s" "https://www.youtube.com/watch?v=cMD5YrbB2tM"

echo "YOUTUBE VIDEOS DOWNLOADED"
