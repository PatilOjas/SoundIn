const playerButton = document.querySelector('.playpause-track'),
	audio = document.querySelector('audio'),
	playIcon = `
		<svg  height="32" width="32" viewBox="0 0 16 16" class="play-btn"><path fill="white" d="M4.018 14L14.41 8 4.018 2z"></path></svg>
      `,
	pauseIcon = `
        <svg height="32" width="32" viewBox="0 0 16 16" class="play-btn"><path fill="white" d="M3 2h3v12H3zm7 0h3v12h-3z"></path></svg>
      `;
function toggleAudio() {
	if (audio.paused) {
		audio.play();
		playerButton.innerHTML = pauseIcon;
	} else {
		audio.pause();
		playerButton.innerHTML = playIcon;
	}
}
playerButton.addEventListener('click', toggleAudio);
function audioEnded() {
	playerButton.innerHTML = playIcon;
}

audio.onended = audioEnded;
const timeline = document.querySelector('.timeline');
function changeTimelinePosition() {
	const percentagePosition = (100 * audio.currentTime) / audio.duration;
	timeline.style.backgroundSize = `${percentagePosition}% 100%`;
	timeline.value = percentagePosition;
}

audio.ontimeupdate = changeTimelinePosition;
function changeSeek() {
	const time = (timeline.value * audio.duration) / 100;
	audio.currentTime = time;
}

timeline.addEventListener('change', changeSeek);

let logs = "{{ results| safe}}".replaceAll('True', 'true');
logs = logs.replaceAll('False', 'false');
logs = logs.replaceAll("'", "\"")
logs = JSON.parse(logs)
let value = 0
// console.log(logs)
let x = "{% static 'music/a.mp3' %}"
function fetcher(val) {
	x = logs[val].preview_url
	value = val
let container = document.getElementById("audio-source");
container.src = x;
console.log(container)
document.getElementById("albm-art").src = logs[val].album.images[0].url
toggleAudio()
}

function next(){
	let l = logs.length
value = (value + 1) % l;
let container = document.getElementById("audio-source");
container.src = logs[value].preview_url;
document.getElementById("albm-art").src = logs[value].album.images[0].url
console.log(container)
toggleAudio();
}

function prev(){
	let l = logs.length
value = (value - 1 + l) % l;
let container = document.getElementById("audio-source");
container.src = logs[value].preview_url;
document.getElementById("albm-art").src = logs[value].album.images[0].url
console.log(container)
toggleAudio();
}
