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

// Activer la musique au tout premier clic n'importe où sur la page
document.addEventListener('click', function handlePageClickToPlay(e) {
    if (!isPlaying && !e.target.closest('#playBtn')) {
        const audio = getOrInitAudio();
        audio.play().then(() => {
            isPlaying = true;
            updatePlayerUI();
        }).catch(() => {});
    }
});


// --- Images de partitions pour l'arrière-plan et les barres latérales ---
const sheetImages = [
    "https://i.pinimg.com/736x/76/1f/40/761f402fd60d48a1d0441f1a7653661c.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/DwtkII-as-dur-fuga.jpg/500px-DwtkII-as-dur-fuga.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bach_-_Cello_Suite_1_-_Prelude.jpg/400px-Bach_-_Cello_Suite_1_-_Prelude.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Beethoven_Moonlight_1st_movement.jpg/400px-Beethoven_Moonlight_1st_movement.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Chopin_Prelude_No._4.jpg/400px-Chopin_Prelude_No._4.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mozart_Requiem_Lacrimosa.jpg/400px-Mozart_Requiem_Lacrimosa.jpg"
];

// --- Éparpillement statique chaotique au début ---
function scatterImages() {
    // Ajout d'images de partitions aléatoires
    for(let i=0; i<15; i++) {
        let img = document.createElement('img');
        img.src = sheetImages[Math.floor(Math.random() * sheetImages.length)];
        img.style.position = 'absolute';
        img.style.left = (Math.random() * 90) + 'vw';
        img.style.top = (Math.random() * 300) + 'vh'; // Éparpillé sur la page
        img.style.width = (Math.random() * 200 + 50) + 'px';
        img.style.opacity = '0.1';
        img.style.zIndex = '50';
        img.style.transform = `rotate(${Math.random() * 360}deg)`;
        img.style.pointerEvents = 'none';
        document.body.appendChild(img);
    }
    
    // Ajout massif de petites notes de musique statiques
    const symbols = ['🎵', '🎶', '🎼', '🎻', '🎹'];
    for(let i=0; i<60; i++) {
        let note = document.createElement('div');
        note.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        note.style.position = 'absolute';
        note.style.left = (Math.random() * 95) + 'vw';
        note.style.top = (Math.random() * 300) + 'vh';
        note.style.fontSize = (Math.random() * 5 + 1) + 'em';
        note.style.opacity = '0.15';
        note.style.zIndex = '50';
        note.style.transform = `rotate(${Math.random() * 360}deg)`;
        note.style.pointerEvents = 'none';
        document.body.appendChild(note);
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
            <button class="side-pub-btn" onclick="alert('Téléchargement de la partition en cours... Préparez vos violons !');">⚡ VOIR LA PARTITION ⚡</button>
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
            <button class="side-pub-btn" onclick="alert('Vous avez débloqué le chef d\\'œuvre baroque de Julianous !');">🎵 ACHETER PARTITION 🎵</button>
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

// --- Publicités Rétro Enrichies (Vidéos, Images, Pop-ups Virus Anti-Art & Cours Julianous) ---
function createRetroAds() {
    // 1. Bandeau défilant supérieur rétro
    if (!document.querySelector('.marquee-ad-bar')) {
        const marqueeBar = document.createElement('div');
        marqueeBar.className = 'marquee-ad-bar';
        marqueeBar.innerHTML = `
            <marquee behavior="scroll" direction="left" scrollamount="6">
                🚨 ALERTE OFFRE SPÉCIALE 1998 🚨 : -90% SUR TOUTES LES LEÇONS DE CONTREPOINT DE MAÎTRE JULIANOUS ! ★ GAGNEZ UN CLAVECIN EN BOIS DU XVIIe SIÈCLE EN TÉLÉCHARGEANT NOTRE SONNERIE POLYPHONIQUE MOZART (ENVOYEZ "MOZART" AU 81000) ★ C'EST INTOLÉRABLE DE MANQUER CELA ! ★
            </marquee>
        `;
        document.body.appendChild(marqueeBar);
    }

    // 2. LA FENÊTRE POP-UP DU VIRUS ANTI-ART (Format iframe YouTube standard exact)
    const virusPopup = document.createElement('div');
    virusPopup.className = 'retro-popup-ad';
    virusPopup.style.top = '100px';
    virusPopup.style.right = '30px';
    virusPopup.style.width = '360px';
    virusPopup.style.border = 'outset 8px red';
    virusPopup.style.zIndex = '100005';
    virusPopup.style.boxShadow = '12px 12px 0px #000';
    virusPopup.innerHTML = `
        <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #ff0000, #800000);">
            <span class="blink" style="color: #ffff00;">⚠️ ALERTE CRITIQUE : VIRUS ANTI-ART ⚠️</span>
            <button class="side-pub-close" onclick="this.closest('.retro-popup-ad').style.display='none'">X</button>
        </div>
        <div class="retro-popup-body" style="background: #000; color: #ff0000; border: inset 3px red;">
            <p style="font-size:13px; font-weight:bold; margin-top:2px; font-family:'Impact', sans-serif; color: #ffff00;" class="blink">
                🚨 ATTENTION ! UN VIRUS ESSAYE DE VOUS ATTAQUER ET DÉRANGE L'ART ! 🚨
            </p>
            <div style="position:relative; width:100%; height:180px; border: outset 4px red; background: black;">
                <iframe width="100%" height="180" src="https://www.youtube.com/embed/coNzTMQ0DFA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="background: black;"></iframe>
            </div>
            <p style="font-size:11px; margin: 6px 0; color:#00ffff; font-family: monospace;">Attaque détectée ! Un virus de médiocrité dérange la musique classique !</p>
            <button style="background: #ff0000; color: #ffff00; font-weight: bold; border: outset 4px gold; font-size: 13px; cursor: pointer; width: 100%; padding: 6px; text-transform: uppercase;" onclick="alert('Le Maître a neutralisé le virus anti-art !'); this.closest('.retro-popup-ad').style.display='none';">🔴 ÉLIMINER LE VIRUS PAR LE CONTREPOINT 🔴</button>
        </div>
    `;
    document.body.appendChild(virusPopup);

    // 3. Pop-up Rétro : COURS MAGISTRAUX DE JULIANOUS (-90% avec vidéo de cours)
    const coursePopup = document.createElement('div');
    coursePopup.className = 'retro-popup-ad';
    coursePopup.style.bottom = '20px';
    coursePopup.style.left = '200px';
    coursePopup.style.width = '320px';
    coursePopup.style.border = 'outset 6px gold';
    coursePopup.style.zIndex = '100004';
    coursePopup.innerHTML = `
        <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #000080, #008000);">
            <span>🎓 COURS EXCLUSIFS PAR JULIANOUS 🎓</span>
            <button class="side-pub-close" onclick="this.closest('.retro-popup-ad').style.display='none'">X</button>
        </div>
        <div class="retro-popup-body" style="background: #ffffcc;">
            <div class="blink" style="color:red; font-weight:bold; font-size:13px; margin-bottom:5px;">🎓 PROMO SOLFÈGE & HARMONIE EXPRESS 🎓</div>
            <video width="100%" height="160" controls autoplay muted loop style="border: inset 3px gold; background: black;">
                <source src="assets/course_video.mp4" type="video/mp4">
            </video>
            <p style="font-size:11px; font-weight:bold; color:#000080; margin: 5px 0;">Apprenez la fugue et le clavecin sous la menace du Maître ! -90% de réduction immédiate !</p>
            <button style="background: #00ff00; color: #000; font-weight: bold; border: outset 4px green; font-size: 13px; cursor: pointer; width: 100%; padding: 6px;" onclick="alert('Inscription enregistrée ! Vos leçons de clavecin commencent à 5h du matin !');">▶ REJOINDRE LE COURS DU MAÎTRE ◀</button>
        </div>
    `;
    document.body.appendChild(coursePopup);

    // 4. Pop-up rétro image "Vous êtes le 1 000 000ème visiteur"
    const visitorAdPopup = document.createElement('div');
    visitorAdPopup.className = 'retro-popup-ad';
    visitorAdPopup.style.top = '220px';
    visitorAdPopup.style.left = '180px';
    visitorAdPopup.style.width = '260px';
    visitorAdPopup.style.zIndex = '100003';
    visitorAdPopup.innerHTML = `
        <div class="retro-popup-titlebar" style="background: linear-gradient(90deg, #ff0000, #ff00ff);">
            <span>🎉 FELICITATIONS VISITEUR #1 000 000 🎉</span>
            <button class="side-pub-close" onclick="this.closest('.retro-popup-ad').style.display='none'">X</button>
        </div>
        <div class="retro-popup-body" style="background: #ffffcc;">
            <img src="assets/giphy_maitre.gif" alt="Gagnant" style="width: 90px; height: 90px; border: outset 3px gold; margin-bottom: 5px;">
            <p style="color: #ff0000; font-weight: bold; font-size: 12px;" class="blink">VOUS AVEZ GAGNÉ UN CLAVECIN GRATUIT !</p>
            <button style="background: #00ff00; color: #000; font-weight: bold; border: outset 4px green; font-size: 12px; cursor: pointer; width: 100%; padding: 5px;" onclick="this.innerText='RÉCLAMATION EN COURS...'; setTimeout(()=>alert('Félicitations ! Le clavecin sera livré par calèche d\\'ici 6 à 8 semaines.'), 500);">👉 RANGER VOTRE CLAVECIN 👈</button>
        </div>
    `;
    document.body.appendChild(visitorAdPopup);
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

    // Bannières de partitions latérales fixes : présentes sur l'index et les autres pages, masquées sur la recherche pour garder la recherche propre
    if (!isSearchPage) {
        try { createSidebars(); } catch(e) {}
    }

    // SUR L'INDEX SEULEMENT : BOURRÉ DE PUBS, POP-UPS VIRUS, BLOB OPERA ET BANNERS !
    if (isIndexPage) {
        try { scatterBadges(); } catch(e) {}
        try { createRetroAds(); } catch(e) {}
        try { addBlobOperaIframe(); } catch(e) {}
        try { createGlobalFloatingGifs(); } catch(e) {}
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
    
    // Injecter les morales dynamiques
    setTimeout(injectMoralBoxes, 1000);
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
    
    if(!input || input.trim() === "") {
        responseText.innerHTML = "<p style='color:red; font-size:1.5em; font-weight:bold;'>Fichtre ! Vous omettez de remplir le formulaire !</p>";
        return;
    }

    try {
        // API Wikipedia: srlimit=20 pour avoir 2x plus de résultats et sroffset pour la pagination
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
            
            // Fausses publicités façon spam des années 90 avec exercices et vidéos
            const fakeAds = [
                { 
                    title: "🎉 FÉLICITATIONS ! VOUS ÊTES LE 100 000ème ÉLÈVE ! 🎉", 
                    text: "Gagnez un Minitel couleur en calculant immédiatement la dérivée seconde de f(x) = arctan(e^(x^2)) de tête. Dépêchez-vous, cette offre expire dans 3 minutes !" 
                },
                { 
                    title: "🔥 PERDEZ DE L'IGNORANCE EN 7 JOURS ! 🔥", 
                    text: "Notre méthode miracle: conjuguez le verbe 'choir' au subjonctif plus-que-parfait tous les matins. Cliquez ici pour révéler le secret jalousement gardé !" 
                },
                { 
                    title: "⚠️ ALERTE VIRUS D'INCULTURE ⚠️", 
                    text: "Votre ordinateur a détecté de la musique commerciale ! Démontrez le théorème de Fermat pour désinfecter votre disque dur sur-le-champ." 
                },
                { 
                    title: "💰 AUGMENTEZ VOTRE QI DE 500 POINTS 💰", 
                    text: "Traduisez 'L'étudiant incompétent sera foudroyé' en araméen ancien pour accéder au compte bancaire secret de Beethoven !" 
                },
                {
                    title: "🎥 AUDITION CATASTROPHIQUE 🎥",
                    text: "Observez cette abomination musicale et souffrez avec moi !",
                    video: "assets/audition1.mp4"
                },
                {
                    title: "🎥 LE SUPPLICE DE L'ÉLITE 🎥",
                    text: "Regardez ceci et méditez sur votre propre médiocrité crasse.",
                    video: "assets/audition2.mp4"
                },
                {
                    title: "🎥 L'HORREUR VISUELLE ET AUDITIVE 🎥",
                    text: "Analysez cette vidéo et faites une dissertation de 40 pages pour demain matin.",
                    video: "assets/audition3.mp4"
                },
                {
                    title: "🎥 SOUILLURE EN TRÈS BASSE RÉSOLUTION 🎥",
                    text: "Même avec si peu de pixels, votre médiocrité crève les yeux.",
                    video: "assets/audition4.mp4"
                }
            ];

            searchResults.forEach((result, index) => {
                const wikiUrl = `https://fr.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;

                htmlContent += `
                    <div class="wiki-result" style="margin-bottom: 20px; border: outset 4px #dfdfdf; background: #ffffe6; padding: 15px; text-align: left;">
                        <img src="https://commons.wikimedia.org/wiki/Special:FilePath/A1_music_note.gif" alt="Note" style="height: 40px; float: left; margin-right: 15px;">
                        <a href="${wikiUrl}" target="_blank" style="color: #ff0000; font-size: 1.4em; font-family: 'Times New Roman', serif; text-decoration: none; font-weight: bold;">📚 ${result.title} 🎵</a>
                        <div style="color: #000080; font-size: 1em; margin-bottom: 5px; font-weight: bold;">JulianousID: ${Math.floor(Math.random()*10000)} - Pertinence Académique: 100%</div>
                        <div class="snippet" style="color: #000; font-size: 1.1em; font-family: 'Comic Sans MS', cursive;">${result.snippet}...</div>
                        <div style="clear: both;"></div>
                    </div>
                `;
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
        responseText.innerHTML = "<p><em>Erreur technique. Le professeur va être furieux !</em></p>";
    }
}

function handleEnter(event) {
    if (event.key === "Enter") {
        performSearch();
    }
}

// --- Popup Modal ---
function showExerciseModal() {
    document.getElementById("exerciseModal").style.display = "block";
}

function checkModalAnswer() {
    const ans = document.getElementById("modalAnswer").value;
    if(ans === "84") {
        document.getElementById("modalResponse").innerHTML = "Excellent ! Retournez étudier.";
        setTimeout(() => {
            document.getElementById("exerciseModal").style.display = "none";
            document.getElementById("modalResponse").innerHTML = "";
            document.getElementById("modalAnswer").value = "";
        }, 1500);
    } else {
        document.getElementById("modalResponse").innerHTML = "Faux ! Mozart est mort à 35 ans. (14x7/2 + 35 = 84).";
    }
}

function skipModalExercise() {
    document.getElementById("modalResponse").innerHTML = "<span style='color:orange;'>Vous avez séché le contrôle ! Scandaleux, mais vous passez...</span>";
    setTimeout(() => {
        document.getElementById("exerciseModal").style.display = "none";
        document.getElementById("modalResponse").innerHTML = "";
        document.getElementById("modalAnswer").value = "";
    }, 2000);
}
