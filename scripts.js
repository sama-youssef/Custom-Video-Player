const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

var sliding = false;
var dragging = false;

/////////////////////////////////////////////////////////////////

function updateButton(){
    if (video.paused){toggle.textContent = '►'; }
    else{toggle.textContent = '❚ ❚';}
}

function togglePlay(){
    if(video.paused){ video.play();}
    else{video.pause();}
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    if(sliding){
        video[this.name] = this.value;
    }
}

function handleProgress(){
    var percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

/////////////////////////////////////////////////////////////////

toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => {
    range.addEventListener('mousedown', () => sliding = true);
    range.addEventListener ('mousemove', handleRangeUpdate);
    range.addEventListener('mouseup', () => sliding = false);
    range.addEventListener('mouseout', () => sliding = false);
});

video.addEventListener('timeupdate', handleProgress); //'progress' event works too

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => dragging = true);
progress.addEventListener('mousemove', (e) => dragging && scrub(e));
progress.addEventListener('mouseup', () => dragging = false);
progress.addEventListener('mouseout', () => dragging = false);







