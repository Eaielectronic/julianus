#!/bin/bash
cd /home/tronix/julianous/assets

compress() {
    input=$1
    output=$2
    if [ -f "$input" ]; then
        # On garde un bitrate audio correct (64k AAC) pour la musique, et on sacrifie complètement la vidéo (15k, 5fps, 160p).
        # Total bitrate = ~79kbps. Pour 100 secondes = ~960 Ko (soit moins de 1 Mo).
        ffmpeg -y -i "$input" -c:v libx264 -b:v 15k -r 5 -vf scale=160:-2 -c:a aac -b:a 64k "$output"
        mv "$output" "$input"
    fi
}

compress "audition1.mp4" "tmp1.mp4"
compress "audition2.mp4" "tmp2.mp4"
compress "audition3.mp4" "tmp3.mp4"
compress "audition4.mp4" "tmp4.mp4"

echo "COMPRESSION TERMINEE"
