// DRUMS
// genre buttons 
const genreZeroBtn = document.getElementById('genre-0');
const genreOneBtn = document.getElementById('genre-1');
const genreTwoBtn = document.getElementById('genre-2');
const genreThreeBtn = document.getElementById('genre-3');

// sound buttons
const soundBtns = document.getElementsByName('sound-btn');
const soundOne = document.getElementById('sound-1');
const soundTwo = document.getElementById('sound-2');
const soundThree = document.getElementById('sound-3');

// default setting
for(btn of soundBtns){
    btn.setAttribute('class', 'default');
}
let kick = new Audio('./sounds/df/kick.wav');
let snare = new Audio('./sounds/df/snare.wav');
let perc = new Audio('./sounds/df/perc.wav');

const setGenre = (ev) => {
    genreId = ev.path[0].id;
    if(genreId === 'genre-0'){
        for(btn of soundBtns){
            btn.setAttribute('class', 'default');
            kick = new Audio('./sounds/df/kick.wav');
            snare = new Audio('./sounds/df/snare.wav');
            perc = new Audio('./sounds/df/perc.wav');
        }
    }else if(genreId === 'genre-1'){
        for(btn of soundBtns){
            btn.setAttribute('class', 'as');
            kick = new Audio('./sounds/as/kick.wav');
            snare = new Audio('./sounds/as/snare.wav');
            perc = new Audio('./sounds/as/perc.wav');
        }
    }
    else if(genreId === 'genre-2'){
        for(btn of soundBtns){
            btn.setAttribute('class', 'bk');
            kick = new Audio('./sounds/bk/kick.wav');
            snare = new Audio('./sounds/bk/snare.wav');
            perc = new Audio('./sounds/bk/perc.wav');
        }     
    }else{
        for(btn of soundBtns){
            btn.setAttribute('class', 'hp');
            kick = new Audio('./sounds/hp/kick.wav');
            snare = new Audio('./sounds/hp/snare.wav');
            perc = new Audio('./sounds/hp/perc.wav');
        }
    }
}

const playSound = (ev) => {
    soundId = ev.path[0].id;
    if(soundId === 'sound-1'){
        kick.play();
        kick.currentTime = 0;
    }else if(soundId === 'sound-2'){
        snare.play();
        snare.currentTime = 0;
    }else{
        perc.play();
        perc.currentTime = 0;
    }
}

genreZeroBtn.addEventListener('click', setGenre);
genreOneBtn.addEventListener('click', setGenre);
genreTwoBtn.addEventListener('click', setGenre);
genreThreeBtn.addEventListener('click', setGenre);

soundOne.addEventListener('click', playSound);
soundTwo.addEventListener('click', playSound);
soundThree.addEventListener('click', playSound);

// KEYBOARD
let synth = new Tone.PolySynth().toDestination();
let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let html = '';

for(let octave = 0; octave < 2; octave++){
    for(let i = 0; i < notes.length; i++){
        let hasSharp = true;
        let note = notes[i];

        if(note == 'E' || note == 'B'){
            hasSharp = false;
        }
        html += `<div 
                class='whitenote'
                onmousedown='noteDown(this, false)'
                onmouseup='noteUp(this, false)'
                onmouseleave='noteUp(this, false)'
                data-note='${note + (octave + 4)}'
                >`;

        if(hasSharp){
            html += `<div 
                    class='blacknote'
                    onmousedown='noteDown(this, true)'
                    onmouseup='noteUp(this, true)'
                    onmouseleave='noteUp(this, true)'
                    data-note='${note + '#' + (octave + 4)}'
                    ></div>`;
        }

        html += `</div>`
    }
}

document.getElementById('container').innerHTML = html;

function noteUp(elem, isSharp){
    elem.style.background = isSharp? '#777' : 'white';
}

function noteDown(elem, isSharp){
    let note = elem.dataset.note;
    elem.style.background = isSharp? 'black' : '#ccc';
    synth.triggerAttackRelease(note, '16n');
    event.stopPropagation();
}