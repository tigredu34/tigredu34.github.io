$(".center h1").html(name)
$(".center p").html(underName)
$(".center span.server-description").html(desc)
var serverInfo = null
function loading(num){
	let current = parseInt($(".loading-bar p").text(), 10) || 0;
	const step = 1;
	const delay = 700 / Math.abs(num - current);

	const interval = setInterval(function(){
		if (current < num) {
			current += step;
			if (current > num) current = num;
		} else if (current > num) {
			current -= step;
			if (current < num) current = num;
		} else {
			clearInterval(interval);
		}
		$(".loading-bar p").text(current + "%");
	}, delay);
	
	$(".loading-bar .line").width(num + "%");
}

if (showStaffTeam){
	$(".panel.staffteam").show()
	staff_team.forEach(function(user){
		$(".staff_team").append(`
			<div class="staff">
				<div class="info">
					<img src="${user.image}" class="pfp">
					<p>${user.name}</p>
				</div>
				<p class="status">${user.rank}</p>
			</div>
		`)
	})
}

if (showPlayersList){
	$(".panel.playerlist").show()
	players()
}

function players(){
	if (serverCode == "******"){return}
	$.get("https://servers-frontend.fivem.net/api/servers/single/"+serverCode,function(data){
		serverInfo = data.Data
		let nbJoueurs = serverInfo.players.length;
		$(".panel.playerlist h3").text(`Joueurs connectés (${nbJoueurs})`);
		
		serverInfo.players.forEach(function(player){
			$(".player_list").append(`
				<div class="staff">
					<div class="info">
						<img src="${playerProfileImage}" class="pfp">
						<p>${player.name}</p>
					</div>
					<p class="status">${player.id}</p>
				</div>
			`)
		})
	})
}

window.addEventListener('message', function(e) {
    if(e.data.eventName === 'loadProgress') {
    	var num = (e.data.loadFraction * 100).toFixed(0)
        loading(num);
    }
    
    // Démarrer l'audio lorsque FiveM indique que le chargement commence
    if(e.data.eventName === 'startInitFunctionOrder') {
        // S'assurer que l'audio est initialisé dès que possible dans FiveM
        initAudio();
    }
});

const socials = { discord, instagram, youtube, twitter, tiktok, facebook, twitch, github };
const platforms = ["discord", "instagram", "youtube", "twitter", "tiktok", "facebook", "twitch", "github"];

platforms.forEach(platform => {
	if (socials[platform] != "") {
		$(`.${platform}`).show();
		$(`.${platform} a`).attr("href", socials[platform]);
	}
});

$("a").on("click",function(e){
	// Ne pas intercepter les liens avec target="_blank" ou avec onclick défini
	if ($(this).attr('target') === '_blank' || $(this).attr('onclick')) {
		return;
	}
	
	// Pour les autres liens, utiliser invokeNative
	e.preventDefault();
	window.invokeNative('openUrl', e.target.href);
});

if (theme == "orange"){
	$("body").append(`<style>:root{--main:255, 215, 0;}</style>`)
	var bgImage = "assets/img/orange.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(255 215 0 / 10%) 0%, rgba(255, 215, 0, 0.0) 100%)")
}
if (theme == "red"){
	$("body").append(`<style>:root{--main:255,0,0;}</style>`)
	var bgImage = "assets/img/red.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(255 0 0 / 10%) 0%, rgba(255, 0, 0, 0.0) 100%)")
}
if (theme == "blue"){
	$("body").append(`<style>:root{--main:0, 163, 255;}</style>`)
	var bgImage = "assets/img/blue.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(0 163 255 / 10%) 0%, rgba(0, 163, 255, 0.0) 100%)")
}
if (theme == "green"){
	$("body").append(`<style>:root{--main:65, 255, 0;}</style>`)
	var bgImage = "assets/img/green.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(65 255 0 / 10%) 0%, rgba(65, 255, 0, 0.0) 100%)")
}
if (theme == "pink"){
	$("body").append(`<style>:root{--main:255, 122, 237;}</style>`)
	var bgImage = "assets/img/pink.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(255 122 237 / 10%) 0%, rgba(255, 122, 237, 0.0) 100%)")
}
if (theme == "purple"){
	$("body").append(`<style>:root{--main:193, 67, 255;}</style>`)
	var bgImage = "assets/img/purple.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(193 67 255 / 10%) 0%, rgba(193, 67, 255, 0.0) 100%)")
}
if (theme == "gold"){
	$("body").append(`<style>:root{--main:255, 215, 0;}</style>`)
	var bgImage = "assets/img/purple.jpg";
	$(".winter").css("background","linear-gradient(0deg, rgb(255 215 0 / 10%) 0%, rgba(255, 215, 0, 0.0) 100%)")
}

// Créer un élément pour l'arrière-plan flouté et assombri
$("body").prepend('<div id="bg-overlay"></div>');

// Définir directement l'image de fond
$("#bg-overlay").css({
	"background-image": `url('${bgImage}')`,
	"background-position": "center center",
	"background-repeat": "no-repeat",
	"background-size": "cover"
});

// S'assurer que le body n'a pas de background-image pour éviter la duplication
$("body").css("background-image", "none");

// Effet de parallaxe directionnel avec le curseur
let mouseX = 0;
let mouseY = 0;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

// Mettre à jour les coordonnées du centre lors du redimensionnement
$(window).resize(function() {
	centerX = window.innerWidth / 2;
	centerY = window.innerHeight / 2;
});

// Suivre la position du curseur
$(document).mousemove(function(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
	
	// Calculer le déplacement en pourcentage par rapport au centre (réduit pour éviter les bords blancs)
	const moveX = (mouseX - centerX) / centerX * 2; // Max 2% de déplacement
	const moveY = (mouseY - centerY) / centerY * 2;
	
	// Appliquer l'effet parallaxe uniquement à l'image de fond
	$("#bg-overlay").css({
		'transform': `translate(${moveX}%, ${moveY}%)`
	});
	
	// Mettre à jour la position du curseur personnalisé
	$('.custom-cursor').css({
		'left': mouseX + 'px',
		'top': mouseY + 'px'
	});
});

// Afficher le curseur personnalisé
function showCursor() {
	$('.custom-cursor').show();
}

// Masquer le curseur personnalisé  
function hideCursor() {
	$('.custom-cursor').hide();
}

// Gestion du curseur personnalisé
$(document).ready(function() {
	showCursor();
	
	// Effet hover sur les éléments interactifs
	$('button, a, input[type="range"], .song-item').hover(
		function() {
			$('.custom-cursor').addClass('hover');
		},
		function() {
			$('.custom-cursor').removeClass('hover');
		}
	);
});

// Winter update
if (enableWinterUpdate){
	particlesJS("particles-js", { "particles": { "number": { "value": 160, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1.5, "direction": "bottom", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 100, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "repulse" }, "onclick": { "enable": false, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 223.7762237762238, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
	
	// En cas de thème hiver, appliquer aussi l'image d'hiver à notre overlay
	$("#bg-overlay").css("background-image", "url('assets/img/winter.jpg')");
	
	$(".winter").css("display","flex")
	$("#particles-js").css("opacity",1)
}

// Variables pour la gestion audio
let a, vl, yt, isMute = false, isPaused = false;
// Définir l'index de chanson aléatoirement au démarrage plutôt qu'utiliser defaultAudioIndex
let currentSongIndex = Math.floor(Math.random() * audioList.length);

// Fonction pour afficher/masquer le menu de sélection de sons
function toggleSongMenu(button) {
	if (button) {
		$(button).toggleClass("act");
	}
	
	var modal = document.getElementById("song-menu");
	if(modal.style.display === "block") {
		modal.style.display = "none";
	} else {
		modal.style.display = "block";
		updateSongList();
	}
}

// Fonction pour mettre à jour la liste des chansons
function updateSongList() {
	// Vider la liste actuelle
	$(".song-list").empty();
	
	// Mettre à jour les infos de la chanson en cours
	updateNowPlaying();
	
	// Ajouter chaque chanson à la liste
	audioList.forEach(function(song, index) {
		let isActive = index === currentSongIndex;
		let activeClass = isActive ? "active" : "";
		let icon = isActive ? '<i class="bi bi-play-fill"></i>' : '<i class="bi bi-music-note"></i>';
		
		$(".song-list").append(`
			<div class="song-item ${activeClass}" data-index="${index}" onclick="changeSong(${index})">
				<div class="song-item-left">
					<span class="song-item-name">${song.name}</span>
					<span class="song-item-artist">${song.artist}</span>
				</div>
				<div class="song-item-icon">
					${icon}
				</div>
			</div>
		`);
	});
}

// Fonction pour mettre à jour les infos de la chanson en cours (à la fois dans le menu et dans la barre de lecture)
function updateNowPlaying() {
	let currentSong = audioList[currentSongIndex];
	// Mettre à jour le texte dans le menu
	$(".song-name").text(currentSong.name);
	$(".song-artist").text(currentSong.artist);
	
	// Mettre à jour le texte dans la barre de lecture visible
	$(".current-song-name").text(currentSong.name);
	$(".current-song-artist").text(currentSong.artist);
	
	// Mettre à jour l'apparence du bouton play/pause
	updatePlayPauseButton();
}

// Fonction pour mettre à jour l'apparence du bouton play/pause
function updatePlayPauseButton() {
	if (isPaused) {
		$(".play-pause-btn i").removeClass("bi-pause-fill").addClass("bi-play-fill");
	} else {
		$(".play-pause-btn i").removeClass("bi-play-fill").addClass("bi-pause-fill");
	}
}

// Fonction pour changer de chanson
function changeSong(index) {
	if (index === currentSongIndex) return;
	
	currentSongIndex = index;
	
	// Arrêter la chanson actuelle
	if (a && a[0]) {
		a[0].pause();
	}
	
	// Jouer la nouvelle chanson
	playSong();
	
	// Mettre à jour l'interface
	updateSongList();
}

// Fonction pour jouer une chanson
function playSong() {
    let song = audioList[currentSongIndex];
    
    // Créer un nouvel élément audio avec le chemin fourni dans la configuration
    let newAudio = $(`<audio id="audioPlayer" src="${song.file}" loop preload="auto"></audio>`);
    
    // Ajouter les gestionnaires d'événements avant d'ajouter l'élément au DOM
    newAudio[0].addEventListener('error', function(e) {
        console.error('Erreur de chargement audio:', e);
        console.error('Chemin de la source audio:', this.src);
        // Tenter de recharger en cas d'erreur après un délai
        setTimeout(() => {
            this.load();
        }, 1000);
    });

    newAudio[0].addEventListener('canplaythrough', function() {
        console.log("Audio chargé et prêt à être joué");
    });

    // Supprimer l'ancien élément audio seulement après que le nouveau soit prêt
    if (a) {
        a[0].pause();
        a.remove();
    }
    
    // Ajouter le nouvel élément audio au DOM
    $('body').append(newAudio);
    a = newAudio;
    
    // Appliquer le volume actuel
    let volume = $('.volume-slider').val() || 50;
    a[0].volume = volume / 100;
    
    // Configurer l'état muet initial
    a[0].muted = isMute;
    
    // Essayer de jouer l'audio avec gestion des erreurs et retentatives
    function attemptPlay(retryCount = 0) {
        let playPromise = a[0].play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Lecture audio démarrée avec succès");
                if (!isMute) {
                    a[0].muted = false;
                }
            })
            .catch(error => {
                console.log("Erreur de lecture:", error);
                if (retryCount < 3) {
                    console.log(`Tentative de relecture ${retryCount + 1}/3`);
                    setTimeout(() => {
                        attemptPlay(retryCount + 1);
                    }, 1000);
                }
            });
        }
    }
    
    // Démarrer la lecture
    attemptPlay();
}

// Ajouter un gestionnaire pour démarrer le son lors de la première interaction
$(document).on('click keydown', function startAudioOnInteraction() {
    if (a && a[0]) {
        // Vérifier si l'audio est en pause ou muet
        if (!isPaused && (a[0].muted || a[0].paused) && !isMute) {
            a[0].muted = false;
            
            let playPromise = a[0].play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Erreur lors de la reprise de la lecture:", error);
                    // Réessayer après un court délai
                    setTimeout(() => {
                        if (!isPaused && !isMute) {
                            a[0].play().catch(e => console.log("Nouvelle tentative échouée:", e));
                        }
                    }, 500);
                });
            }
        }
    }
    
    // Retirer le gestionnaire après une interaction réussie
    if (a && a[0] && !a[0].muted && !a[0].paused) {
        $(document).off('click keydown', startAudioOnInteraction);
    }
});

// Ajouter une méthode spécifique à FiveM pour forcer le démarrage audio
// Cette méthode est appelée par le jeu
window.startAudio = function() {
	if (a && a[0]) {
		a[0].muted = false;
		a[0].play();
	}
};

// Fonction pour initialiser le système audio
function initAudio() {
	if (localAudio && audioList && audioList.length > 0) {
		// S'assurer que isPaused est false pour démarrer automatiquement la musique
		isPaused = false;
		
		// Définir le volume initial à 50%
		setVolume(50);
		
		playSong();
		updateNowPlaying();
		
		// Mettre à jour l'interface pour refléter l'état de lecture
		updatePlayPauseButton();
		
		// Dans FiveM, essayer de forcer le démarrage audio après 2 secondes
		setTimeout(function() {
			if (a && a[0] && a[0].muted) {
				console.log("Trying to unmute and play audio after delay");
				a[0].muted = false;
				a[0].play();
			}
		}, 2000);
	}
}

// Initialisation au chargement de la page
$(document).ready(function() {
	// Initialiser l'audio dès que possible
	initAudio();
	
	// Ajouter l'écouteur d'événement pour la touche espace
	$(document).keydown(function(e) {
		// Code 32 = touche espace
		if (e.keyCode === 32) {
			// Empêcher le comportement par défaut (comme le défilement de la page)
			e.preventDefault();
			// Simuler un clic sur le bouton lecture/pause
			togglePause($('.play-pause-btn'));
			
			// Effet visuel pour montrer que la touche a été détectée
			$('.keyboard-shortcut-hint').css('opacity', '1');
			setTimeout(function() {
				$('.keyboard-shortcut-hint').css('opacity', '0.7');
			}, 300);
		}
	});
	
	// Gestion du curseur uniquement sans effet parallaxe sur l'image
	$(document).mousemove(function(e) {
		// Déplacer uniquement le curseur personnalisé
		$(".custom-cursor").css({
			'left': e.pageX + 'px',
			'top': e.pageY + 'px',
			'display': 'block'
		});
		
		// Assurer que le curseur est visible pendant le mouvement de la souris
		showCursor();
	});
	
	// Détecter le survol des éléments interactifs pour le curseur personnalisé
	$("button, a, input, .song-item").hover(
		function() {
			$(".custom-cursor").addClass("hover");
		},
		function() {
			$(".custom-cursor").removeClass("hover");
		}
	);
	
	// Assurer que le curseur est visible sur FiveM
	showCursor();
	
	// Rendre le curseur visible lors de l'interaction avec des éléments interactifs
	$(".volume-slider, button, a, .song-item").hover(
		function() { showCursor(); },
		function() { /* Ne rien faire en sortie de hover pour maintenir le curseur visible */ }
	);
});

// Fonction pour afficher le curseur dans FiveM
function showCursor() {
	// FiveM utilise cette fonction pour afficher le curseur
	if (window.invokeNative) {
		try {
			window.invokeNative('setCursorVisible', true);
		} catch (e) {
			console.log("Erreur lors de l'affichage du curseur:", e);
		}
	}
}

// Mettre à jour la fonction toggleMute
function toggleMute(self) {
	$(self).toggleClass("act");
	isMute = !isMute;
	
	// Mettre à jour l'apparence du bouton volume
	if (isMute) {
		$(".volume-btn i").removeClass("bi-volume-up").addClass("bi-volume-mute");
	} else {
		$(".volume-btn i").removeClass("bi-volume-mute").addClass("bi-volume-up");
	}
	
	if (yt && typeof yt.mute === "function") {
		localAudio ? yt.mute() : (isMute ? yt.mute() : yt.unMute());
	}
	if (a && a[0]) { a[0].muted = isMute; }
	if (vl && vl[0]) { if (localAudio){vl[0].muted = true}; vl[0].muted = localAudio || isMute; }
}

// Mettre à jour la fonction togglePause
function togglePause(self) {
	$(self).toggleClass("act");
	isPaused = !isPaused;
	
	// Mettre à jour l'icône du bouton
	updatePlayPauseButton();
	
	if (yt && typeof yt.pauseVideo === "function" && typeof yt.playVideo === "function") {
		isPaused ? yt.pauseVideo() : yt.playVideo();
	}
	
	if (a && a[0]) { 
		if (isPaused) {
			a[0].pause();
		} else {
			// Essayer de démarrer la lecture et déactiver le mode muet
			let playPromise = a[0].play();
			if (playPromise !== undefined) {
				playPromise.then(_ => {
					// Si on n'est pas en mode muet explicite, désactiver le mode muet
					if (!isMute) {
						a[0].muted = false;
					}
				}).catch(e => {
					console.log("Play prevented:", e);
				});
			}
		}
	}
	
	if (vl && vl[0]) { isPaused ? vl[0].pause() : vl[0].play(); }
}

// Mettre à jour la fonction setVolume
function setVolume(volume) {
	// S'assurer que le slider est également mis à jour avec la valeur
	$(".volume-slider").val(volume);
	
	if (a && a[0]) { a[0].volume = volume / 100; }
	if (vl && vl[0]) { vl[0].volume = volume / 100; }
	if (yt && typeof yt.setVolume === "function" && yt.videoTitle !== "" && !localAudio) {
		yt.setVolume(volume);
	}

	// Mettre à jour le texte dans les deux endroits
	$(".inpt span").text(volume + "%");
	$(".volume-value").text(volume + "%");
	
	$(".volume-slider").css({
		background: `rgba(var(--main), ${(volume / 100) + 0.2})`
	});
}

// Fonction pour passer à la chanson précédente
function previousSong() {
	currentSongIndex--;
	if (currentSongIndex < 0) {
		currentSongIndex = audioList.length - 1; // Revenir à la dernière chanson si on était sur la première
	}
	
	// Arrêter la chanson actuelle
	if (a && a[0]) {
		a[0].pause();
	}
	
	// Jouer la nouvelle chanson
	playSong();
	
	// Mettre à jour l'interface
	updateSongList();
}

// Fonction pour passer à la chanson suivante
function nextSong() {
	currentSongIndex++;
	if (currentSongIndex >= audioList.length) {
		currentSongIndex = 0; // Revenir à la première chanson si on était sur la dernière
	}
	
	// Arrêter la chanson actuelle
	if (a && a[0]) {
		a[0].pause();
	}
	
	// Jouer la nouvelle chanson
	playSong();
	
	// Mettre à jour l'interface
	updateSongList();
}

// Remplacer le code de lecture audio existant par notre nouvelle implémentation
if (youtubeVideo.startsWith("https://www.youtube.com")) {
	if (!enableLocalVideo && !localAudio){
		let videoId = youtubeVideo.split('/').pop().split('=')[1];
		if (!showYoutubeVideo){
			videoOpacity = 0;
		}
		$("iframe").attr("src", `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&enablejsapi=1&disablekb=1`)
				   .css({ 
				   		filter: `blur(${videoBlur}px)`, 
				   		opacity: videoOpacity,
				   		zIndex: "-1" 
				   });
		if (showYoutubeVideo) $("body").css("background", "#000");
	}
}

if (enableLocalVideo) {
	$('body').append('<video id="videoPlayer" autoplay loop><source src="video.webm" type="video/webm"></video>');
	$('#videoPlayer')[0].play();
	vl = $('#videoPlayer');
	if (localAudio){
		vl[0].muted = true;
	}
	$("body").css("background", "#000");
}

function onYouTubeIframeAPIReady() {
	yt = new YT.Player('youtube-video', { 
		events: { 'onReady': onPlayerReady }
	});
}

function onPlayerReady() {
	if (localAudio) { yt.mute(); }
}

// Fonction pour afficher/masquer la fenêtre modale du règlement
function toggleReglement() {
	var modal = document.getElementById("reglement-modal");
	if(modal.style.display === "block") {
		modal.style.display = "none";
	} else {
		modal.style.display = "block";
	}
}

// Fermer la modale si l'utilisateur clique en dehors
window.onclick = function(event) {
	var modal = document.getElementById("reglement-modal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
}