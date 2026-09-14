#!/bin/bash
cd /home/tronix/julianous/assets

# Vidéo 4 en très faible résolution
/home/tronix/yt-dlp -f 'worstvideo[ext=mp4]+worstaudio[ext=m4a]/worst[ext=mp4]/worst' --merge-output-format mp4 -o "audition4.%(ext)s" "https://www.youtube.com/watch?v=8D8z0MOijCU"

# Vidéo 5 en très faible résolution
/home/tronix/yt-dlp -f 'worstvideo[ext=mp4]+worstaudio[ext=m4a]/worst[ext=mp4]/worst' --merge-output-format mp4 -o "audition5.%(ext)s" "https://www.youtube.com/watch?v=Sz87Cc5ah2A"

echo "NEW VIDEOS DOWNLOADED"
