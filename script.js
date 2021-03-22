//---------------full screen event
const btnFullScr = document.querySelector('.fullscreen');
const onFullScrBtnClick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
btnFullScr.addEventListener('click', onFullScrBtnClick);

//----------------switch notes letters
const lettersBtn = document.querySelector('.btn-letters');
const notesBtn = document.querySelector('.btn-notes');
const keys = document.querySelectorAll('.piano-key[data-letter]');

// ---------------------letter button
const onLettersBtnClick = () => {
  notesBtn.classList.remove('btn-active');
  lettersBtn.classList.add('btn-active');
  keys.forEach(key => key.classList.add('piano-key-letter'));
}
lettersBtn.addEventListener('click', onLettersBtnClick);

//---------------------- notes button
const onNotesBtnClick = () => {
  lettersBtn.classList.remove('btn-active');
  notesBtn.classList.add('btn-active');
  keys.forEach(key => key.classList.remove('piano-key-letter'));
};
notesBtn.addEventListener('click', onNotesBtnClick);

//--------------------- play sound
const playSound = (sfile) => {const s = new Audio(sfile); s.currentTime = 0; s.play();};

// ------------- additional functions
const getKeyChar = (e) => e.code.replace('Key', '');
const getKeyElem = (e) => document.querySelector(`.piano-key[data-letter='${getKeyChar(e)}'`);
const getSndFile = (el) => `./assets/audio/${el.dataset.note}.mp3`;
const isPianoKey = (el) => el.classList.contains('piano-key');
const addKeyClass = (el) => el.classList.add('piano-key-active', 'piano-key-active-pseudo');
const delKeyClass = (el) => el.classList.remove('piano-key-active', 'piano-key-active-pseudo');

//---------piano keys functions
const pianoKeyDown = (key) => {addKeyClass(key); playSound(getSndFile(key));}
const pianoKeyUp = delKeyClass;

// -------keyboard key down
const onKeyDown = (e) => { const key = getKeyElem(e);  if (!key || e.repeat) return; pianoKeyDown(key);};

// -----------keyboard key up
const onKeyUp = (e) => {const key = getKeyElem(e); if (!key) return; pianoKeyUp(key);};

// ------------mouse events
const onMouseDown = (e) => { if (e.which == 1) {const el = e.target; if (isPianoKey(el)) pianoKeyDown(el)} }
const onMouseOver = onMouseDown;
const onMouseUp = (e) => delKeyClass(e.target);
const onMouseOut = onMouseUp;


// add kbd and mouse listeners
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

const p = document.querySelector('.piano');

p.addEventListener('mousedown', onMouseDown);
p.addEventListener('mouseup', onMouseUp);

p.addEventListener('mousedown', () => {p.addEventListener('mouseover', onMouseOver); p.addEventListener('mouseout', onMouseOut);});
document.addEventListener('mouseup', () => {p.removeEventListener('mouseover', onMouseOver); p.removeEventListener('mouseout', onMouseOut);});

