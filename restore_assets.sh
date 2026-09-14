#!/bin/bash
cd /home/tronix/julianous/assets

echo "Downloading Music..."
/home/tronix/yt-dlp -x --audio-format vorbis --audio-quality 6 -o "Dies_irae.%(ext)s" "https://www.youtube.com/watch?v=RKjuGAoyYEA"
/home/tronix/yt-dlp -x --audio-format vorbis --audio-quality 6 -o "Mozart_Symphony_40.%(ext)s" "https://www.youtube.com/watch?v=JTc1mDieQI8"
/home/tronix/yt-dlp -x --audio-format vorbis --audio-quality 6 -o "Mozart_Nachtmusik.%(ext)s" "https://www.youtube.com/watch?v=nPbxTrPfc1c"
/home/tronix/yt-dlp -x --audio-format vorbis --audio-quality 6 -o "Veni_Creator.%(ext)s" "https://www.youtube.com/watch?v=9jJqPjFv_rQ"

echo "Downloading and compressing Audition 5..."
/home/tronix/yt-dlp -f 'worstvideo[ext=mp4]+worstaudio[ext=m4a]/worst' -o "audition5_raw.mp4" "https://www.youtube.com/watch?v=Sz87Cc5ah2A"
ffmpeg -y -i "audition5_raw.mp4" -c:v libx264 -b:v 15k -r 5 -vf scale=160:-2 -c:a aac -b:a 64k "audition5.mp4"
rm -f audition5_raw.mp4
