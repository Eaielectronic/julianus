// --- Lecteur audio avec de vraies œuvres de Mozart et de Chœurs ---
const audioTracks = [
    {
        title: "Petite Musique de Nuit - Mozart",
        url: "assets/Mozart_Nachtmusik.ogg"
    },
    {
        title: "Chœur Grégorien - Dies Irae",
        url: "assets/Dies_irae.ogg"
    },
    {
        title: "Chœur - Veni Creator Spiritus",
        url: "assets/Veni_Creator.ogg"
    }
];

let currentAudio = null;
let isPlaying = false;
let currentTrackIndex = 0;

function getOrInitAudio() {
    if (!currentAudio) {
        currentAudio = new Audio();
        currentAudio.src = audioTracks[currentTrackIndex].url;
        currentAudio.loop = true;
        currentAudio.volume = 0.7;
    }
    return currentAudio;
}

function updatePlayerUI() {
    const playBtn = document.getElementById("playBtn");
    const trackDisplay = document.querySelector(".audio-player div");
    const trackName = audioTracks[currentTrackIndex].title;
    
    if (playBtn) {
        playBtn.innerText = isPlaying ? "⏸ PAUSE MOZART" : "▶ DÉLECTER MES TYMPANS DE MOZART";
        playBtn.style.backgroundColor = isPlaying ? "#00ff00" : "#ffff00";
    }
    if (trackDisplay) {
        trackDisplay.innerHTML = `Œuvre diffusée : <br><strong style="font-size:1.1em; color:${isPlaying ? '#000080' : '#800000'};">${trackName} ${isPlaying ? '🎶 (En lecture)' : '⏸ (En pause - Cliquez pour lancer !)'}</strong>`;
    }
}

function toggleAudio() {
    const audio = getOrInitAudio();
    if (audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            updatePlayerUI();
        }).catch(err => {
            console.log("Lecture audio bloquée par le navigateur:", err);
            isPlaying = false;
            updatePlayerUI();
        });
    } else {
        audio.pause();
        isPlaying = false;
        updatePlayerUI();
    }
}

function initRobustAudio() {
    const audio = getOrInitAudio();
    if (audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            updatePlayerUI();
        }).catch(() => {
            isPlaying = false;
            updatePlayerUI();
        });
    }
}

function playPodcast() {
    const podcastAudio = document.getElementById("podcastAudio");
    if (podcastAudio) {
        podcastAudio.volume = 1.0;
        podcastAudio.muted = false;
        if (podcastAudio.paused) {
            podcastAudio.play().then(() => {
                alert("🎙️ LE PODCAST MAGISTRAL MOLIÈRE EST EN LECTURE À MAX VOLUME ! 🎶");
            }).catch(err => {
                console.log("Erreur lecture podcast:", err);
                podcastAudio.muted = true;
                podcastAudio.play().catch(() => {});
            });
        } else {
            podcastAudio.pause();
        }
    }
}

function playAllVideosSimultaneously() {
    const videos = document.querySelectorAll('video, .all-ad-video');
    videos.forEach(vid => {
        vid.volume = 1.0;
        vid.muted = false;
        const p = vid.play();
        if (p !== undefined) {
            p.catch(() => {
                vid.muted = true;
                vid.play().catch(() => {});
            });
        }
    });

    const podcastAudio = document.getElementById('podcastAudio');
    if (podcastAudio) {
        podcastAudio.volume = 1.0;
        podcastAudio.muted = false;
        podcastAudio.play().catch(() => {});
    }

    if (!isPlaying) {
        const audio = getOrInitAudio();
        audio.play().then(() => {
            isPlaying = true;
            updatePlayerUI();
        }).catch(() => {});
    }
}

// Activer toutes les vidéos et toutes les musiques en simultané dès qu'on clique n'importe où
document.addEventListener('click', function handlePageClickToPlay(e) {
    playAllVideosSimultaneously();
});


// --- Images de partitions pour l'arrière-plan (réduites : presque pas d'image) ---
const sheetImages = [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/DwtkII-as-dur-fuga.jpg/500px-DwtkII-as-dur-fuga.jpg"
];

// --- Éparpillement statique (très peu d'images pour ne pas gêner les pavés de texte) ---
function scatterImages() {
    for(let i=0; i<3; i++) {
        let img = document.createElement('img');
        img.src = sheetImages[0];
        img.style.position = 'absolute';
        img.style.left = (Math.random() * 90) + 'vw';
        img.style.top = (Math.random() * 300) + 'vh';
        img.style.width = '100px';
        img.style.opacity = '0.05';
        img.style.zIndex = '50';
        img.style.transform = `rotate(${Math.random() * 360}deg)`;
        img.style.pointerEvents = 'none';
        document.body.appendChild(img);
    }
}

// --- Éparpillement statique des morales de Julianous ---
function scatterMorals() {
    const morals = [
        "L'oisiveté est mère de tous les vices !",
        "Redressez-vous sur votre chaise !",
        "La Fontaine en alexandrins, vite !",
        "Le savoir n'attend pas les cancres !",
        "Fichtre ! Étudiez vos gammes !",
        "Mozart à 5 ans composait déjà. Et vous ?",
        "Où sont vos déclinaisons latines ?",
        "C'est intolérable de médiocrité !",
        "Le silence est d'or, la symphonie est divine !",
        "Révisez le théorème de Pythagore !"
    ];
    for (let i = 0; i < 20; i++) {
        let div = document.createElement('div');
        div.innerText = morals[Math.floor(Math.random() * morals.length)];
        div.style.position = 'absolute';
        div.style.left = (Math.random() * 80) + 'vw';
        div.style.top = (Math.random() * 300) + 'vh';
        div.style.color = ['red', 'blue', 'green', 'purple', '#800000'][Math.floor(Math.random() * 5)];
        div.style.fontFamily = "'Comic Sans MS', 'Times New Roman', serif";
        div.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
        div.style.fontWeight = 'bold';
        div.style.opacity = '0.15';
        div.style.zIndex = '50';
        div.style.transform = `rotate(${(Math.random() - 0.5) * 60}deg)`;
        div.style.pointerEvents = 'none';
        document.body.appendChild(div);
    }
}


// --- Notes flottantes (Animation Chaotique) ---
function createFloatingNotes() {
    const symbols = ['🎵', '🎶', '🎼'];
    for(let i=0; i<8; i++) {
        let note = document.createElement('div');
        note.className = 'floating-note';
        note.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        note.style.left = Math.random() * 100 + 'vw';
        note.style.top = Math.random() * 100 + 'vh';
        
        // Vitesse aléatoire pour un effet "saute partout"
        note.dx = (Math.random() - 0.5) * 12;
        note.dy = (Math.random() - 0.5) * 12;
        
        document.body.appendChild(note);
        animateNote(note);
    }
}

function animateNote(note) {
    let x = parseFloat(note.style.left);
    let y = parseFloat(note.style.top);
    
    function step() {
        x += note.dx;
        y += note.dy;
        // Rebond sur les bords
        if(x < 0 || x > window.innerWidth - 40) note.dx *= -1;
        if(y < 0 || y > window.innerHeight - 40) note.dy *= -1;
        note.style.left = x + 'px';
        note.style.top = y + 'px';
        requestAnimationFrame(step);
    }
    step();
}

window.addEventListener('DOMContentLoaded', () => {
    scatterImages();
    scatterMorals();
    createFloatingNotes();
});


// --- Boutons et badges Web 1.0 bas-pixels (GeoCities) ---
function scatterBadges() {
    const badges = [
        "https://anlucas.neocities.org/netscap3.gif",
        "https://anlucas.neocities.org/ie.gif",
        "https://anlucas.neocities.org/notepad.gif",
        "https://anlucas.neocities.org/html40.gif",
        "https://anlucas.neocities.org/midi.gif",
        "https://anlucas.neocities.org/java.gif",
        "https://anlucas.neocities.org/email.gif",
        "https://anlucas.neocities.org/underconstruction.gif",
        "https://anlucas.neocities.org/counter.gif"
    ];
    for (let i = 0; i < 60; i++) {
        let img = document.createElement('img');
        img.src = badges[Math.floor(Math.random() * badges.length)];
        img.style.position = 'absolute';
        img.style.left = (Math.random() * 95) + 'vw';
        img.style.top = (Math.random() * 300) + 'vh';
        img.style.opacity = '0.2';
        img.style.zIndex = '50';
        img.style.pointerEvents = 'none';
        document.body.appendChild(img);
    }
}

// --- Explosion de pop-ups rétro rigolotes pour les partitions avec POSITIONS ALÉATOIRES + PODCAST + ANTI-ART ---
function triggerPartitionPopupExplosion() {
    const funnyPopups = [
        {
            title: "🎻 LEÇON DE CONTREPOINT EN VIDÉO 🎻",
            bg: "#ffcccc",
            border: "red",
            width: "340px",
            content: `
                <h4 style="color:red; margin:5px 0;" class="blink">🎉 COURS DE SOLFÈGE EXCLUSIF ! 🎉</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">Démonstration vidéo du contrepoint rigoureux :</p>
                <video width="100%" height="160" controls loop autoplay muted style="border:inset 3px red; background:black;">
                    <source src="assets/audition1.mp4" type="video/mp4">
                </video>
            `
        },
        {
            title: "🕺 LE PROFESSEUR EN ACTION 🕺",
            bg: "#e6ffe6",
            border: "green",
            width: "330px",
            content: `
                <h4 style="color:green; margin:5px 0;" class="blink">🎓 CADENCE MUSICALE PARFAITE 🎓</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">Le Maître démontre le rythme de la fugue :</p>
                <img src="assets/dancing_teacher.gif" style="width:100%; border:outset 3px green; margin-top:5px;">
            `
        },
        {
            title: "📜 DÉCRET SOLENNEL DE MOZART 📜",
            bg: "#ffffcc",
            border: "darkred",
            width: "320px",
            content: `
                <h4 style="color:darkred; margin:5px 0;">📜 AVIS DE LA DIRECTION 📜</h4>
                <p style="font-size:13px; font-weight:bold; color:#000; line-height:1.4;">« Tout élève surpris à réviser sans chanter ses déclinaisons latines sera consigné 4h ce samedi matin ! »</p>
                <button style="background:darkred; color:yellow; font-weight:bold; border:outset 3px gold; width:100%; padding:8px; cursor:pointer;" onclick="this.closest('.retro-popup-ad').style.display='none'">MÉDITER CE DÉCRET</button>
            `
        },
        {
            title: "🎙️ SPONSOR PODCAST MOLIÈRE 🎙️",
            bg: "#ffe6ff",
            border: "magenta",
            width: "350px",
            content: `
                <h4 style="color:purple; margin:5px 0;" class="blink">🎧 LE PODCAST DU MAÎTRE JULIANOUS 🎧</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">Écoutez l'analyse impitoyable de la Symphonie N°40 en Ut mineur !</p>
                <audio controls autoplay loop style="width:100%; margin-top:8px;">
                    <source src="assets/Mozart_Nachtmusik.ogg" type="audio/ogg">
                </audio>
            `
        },
        {
            title: "🎼 CHEF D'ORCHESTRE IMPÉRIAL 🎼",
            bg: "#e6f2ff",
            border: "blue",
            width: "330px",
            content: `
                <h4 style="color:blue; margin:5px 0;" class="blink">🎶 DIRECTION D'ORCHESTRE 🎶</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">Observez la précision de la baguette baroque :</p>
                <img src="assets/conducting_van_cliburn.gif" style="width:100%; border:outset 3px blue; margin-top:5px;">
            `
        },
        {
            title: "⚠️ ALERTE VIRUS HARMONIQUE ⚠️",
            bg: "#000000",
            border: "red",
            width: "350px",
            content: `
                <h4 style="color:yellow; margin:5px 0;" class="blink">🚨 DÉFENSE DE L'ART BAROQUE 🚨</h4>
                <p style="font-size:12px; font-weight:bold; color:#00ff00;">Interdiction stricte des quintes parallèles en vidéo :</p>
                <video width="100%" height="160" controls loop autoplay muted style="border:outset 3px red; background:black;">
                    <source src="assets/virus_art.mp4" type="video/mp4">
                </video>
            `
        },
        {
            title: "📚 RECLAME : GAFFIOT VINTAGE -90% 📚",
            bg: "#fff0f0",
            border: "red",
            width: "320px",
            content: `
                <h4 style="color:red; margin:5px 0;">📚 DICTIONNAIRE GAFFIOT 1895 📚</h4>
                <p style="font-size:12px; font-weight:bold; color:#000; line-height:1.4;">Recevez 1 RÈGLE EN FER DE 50CM OFFERTE pour corriger les fautes de déclinaisons latines !</p>
                <button style="background:red; color:white; font-weight:bold; border:outset 3px black; width:100%; padding:8px; cursor:pointer;" onclick="this.closest('.retro-popup-ad').style.display='none'">COMMANDER LA RÈGLE</button>
            `
        },
        {
            title: "🎭 BALLET D'OPÉRA BAROQUE 🎭",
            bg: "#fff0ff",
            border: "purple",
            width: "330px",
            content: `
                <h4 style="color:purple; margin:5px 0;">💃 DANCE OPERA VINTAGE 💃</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">L'élégance de la danse sous Louis XIV :</p>
                <img src="assets/dance_opera.gif" style="width:100%; border:outset 3px purple; margin-top:5px;">
            `
        },
        {
            title: "⚡ TÉLÉCHARGEMENT MINITEL 56K ⚡",
            bg: "#ffffcc",
            border: "gold",
            width: "310px",
            content: `
                <p style="font-size:12px; font-weight:bold; color:blue;">Téléchargement de la partition en cours...</p>
                <div style="background:black; color:lime; font-family:monospace; padding:10px; border:inset 3px gray; font-size:12px; margin-top:5px;">
                    [████████████░░░░] 68% - Clavecin_Du_Maitre.midi
                </div>
                <p style="font-size:11px; color:red; margin-top:5px; font-weight:bold;">Ne coupez pas votre ligne téléphonique !</p>
            `
        },
        {
            title: "🎺 FANFARE ET SOLFÈGE 🎺",
            bg: "#e6ffff",
            border: "cyan",
            width: "330px",
            content: `
                <h4 style="color:darkblue; margin:5px 0;">🎶 LA FANFARE ACADÉMIQUE 🎶</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">Ensemble instrumental en pleine répétition :</p>
                <img src="assets/sesame_street_band.gif" style="width:100%; border:outset 3px cyan; margin-top:5px;">
            `
        },
        {
            title: "🏆 DIPLÔME DU PREMIER DE CLASSE 🏆",
            bg: "#e6ffe6",
            border: "green",
            width: "320px",
            content: `
                <h4 style="color:green; margin:5px 0;">🥇 PALME ACADÉMIQUE 🥇</h4>
                <p style="font-size:13px; font-weight:bold; color:#000; line-height:1.4;">Le Professeur Julianous vous décerne la Palme Académique du Solfège Vivant pour votre assiduité !</p>
                <button style="background:gold; color:black; font-weight:bold; border:outset 3px green; width:100%; padding:8px; cursor:pointer;" onclick="this.closest('.retro-popup-ad').style.display='none'">RECEVOIR LE DIPLÔME</button>
            `
        },
        {
            title: "🎓 PROMO COURS EXCLUSIFS 🎓",
            bg: "#ffffcc",
            border: "gold",
            width: "340px",
            content: `
                <h4 style="color:darkred; margin:5px 0;" class="blink">🎓 LEÇONS SOUS LA MENACE DU MAÎTRE 🎓</h4>
                <p style="font-size:12px; font-weight:bold; color:#000;">Promo exclusive -90% en vidéo :</p>
                <video width="100%" height="160" controls loop autoplay muted style="border:inset 3px gold; background:black;">
                    <source src="assets/course_video.mp4" type="video/mp4">
                </video>
            `
        }
    ];

    funnyPopups.forEach((popData, index) => {
        setTimeout(() => {
            // CALCUL DE COORDONNÉES ÉCRAN TOTALEMENT ALEATOIRES PARTOUT SUR L'ÉCRAN
            const randomTop = Math.floor(Math.random() * (window.innerHeight - 280)) + 30 + 'px';
            const randomLeft = Math.floor(Math.random() * (window.innerWidth - 380)) + 20 + 'px';

            const popDiv = document.createElement('div');
            popDiv.className = 'retro-popup-ad';
            popDiv.style.cssText = `position: fixed; top: ${randomTop}; left: ${randomLeft}; width: ${popData.width}; background: ${popData.bg}; border: outset 6px ${popData.border}; z-index: ${100020 + index}; box-shadow: 10px 10px 0px #000; transform: none !important; border-radius: 0px !important;`;
            popDiv.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, ${popData.border}, #000); color: white; cursor: move;">
                    <span>${popData.title}</span>
                    <button class="side-pub-close" onclick="this.closest('.retro-popup-ad').style.display='none'">X</button>
                </div>
                <div class="retro-popup-body" style="background: ${popData.bg}; padding: 10px;">
                    ${popData.content}
                </div>
            `;
            document.body.appendChild(popDiv);
        }, index * 160);
    });
}

// --- Les deux partitions de musique interchangeables fixes sur les côtés (Style Pub) ---
function createSidebars() {
    const userSheets = [
        "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/DwtkII-as-dur-fuga.jpg/330px-DwtkII-as-dur-fuga.jpg?utm_source=fr.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "https://img.pixers.pics/pho_wat(s3:700/FO/34/16/16/16/700_FO34161616_6faab85e99d30390f4ec34cb89cfb59b.jpg,543,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,323,650,jpg)/stickers-vieille-partition-de-musique.jpg.jpg"
    ];

    // Bannière Gauche
    const leftBanner = document.createElement('div');
    leftBanner.className = 'side-pub-banner side-pub-left';
    leftBanner.innerHTML = `
        <div class="side-pub-header">
            <span>🔥 PUB PARTITION 🔥</span>
            <button class="side-pub-close" onclick="this.closest('.side-pub-banner').style.display='none'">X</button>
        </div>
        <div class="side-pub-img-container">
            <img id="sideImgLeft" class="side-pub-img" src="${userSheets[0]}" alt="Partition Sponsorisée 1">
            <div class="side-pub-badge">-90% RECLAME</div>
        </div>
        <div class="side-pub-footer">
            <button class="side-pub-btn" onclick="triggerPartitionPopupExplosion()">⚡ VOIR LA PARTITION ⚡</button>
        </div>
    `;

    // Bannière Droite
    const rightBanner = document.createElement('div');
    rightBanner.className = 'side-pub-banner side-pub-right';
    rightBanner.innerHTML = `
        <div class="side-pub-header">
            <span>🎼 SPONSOR D'ÉPOQUE 🎼</span>
            <button class="side-pub-close" onclick="this.closest('.side-pub-banner').style.display='none'">X</button>
        </div>
        <div class="side-pub-img-container">
            <img id="sideImgRight" class="side-pub-img" src="${userSheets[1]}" alt="Partition Sponsorisée 2">
            <div class="side-pub-badge">100% SOLFÈGE</div>
        </div>
        <div class="side-pub-footer">
            <button class="side-pub-btn" onclick="triggerPartitionPopupExplosion()">🎵 ACHETER PARTITION 🎵</button>
        </div>
    `;

    document.body.appendChild(leftBanner);
    document.body.appendChild(rightBanner);

    // Permutation automatique des deux images toutes les 3 secondes ("sa changer entre les deux images")
    let isFlipped = false;
    setInterval(() => {
        const imgL = document.getElementById('sideImgLeft');
        const imgR = document.getElementById('sideImgRight');
        if (imgL && imgR) {
            imgL.style.opacity = '0.2';
            imgR.style.opacity = '0.2';
            setTimeout(() => {
                isFlipped = !isFlipped;
                imgL.src = isFlipped ? userSheets[1] : userSheets[0];
                imgR.src = isFlipped ? userSheets[0] : userSheets[1];
                imgL.style.opacity = '1';
                imgR.style.opacity = '1';
            }, 300);
        }
    }, 3000);
}

// --- Masquage sans couper le son des vidéos ---
function hideAdKeepPlaying(btn) {
    const popup = btn.closest('.retro-popup-ad');
    if (popup) {
        popup.style.display = 'none'; // Se masque visuellement mais la vidéo et le son continuent en arrière-plan !
    }
}

// --- Configuration du son au démarrage de chaque vidéo ---
function setupVideoSoundOnStart() {
    const videos = document.querySelectorAll('video');
    videos.forEach(vid => {
        vid.addEventListener('play', () => {
            vid.muted = false;
            vid.volume = 1.0;
        });
        if (vid.paused) {
            vid.muted = true;
        } else {
            vid.muted = false;
            vid.volume = 1.0;
        }
    });
}

// Pool de publicités rétro fixes (sans animation de déplacement/bougeotte)
const retroAdPool = [
    {
        id: 'mozartAd',
        isVideo: true,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'top: 75px; left: 30px; width: 360px; border: outset 8px gold; z-index: 100008; box-shadow: 10px 10px 0px #000; position: fixed; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #ff0000, #ffff00); color: #000;">
                    <span class="blink" style="color: #ff0000; font-weight: bold;">🎻 PUB MOZART 2 MIN 🎻</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #000; color: #ffff00; border: inset 4px red;">
                    <p style="font-size:13px; font-weight:bold; margin-top:2px; font-family:'Impact', sans-serif; color: #00ff00;" class="blink">
                        🔊 MOZART (2 MIN) - LE SON S'ACTIVE AU LANCEMENT ! 🔊
                    </p>
                    <video class="ad-popup-video" width="100%" height="180" controls loop style="border: outset 4px gold; background: black;">
                        <source src="assets/mozart_pub.mp4" type="video/mp4">
                    </video>
                </div>
            `;
            return div;
        }
    },
    {
        id: 'courseAd',
        isVideo: true,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'bottom: 30px; left: 200px; width: 340px; border: outset 6px gold; z-index: 100004; box-shadow: 10px 10px 0px #000; position: fixed; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #000080, #008000);">
                    <span>🎓 COURS EXCLUSIFS PAR JULIANOUS 🎓</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #ffffcc;">
                    <div class="blink" style="color:red; font-weight:bold; font-size:13px; margin-bottom:5px;">🎓 PROMO SOLFÈGE EXPRESS 🎓</div>
                    <video class="ad-popup-video" width="100%" height="160" controls loop style="border: inset 3px gold; background: black;">
                        <source src="assets/course_video.mp4" type="video/mp4">
                    </video>
                </div>
            `;
            return div;
        }
    },
    {
        id: 'virusAd',
        isVideo: true,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'top: 110px; right: 30px; width: 360px; border: outset 8px red; z-index: 100005; box-shadow: 10px 10px 0px #000; position: fixed; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #ff0000, #800000);">
                    <span class="blink" style="color: #ffff00;">⚠️ ALERTE CRITIQUE : VIRUS ANTI-ART ⚠️</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #000; color: #ff0000; border: inset 3px red;">
                    <p style="font-size:13px; font-weight:bold; margin-top:2px; font-family:'Impact', sans-serif; color: #ffff00;" class="blink">
                        🚨 ATTENTION ! UN VIRUS DÉRANGE L'ART ! 🚨
                    </p>
                    <video class="ad-popup-video" width="100%" height="170" controls loop style="border: outset 4px red; background: black;">
                        <source src="assets/virus_art.mp4" type="video/mp4">
                    </video>
                </div>
            `;
            return div;
        }
    },
    {
        id: 'podcastAd',
        isVideo: false,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'top: 180px; left: 140px; width: 350px; border: outset 8px magenta; z-index: 100010; box-shadow: 10px 10px 0px #000; position: fixed; background: #ffe6ff; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #800080, #ff00ff); color: #fff;">
                    <span class="blink" style="color: #ffff00; font-weight: bold;">🎙️ PUB PODCAST MOLIÈRE 🎙️</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #ffe6ff; color: #000; border: inset 4px purple;">
                    <h4 style="color:purple; margin:5px 0;" class="blink">🎧 LE PODCAST DU MAÎTRE JULIANOUS 🎧</h4>
                    <p style="font-size:12px; font-weight:bold; color:#000;">Analyse impitoyable de la Symphonie N°40 en Ut mineur et tirades de Molière !</p>
                    <audio controls autoplay loop style="width:100%; margin-top:5px;">
                        <source src="assets/Mozart_Nachtmusik.ogg" type="audio/ogg">
                    </audio>
                </div>
            `;
            return div;
        }
    },
    {
        id: 'dancingTeacherAd',
        isVideo: false,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'bottom: 80px; right: 120px; width: 330px; border: outset 8px green; z-index: 100012; box-shadow: 10px 10px 0px #000; position: fixed; background: #e6ffe6; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #008000, #00ff00); color: #000;">
                    <span class="blink" style="color: #000080; font-weight: bold;">🕺 DANSE DU SOLFÈGE 🕺</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #e6ffe6; color: #000; border: inset 4px green;">
                    <h4 style="color:green; margin:5px 0;">🎓 LE PROFESSEUR EN CADENCE 🎓</h4>
                    <img src="assets/dancing_teacher.gif" style="width:100%; border:outset 3px green;">
                </div>
            `;
            return div;
        }
    },
    {
        id: 'cliburnAd',
        isVideo: false,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'top: 220px; left: 280px; width: 340px; border: outset 8px blue; z-index: 100014; box-shadow: 10px 10px 0px #000; position: fixed; background: #e6f2ff; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #000080, #00ffff); color: #fff;">
                    <span class="blink" style="color: #ffff00; font-weight: bold;">🎼 DIRECTION D'ORCHESTRE 🎼</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #e6f2ff; color: #000; border: inset 4px blue;">
                    <h4 style="color:blue; margin:5px 0;">🎶 LA BAGUETTE DU MAÎTRE 🎶</h4>
                    <img src="assets/conducting_van_cliburn.gif" style="width:100%; border:outset 3px blue;">
                </div>
            `;
            return div;
        }
    },
    {
        id: 'gaffiotTextAd',
        isVideo: false,
        create: () => {
            const div = document.createElement('div');
            div.className = 'retro-popup-ad';
            div.style.cssText = 'top: 250px; left: 220px; width: 310px; z-index: 100003; box-shadow: 10px 10px 0px #000; position: fixed; background: #fff0f0; border: outset 6px red; transform: none !important; border-radius: 0px !important;';
            div.innerHTML = `
                <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #ff0000, #800000); color: #fff;">
                    <span>📚 RECLAME : GAFFIOT 1895 📚</span>
                    <button class="side-pub-close" onclick="hideAdKeepPlaying(this)">X</button>
                </div>
                <div class="retro-popup-body" style="background: #fff0f0;">
                    <h4 style="color:red; margin:5px 0;">📚 DICTIONNAIRE GAFFIOT 📚</h4>
                    <p style="color: #000; font-weight: bold; font-size: 12px; line-height:1.4;">Commandez le dictionnaire des déclinaisons latines et recevez 1 règle en fer de 50cm offerte !</p>
                    <button style="background: #ff0000; color: #fff; font-weight: bold; border: outset 3px black; font-size: 12px; cursor: pointer; width: 100%; padding: 6px;" onclick="this.closest('.retro-popup-ad').style.display='none'">COMMANDER LA RÈGLE</button>
                </div>
            `;
            return div;
        }
    }
];

// --- Application dynamique des Formes Bancales sur les éléments de page (PAS SUR LES PUBS) ---
function makeEverythingBancale() {
    const selectors = [
        '.container',
        '.nav-menu',
        '.widget',
        '.wiki-result',
        '.audio-player',
        'table',
        'fieldset',
        'form',
        '.game-card',
        '.moral-box',
        '.cookie-banner',
        '.modal-content',
        '.decl-box',
        '.insult-box',
        'blockquote',
        '.side-pub-img-container'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach((el, index) => {
        // Angles aléatoires bien bancals (-3.5deg à +3.5deg)
        const angle = ((Math.random() - 0.5) * 7).toFixed(1);
        const skewX = ((Math.random() - 0.5) * 3).toFixed(1);
        const skewY = ((Math.random() - 0.5) * 3).toFixed(1);

        // Rayons de bordure totalement assymétriques
        const r1 = Math.floor(Math.random() * 30 + 5);
        const r2 = Math.floor(Math.random() * 30 + 5);
        const r3 = Math.floor(Math.random() * 30 + 5);
        const r4 = Math.floor(Math.random() * 30 + 5);
        const r5 = Math.floor(Math.random() * 30 + 5);
        const r6 = Math.floor(Math.random() * 30 + 5);
        const r7 = Math.floor(Math.random() * 30 + 5);
        const r8 = Math.floor(Math.random() * 30 + 5);

        el.style.transform = `rotate(${angle}deg) skew(${skewX}deg, ${skewY}deg)`;
        el.style.borderRadius = `${r1}px ${r2}px ${r3}px ${r4}px / ${r5}px ${r6}px ${r7}px ${r8}px`;
    });
}

// --- Publicités Rétro Alignées aux exigences exactes ---
function createRetroAds() {
    const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isSearchPage = pageName === 'results.html';
    const isIndexPage = pageName === 'index.html' || pageName === '' || pageName === 'julianous';

    if (isSearchPage) return; // 0 pub sur la recherche

    // 1. Bandeau défilant supérieur rétro
    if (!document.querySelector('.marquee-ad-bar')) {
        const marqueeBar = document.createElement('div');
        marqueeBar.className = 'marquee-ad-bar';
        marqueeBar.innerHTML = `
            <marquee behavior="scroll" direction="left" scrollamount="6">
                🚨 ALERTE OFFRE SPÉCIALE 1998 🚨 : -90% SUR TOUTES LES LEÇONS DE CONTREPOINT DE MAÎTRE JULIANOUS ! ★ GAGNEZ UN CLAVECIN EN BOIS DU XVIIe SIÈCLE ! ★
            </marquee>
        `;
        document.body.appendChild(marqueeBar);
    }

    const videoAds = retroAdPool.filter(a => a.isVideo);
    const nonVideoAds = retroAdPool.filter(a => !a.isVideo);
    let selectedAds = [];

    if (isIndexPage) {
        // Max 2-3 pubs sur l'index, dont AU MOINS UNE PUB VIDÉO + PODCAST / ANTI-ART
        const firstVideoAd = videoAds[Math.floor(Math.random() * videoAds.length)];
        selectedAds.push(firstVideoAd);

        const remainingPool = retroAdPool.filter(a => a.id !== firstVideoAd.id);
        const secondAd = remainingPool[Math.floor(Math.random() * remainingPool.length)];
        selectedAds.push(secondAd);

        // Pub additionnelle Podcast ou Anti-art
        if (nonVideoAds.length > 0) {
            const thirdAd = nonVideoAds[Math.floor(Math.random() * nonVideoAds.length)];
            if (!selectedAds.includes(thirdAd)) {
                selectedAds.push(thirdAd);
            }
        }
    } else {
        // 1 pub vidéo + parfois 1 pub podcast/anti-art sur les autres pages
        const randomVideoAd = videoAds[Math.floor(Math.random() * videoAds.length)];
        selectedAds.push(randomVideoAd);
        if (Math.random() > 0.4 && nonVideoAds.length > 0) {
            const extraAd = nonVideoAds[Math.floor(Math.random() * nonVideoAds.length)];
            selectedAds.push(extraAd);
        }
    }

    // Instancier les pubs sélectionnées (sans bouger, position fixe et bancale)
    selectedAds.forEach(ad => {
        const popupElement = ad.create();
        document.body.appendChild(popupElement);
    });

    // Attacher les gestionnaires de son au lancement de vidéo
    setTimeout(() => {
        setupVideoSoundOnStart();
        const popupVideos = document.querySelectorAll('.retro-popup-ad video');
        popupVideos.forEach(vid => {
            vid.play().catch(() => {});
        });
        const pName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (['jeux.html', 'chatiments.html', 'auditions.html', 'latin.html'].includes(pName)) {
            makeEverythingBancale();
        }
    }, 300);
}




function setupSequentialAdVideos() {
    const videos = Array.from(document.querySelectorAll('.fake-ad-video'));
    if (videos.length === 0) return;

    videos.forEach((video, index) => {
        video.autoplay = false;
        video.muted = false;
        video.controls = true;
        video.preload = "auto";
        video.onended = () => {
            const nextVideo = videos[(index + 1) % videos.length];
            nextVideo.currentTime = 0;
            const playPromise = nextVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        };
    });

    const firstPlayPromise = videos[0].play();
    if (firstPlayPromise !== undefined) {
        firstPlayPromise.catch(() => {});
    }
}

// --- Petite Iframe Blob Opera ---
function addBlobOperaIframe() {
    const iframeDiv = document.createElement('div');
    iframeDiv.style = "position:fixed; bottom:20px; left:20px; z-index:9000; border: outset 5px red; width: 320px; height: 220px; background: yellow; text-align:center; box-shadow: 5px 5px 15px black;";
    iframeDiv.innerHTML = `
        <div class="blink" style="font-size:14px; font-weight:bold; color:red; padding:4px; font-family:'Comic Sans MS';">Un petit opera</div>
        <iframe width="100%" height="180" src="https://www.youtube.com/embed/JkWx38odFw0?si=g97f0_O-UhC1pzCC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="background:black;"></iframe>
    `;
    document.body.appendChild(iframeDiv);
}

// --- Petits encadrés de morale pompeuse injectés partout ---
function injectMoralBoxes() {
    const morals = [
        "« L’ignorant affirme, le savant doute, le sage réfléchit. Et vous, vous vous contentez de cliquer bêtement ! »",
        "« Un peu de science éloigne de l'Art, mais beaucoup y ramène. Malheureusement, vous n'êtes même pas au point de départ. »",
        "« La culture, c'est comme la confiture, moins on en a, plus on l'étale. Veuillez cesser de tacher mon domaine numérique avec votre vacuité. »",
        "« Il vaut mieux se taire et passer pour un inculte que de taper sur son clavier et de ne laisser aucun doute sur le sujet. Prenez-en de la graine ! »",
        "« L'oisiveté est mère de tous les vices, mais elle accouche surtout d'une syntaxe déplorable. »",
        "« Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que vous êtes désespérément apathiques que je désespère ! »",
        "« Rien n'est plus dangereux qu'une idée quand on n'a qu'une idée. Je crains pour ma part que votre esprit ne soit d'un vide abyssal. »"
    ];
    
    const targets = document.querySelectorAll('.container h2, .container p, .widget, .wiki-result, .search-area');
    if (targets.length === 0) return;

    let injections = Math.min(targets.length, 5); // Maximum 5 encadrés par page

    for (let i = 0; i < injections; i++) {
        const target = targets[Math.floor(Math.random() * targets.length)];
        const box = document.createElement('div');
        box.style = "margin: 25px 0; padding: 15px; border: double 6px #000080; background: #e6e6fa; color: #4b0082; font-family: 'Times New Roman', serif; font-size: 1.2em; font-style: italic; text-align: justify; box-shadow: 4px 4px 8px gray; position: relative; z-index: 20;";
        box.innerHTML = `<strong style="font-size:1.2em; display:block; margin-bottom:5px; color: #800000; text-transform: uppercase;">📌 Note du Professeur :</strong> ${morals[Math.floor(Math.random() * morals.length)]}`;
        
        if (target.nextSibling) {
            target.parentNode.insertBefore(box, target.nextSibling);
        } else {
            target.parentNode.appendChild(box);
        }
    }
}

// --- GIFs flottants globaux dans les coins ---
function createGlobalFloatingGifs() {
    const leftGif = document.createElement('img');
    leftGif.src = "assets/point_education.gif";
    leftGif.style = "position:fixed; top:10px; left:10px; width:180px; z-index:9999; border: outset 4px gold; pointer-events:none; box-shadow: 5px 5px 15px black;";
    
    const rightGif = document.createElement('img');
    rightGif.src = "assets/teachers_day.gif";
    rightGif.style = "position:fixed; top:10px; right:10px; width:180px; z-index:9999; border: outset 4px gold; pointer-events:none; box-shadow: -5px 5px 15px black;";
    
    document.body.appendChild(leftGif);
    document.body.appendChild(rightGif);
}

window.addEventListener('DOMContentLoaded', () => {
    const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isSearchPage = pageName === 'results.html';
    const isIndexPage = pageName === 'index.html' || pageName === '' || pageName === 'julianous';

    try { scatterImages(); } catch(e) {}
    try { scatterMorals(); } catch(e) {}
    try { createFloatingNotes(); } catch(e) {}
    try { createGlobalFloatingGifs(); } catch(e) {}

    // Bannières de partitions latérales fixes
    if (!isSearchPage) {
        try { createSidebars(); } catch(e) {}
    }

    // EXÉCUTER LES PUBS RÉTRO ET VIDÉOS SUR TOUS LES FICHIERS HTML !
    if (!isSearchPage) {
        try { createRetroAds(); } catch(e) {}
    }

    // Éléments spécifiques à l'index
    if (isIndexPage) {
        try { scatterBadges(); } catch(e) {}
        try { addBlobOperaIframe(); } catch(e) {}
    }
    
    // Autoplay aléatoire sur la page auditions
    const auditionVideos = document.querySelectorAll('.audition-video');
    if (auditionVideos.length > 0) {
        const randomVid = auditionVideos[Math.floor(Math.random() * auditionVideos.length)];
        randomVid.autoplay = true;
        const playPromise = randomVid.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.log("L'autoplay a été bloqué par le navigateur.", error));
        }
    }
    
    const bancalePages = ['jeux.html', 'chatiments.html', 'auditions.html', 'latin.html'];
    const isBancalePage = bancalePages.includes(pageName);

    if (isBancalePage) {
        document.body.classList.add('bancale-enabled');
    }

    // Injecter les morales dynamiques et appliquer les formes bancales uniquement sur les 4 pages spécifiées
    setTimeout(() => {
        injectMoralBoxes();
        if (isBancalePage) {
            try { makeEverythingBancale(); } catch(e) {}
        }
    }, 1000);

    if (isBancalePage) {
        try { makeEverythingBancale(); } catch(e) {}
    }
});

// --- Cookies Banner avec VRAI HTML ---
function acceptCookies() {
    document.getElementById("cookieBanner").style.display = "none";
    if(!isPlaying) toggleAudio();
}

function showCookieExercise() {
    document.getElementById("cookieBanner").style.display = "none";
    document.getElementById("cookieExercisePanel").style.display = "block";
}

function checkCookieAnswer() {
    const rep = document.getElementById("cookieAnswerInput").value;
    // 5 * 8 = 40 + Mozart Symphonie 40 = 80
    if(rep === "80") {
        document.getElementById("cookieExercisePanel").innerHTML = "<h3>Brillant ! Vous êtes exempté de cookies.</h3>";
        setTimeout(() => {
            document.getElementById("cookieExercisePanel").style.display = "none";
            // Restore HTML structure for next time
            document.getElementById("cookieExercisePanel").innerHTML = `
                <h3>Résolvez cette énigme pour échapper aux cookies !</h3>
                <p style="font-size: 1.3em;">5 x 8 + le numéro de la célèbre symphonie de Mozart en Sol mineur = ?</p>
                <input type="text" id="cookieAnswerInput" style="font-size:1.5em; width: 100px; text-align: center;">
                <button onclick="checkCookieAnswer()" style="background:#ff0000; color:white; font-size:1.2em; padding: 10px; border: outset 3px white;">Vérifier au tableau</button>
                <button onclick="skipCookieExercise()" style="background:#000; color:white; font-size:1.2em; padding: 10px; border: outset 3px white; margin-left: 10px;">Sécher le cours</button>
            `;
        }, 2000);
    } else {
        document.getElementById("cookieExercisePanel").innerHTML = "<h3 style='color:yellow; text-shadow: 2px 2px red;'>Faux cancrelat ! Les cookies vous sont imposés et Mozart aussi !</h3>";
        if(!isPlaying) toggleAudio();
        setTimeout(() => {
            document.getElementById("cookieExercisePanel").style.display = "none";
            // Restore HTML structure for next time
            document.getElementById("cookieExercisePanel").innerHTML = `
                <h3>Résolvez cette énigme pour échapper aux cookies !</h3>
                <p style="font-size: 1.3em;">5 x 8 + le numéro de la célèbre symphonie de Mozart en Sol mineur = ?</p>
                <input type="text" id="cookieAnswerInput" style="font-size:1.5em; width: 100px; text-align: center;">
                <button onclick="checkCookieAnswer()" style="background:#ff0000; color:white; font-size:1.2em; padding: 10px; border: outset 3px white;">Vérifier au tableau</button>
                <button onclick="skipCookieExercise()" style="background:#000; color:white; font-size:1.2em; padding: 10px; border: outset 3px white; margin-left: 10px;">Sécher le cours</button>
            `;
        }, 2500);
    }
}

function skipCookieExercise() {
    document.getElementById("cookieExercisePanel").innerHTML = "<h3 style='color:orange;'>Vous avez séché le cours ! C'est intolérable, mais vous passez... pour cette fois.</h3>";
    setTimeout(() => {
        document.getElementById("cookieExercisePanel").style.display = "none";
        // Restore HTML structure for next time
        document.getElementById("cookieExercisePanel").innerHTML = `
            <h3>Résolvez cette énigme pour échapper aux cookies !</h3>
            <p style="font-size: 1.3em;">5 x 8 + le numéro de la célèbre symphonie de Mozart en Sol mineur = ?</p>
            <input type="text" id="cookieAnswerInput" style="font-size:1.5em; width: 100px; text-align: center;">
            <button onclick="checkCookieAnswer()" style="background:#ff0000; color:white; font-size:1.2em; padding: 10px; border: outset 3px white;">Vérifier au tableau</button>
            <button onclick="skipCookieExercise()" style="background:#000; color:white; font-size:1.2em; padding: 10px; border: outset 3px white; margin-left: 10px;">Sécher le cours</button>
        `;
    }, 2500);
}

// --- Système de Recherche avec API Wikipedia ---
async function performSearch(input, offset = 0) {
    const responseText = document.getElementById("responseText");
    if (!responseText) return;

    if (!input || typeof input !== 'string' || input.trim() === "") {
        const searchInput = document.getElementById("searchInput");
        if (searchInput && searchInput.value && searchInput.value.trim() !== "") {
            input = searchInput.value.trim();
        } else {
            responseText.innerHTML = "<p style='color:red; font-size:1.5em; font-weight:bold; text-align:center;'>Fichtre ! Vous omettez de remplir le formulaire !</p>";
            return;
        }
    }

    try {
        const enhancedInput = input; 
        const url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(enhancedInput)}&utf8=&format=json&srlimit=20&sroffset=${offset}&origin=*`;
        
        const response = await fetch(url);
        const data = await response.json();

        let htmlContent = `
            <div style="background: yellow; border: dashed 4px red; padding: 10px; margin-bottom: 20px; text-align: center;">
                <h2 class="blink" style="color:red;">L'INTERMÈDE LYRIQUE DU MAÎTRE !</h2>
                <p style="font-family: 'Times New Roman', serif; font-size: 1.2em; font-style: italic;">Mon très cher élève, avant d'abreuver votre esprit de la plèbe intellectuelle, je vous enjoins formellement à parfaire votre oreille musicale sur cet instrument divin.</p>
                <a href="https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw?hl=en&cp=e30" target="_blank">
                    <button style="font-size: 1.5em; background: #00ff00; border-radius: 20px; cursor: pointer; border: outset 5px #00cc00; font-family: 'Times New Roman', serif; font-weight: bold; box-shadow: none;">🎶 COMPOSER VOTRE OPÉRA MAGISTRAL 🎶</button>
                </a>
            </div>
            
            <p style="font-size: 1.3em; font-family: 'Times New Roman', serif;"><strong>Voici les fruits de l'érudition du divin moteur Julianous pour la noble requête (« ${input} ») :</strong></p>
        `;

        if (!data.query || data.query.search.length === 0) {
            htmlContent += "<p style='font-size: 1.2em; color: red;'>Le moteur n'a trouvé aucune once de savoir correspondant à vos divagations. Ouvrez un dictionnaire, fichtre !</p>";
        } else {
            const searchResults = data.query.search;
            
            // Publicités intercalées : GIFs, Vidéos réelles, et Textes Rétro 90s
            const inlineSearchAds = [
                {
                    type: 'gif',
                    gif: 'assets/dancing_teacher.gif',
                    title: '🎓 COURS PARTICULIERS DE RIGUEUR ET DE CLAVECIN 🎓',
                    text: 'Le Maître esquisse une danse de célébration pour les élèves qui révisent 6 heures par jour !',
                    badge: 'RÉCLAME 100% PÉDAGOGIQUE'
                },
                {
                    type: 'video',
                    video: 'assets/course_video.mp4',
                    title: '🎥 EXTRAIT EN DIRECT DE LA CLASSE DE JULIANOUS 🎥',
                    text: 'Observez cette démonstration Magistrale et prenez immédiatement des notes sur votre cahier !',
                    badge: 'SÉQUENCE VIDÉO EXCLUSIVE'
                },
                {
                    type: 'text',
                    title: '⚡ SPONSOR EXCLUSIF : DICTIONNAIRE LATIN DE 1842 ⚡',
                    text: 'Conjuguez 500 verbes par jour et obtenez l\'absolution du Maître au prochain contrôle impérial !',
                    badge: 'OFFRE RARE & IMPÉRIALE'
                },
                {
                    type: 'gif',
                    gif: 'assets/sesame_street_band.gif',
                    title: '🎺 RECRUTEMENT DE FANFARE ÉTUDIANTE 🎺',
                    text: 'Pour les cancres repentis, une répétition générale sous haute surveillance rythmique !',
                    badge: 'PAUSE FANFARE'
                },
                {
                    type: 'video',
                    video: 'assets/audition1.mp4',
                    title: '🎥 ARCHIVE D\'AUDITION MAJEURE EN HISTOIRE DE LA MUSIQUE 🎥',
                    text: 'Découvrez ce que donne un travail acharné sans aucune mollesse intellectuelle !',
                    badge: 'ARCHIVE VIDÉO RÉELLE'
                },
                {
                    type: 'gif',
                    gif: 'assets/dance_opera.gif',
                    title: '🎭 OPÉRA EN SÉRIE : BALLET DU MAÎTRE 🎭',
                    text: 'Aucune faute de solfège n\'est tolérée au sein du grand corps de ballet !',
                    badge: 'BALLET SPONSORED'
                },
                {
                    type: 'text',
                    title: '💰 GAGNEZ UN DIAPASON D\'OR MASSIF 18 CARATS ! 💰',
                    text: 'Résolvez l\'énigme du Requiem de Mozart en envoyant la réponse par Minitel au 3615 JULIANOUS !',
                    badge: 'CONCOURS DE L\'ÉLITE'
                },
                {
                    type: 'video',
                    video: 'assets/virus_art.mp4',
                    title: '🎥 DOCUMENTAIRE CHOC : L\'EFFET DU CLAVECIN SUR LE CERVEAU 🎥',
                    text: 'La preuve vidéo que la musique baroque guérit de l\'ignorance crasse !',
                    badge: 'DOCUMENTAIRE CHOC'
                },
                {
                    type: 'gif',
                    gif: 'assets/conducting_van_cliburn.gif',
                    title: '🎼 MAESTRO EN ACTION : SYMPHONIE ACADÉMIQUE 🎼',
                    text: 'Admirez la précision du geste sous la direction magistrale du virtuose !',
                    badge: 'MAESTRO VIVANT'
                },
                {
                    type: 'video',
                    video: 'assets/mozart_pub.mp4',
                    title: '🎥 GRAND OPUS MOZART EN VIDEO HAUTE DÉFINITION 🎥',
                    text: 'Contemplez cette œuvre sacrée qui devrait résonner en vous nuit et jour.',
                    badge: 'VRAIE VIDÉO MOZART'
                }
            ];

            let adIndex = 0;

            searchResults.forEach((result, index) => {
                const wikiUrl = `https://fr.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;

                htmlContent += `
                    <div class="wiki-result" style="margin-bottom: 20px; border: outset 4px #dfdfdf; background: #ffffe6; padding: 15px; text-align: left;">
                        <img src="assets/A1_music_note.gif" alt="Note" style="height: 40px; float: left; margin-right: 15px;">
                        <a href="${wikiUrl}" target="_blank" style="color: #ff0000; font-size: 1.4em; font-family: 'Times New Roman', serif; text-decoration: none; font-weight: bold;">📚 ${result.title} 🎵</a>
                        <div style="color: #000080; font-size: 1em; margin-bottom: 5px; font-weight: bold;">JulianousID: ${Math.floor(Math.random()*10000)} - Pertinence Académique: 100%</div>
                        <div class="snippet" style="color: #000; font-size: 1.1em; font-family: 'Comic Sans MS', cursive;">${result.snippet}...</div>
                        <div style="clear: both;"></div>
                    </div>
                `;

                // Insérer une pub toutes les 2 réponses de recherche
                if ((index + 1) % 2 === 0) {
                    const ad = inlineSearchAds[adIndex % inlineSearchAds.length];
                    adIndex++;

                    let adMediaHTML = '';
                    if (ad.type === 'gif') {
                        adMediaHTML = `
                            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin: 10px 0; flex-wrap: wrap;">
                                <img src="${ad.gif}" style="max-height: 95px; border: outset 3px gold; border-radius: 4px;" alt="Pub GIF">
                                <p style="font-size: 1.05em; color: #333; font-style: italic; margin: 0; text-align: left; max-width: 420px; font-family: 'Times New Roman', serif;">${ad.text}</p>
                            </div>
                        `;
                    } else if (ad.type === 'video') {
                        adMediaHTML = `
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; margin: 10px 0;">
                                <video class="fake-ad-video all-ad-video" src="${ad.video}" controls style="max-width: 300px; max-height: 170px; border: outset 4px #000; background: #000;"></video>
                                <p style="font-size: 1em; color: #333; font-style: italic; margin: 0; text-align: center; max-width: 480px; font-family: 'Times New Roman', serif;">${ad.text}</p>
                            </div>
                        `;
                    } else {
                        adMediaHTML = `
                            <p style="font-size: 1.15em; color: #000080; font-weight: bold; margin: 10px 0; font-family: 'Comic Sans MS', cursive; text-align: center;">${ad.text}</p>
                        `;
                    }

                    htmlContent += `
                        <div class="search-inline-ad" style="margin: 20px 0; border: dashed 4px #ff0000; background: #fff0f5; padding: 15px; text-align: center; border-radius: 6px; box-shadow: 3px 3px 10px rgba(0,0,0,0.2);">
                            <div style="font-size: 0.85em; font-weight: bold; color: white; background: red; display: inline-block; padding: 3px 10px; margin-bottom: 6px; text-transform: uppercase;">
                                ${ad.badge}
                            </div>
                            <h4 style="color: #990000; margin: 5px 0; font-size: 1.3em; font-family: 'Times New Roman', serif;" class="blink">${ad.title}</h4>
                            ${adMediaHTML}
                            <div style="margin-top: 8px;">
                                <a href="etudes.html" style="background: #ffff00; color: #cc0000; font-weight: bold; border: outset 3px red; padding: 5px 15px; text-decoration: none; display: inline-block; font-size: 0.95em; font-family: 'Times New Roman', serif;">⚡ ACCÉDER À CETTE RECOMMANDATION IMPÉRIALE ⚡</a>
                            </div>
                        </div>
                    `;
                }
            });
            
            // Pagination
            if (data.continue && data.continue.sroffset) {
                const nextOffset = data.continue.sroffset;
                htmlContent += `
                    <div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">
                        <a href="results.html?q=${encodeURIComponent(input)}&offset=${nextOffset}" style="font-size: 1.8em; background: #ffff00; padding: 15px 30px; border: outset 8px #ff0000; text-decoration: none; color: #ff0000; font-weight: bold; font-family: 'Times New Roman', serif; display: inline-block; text-transform: uppercase;" class="blink">🌟 AFFICHER LA PAGE SUIVANTE 🌟</a>
                    </div>
                `;
            }
        }
        
        // Pavé moral aléatoire à la fin des résultats
        const moralLectures = [
            "Je me dois de vous rappeler, cher cancrelat, que l'oisiveté est mère de tous les vices. Lisez chaque mot de ces archives sous peine de châtiment corporel !",
            "Ma foi, bien que ces informations soient fort instructives, elles ne remplaceront jamais la récitation par cœur des fables de La Fontaine en alexandrins inversés.",
            "Il est de mon devoir d'enseignant suprême de souligner que la qualité de votre lecture est tout bonnement déplorable. Redressez-vous sur votre chaise !",
            "Subsidiairement, n'oubliez point que la connaissance sans l'art de la rhétorique n'est que ruine de l'âme. Méditez cela avant de cliquer ! C'est intolérable !",
            "Certes, vous vous instruisez... Mais avez-vous pensé à réviser vos déclinaisons latines aujourd'hui ? J'en doute fort, espèce de bélître !"
        ];
        const randomLecture = moralLectures[Math.floor(Math.random() * moralLectures.length)];

        htmlContent += `
            <div style="margin-top: 40px; padding: 20px; border: solid 6px #800000; background-color: #ffcccc; font-family: 'Times New Roman', serif; text-align: center;">
                <h3 style="color: #800000; margin-top: 0; font-size: 1.8em; text-transform: uppercase;">Le Pavé Moral de l'Éminent Professeur</h3>
                <p style="font-size: 1.4em; font-style: italic; font-weight: bold;">« ${randomLecture} »</p>
                <p style="text-align: right; margin-bottom: 0;"><em>- Signé : L'Illustre Julianous</em></p>
            </div>
        `;

        responseText.innerHTML = htmlContent;
        setupSequentialAdVideos();

    } catch (error) {
        responseText.innerHTML = "<p style='color:red; text-align:center;'><em>Erreur technique. Le professeur va être furieux !</em></p>";
    }
}

function handleEnter(event) {
    if (event.key === "Enter") {
        performSearch();
    }
}

// --- Popup Modal ---
function showExerciseModal() {
    const modal = document.getElementById("exerciseModal");
    if (modal) modal.style.display = "block";
}

function checkModalAnswer() {
    const ansInput = document.getElementById("modalAnswer");
    const ans = ansInput ? ansInput.value.trim() : "";
    const modalResponse = document.getElementById("modalResponse");
    const q = window.pendingSearchQuery || (document.getElementById("searchInput") ? document.getElementById("searchInput").value : "");
    const offset = window.pendingSearchOffset || 0;

    if(ans === "84") {
        if (modalResponse) modalResponse.innerHTML = "<span style='color:green; font-weight:bold;'>Excellent ! Le Maître valide votre niveau. Lancement automatique de la recherche...</span>";
        setTimeout(() => {
            const modal = document.getElementById("exerciseModal");
            if (modal) modal.style.display = "none";
            if (modalResponse) modalResponse.innerHTML = "";
            if (ansInput) ansInput.value = "";
            if (q) {
                performSearch(q, offset);
            }
        }, 1200);
    } else {
        if (modalResponse) modalResponse.innerHTML = "<span style='color:red;'>Faux ! Mozart est mort à 35 ans (14x7/2 + 35 = 84). Tentez à nouveau ou séchez le cours !</span>";
    }
}

function skipModalExercise() {
    const modalResponse = document.getElementById("modalResponse");
    const q = window.pendingSearchQuery || (document.getElementById("searchInput") ? document.getElementById("searchInput").value : "");
    const offset = window.pendingSearchOffset || 0;

    if (modalResponse) modalResponse.innerHTML = "<span style='color:orange; font-weight:bold;'>Vous avez séché le contrôle ! Scandaleux, mais le Maître lance la recherche tout de même...</span>";
    setTimeout(() => {
        const modal = document.getElementById("exerciseModal");
        if (modal) modal.style.display = "none";
        if (modalResponse) modalResponse.innerHTML = "";
        const ansInput = document.getElementById("modalAnswer");
        if (ansInput) ansInput.value = "";
        if (q) {
            performSearch(q, offset);
        }
    }, 1200);
}
