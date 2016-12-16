import BufferLoader from './BufferLoader.class';
//import * as audioCtx from './audioContext';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();

// creation du filtre
var analyser = context.createAnalyser();
var bandpassEq = context.createBiquadFilter();
var peakingEq = context.createBiquadFilter();
var gainNode = context.createGain();

// déclaration d'une variable bufferLoader (pour load une liste de buffer facilement)
let bufferLoader;

// liste des sample utiliable (trié par main:doigts)
let sample = {
	right	: [],
	left	: []
};
let sampleState = {
	right	: [],
	left	: []
};


window.onload = function () {
	loadSet('aqua');
	editFilterEq(1,0);
}

/**
 * LoadSet: Charge le set d'ambiance 'set'
 * @param  {String} set [nom du set d'ambiance]
 * @return {nothing}
 */
function loadSet(set){
	let samplesPathList = [];
	for (var i = 0; i < 8; i++) {
		samplesPathList[i] = 'assets/audio/'+set+i+'.wav';
	}
	bufferLoader = new BufferLoader(
		context,
		samplesPathList,
		finishedLoading
	);

	bufferLoader.load();
}

/**
 * finishedLoading: fonction de callback de leadSet
 * @param  {[type]} bufferList
 */
function finishedLoading(bufferList) {
	// Créé plusieur sources puis en joue une
	let src;
	for (let i = 0; i < bufferList.length; i++) {
		src = context.createBufferSource();
		src.buffer = bufferList[i];
		src.connect(context.destination);
		if (i<4) sample.left[i] = src;
		else sample.right[i-4] = src;
	}

	playSample('right',1);

}

/**
 * playSample: Joue un son correspondant à un doigt
 * 
 * @param  {string} hand   [la main: 'right' ou 'left']
 * @param  {int} 	finger [numero du doigt (de 1 à 4)]
 * @return {nothing}
 */
function playSample(hand,finger){

	// creation de la source
	let source = context.createBufferSource();

	switch(hand)
	{
		case 'left':
			source.buffer = sample.left[finger].buffer;
			break;
		case 'right':
			source.buffer = sample.right[finger].buffer;
			break;
	}

	// connection des éléments entre eux
	source.connect(bandpassEq);
	bandpassEq.connect(peakingEq);
	peakingEq.connect(gainNode);
	gainNode.connect(context.destination);

	source.start(0);
}

/**
 * setSampleState: change l'Etat d'un sample
 * @param  {string} hand   [la main: 'right' ou 'left']
 * @param  {int} 	finger [numero du doigt (de 1 à 4)]
 * @param  {bool} 	state  [etat]
 */
function setSampleState(hand,finger,state){

	switch(hand)
	{
		case 'left':
			sampleState.left[finger]=state;
			break;
		case 'right':
			sampleState.right[finger]=state;
			break;
	}
}

/**
 * getSampleState: récupère l'état d'un sample (pour savoir si on peut le jouer ou non)
 * @param  {string} hand   [la main: 'right' ou 'left']
 * @param  {int} 	finger [numero du doigt (de 1 à 4)]
 * @return {state}  l'état sample
 */
function getSampleState(hand,finger){
	switch(hand)
	{
		case 'left':
			return sampleState.left[finger];
			break;
		case 'right':
			return sampleState.right[finger];
			break;
	}
}

/**
 * playSampleByFinger: Joue un son en fonction du doigt
 * @param  {hand} 	handObj   [instance de hand (du leapMotion)]
 * @param  {finger} fingerObj [instance de finger (du leapMotion)]
 * @return {nothing}
 */
function playSampleByFinger(handObj,fingerObj){
	let hand = handObj.type;
	let finger = fingerObj.type - 1;
	if(finger<0){
	}else{
		if(!getSampleState(hand,finger)) playSample(hand,finger);
	}
}

/**
 * setSampleStateByFinger
 * @param  {hand} 	handObj   [instance de hand (du leapMotion)]
 * @param  {finger} fingerObj [instance de finger (du leapMotion)]
 * @param  {state} 	state      [état]
 */
function setSampleStateByFinger(handObj,fingerObj,state){
	let hand = handObj.type;
	let finger = fingerObj.type - 1;
	if(finger<0){
	}else{
		setSampleState(hand,finger,state);
	}
}

/**
 * editFilterEq: Modifie le filtre de fréquence
 * @param  {float} frequency [de 0 à 10]
 * @param  {float} Q         [de 0 à 6]
 * @return {nothing}
 */
function editFilterEq(frequency=0.2,Q=0){

	frequency=frequency*10;
	frequency=Math.exp(frequency);

	let gain = 1/frequency;
	gain = gain/(1/0.01)*1500+.9;

	// frequency et Q à modifier en fonction d'une position
	// gain(pour le peaking) à modifier en fct de frequency
	bandpassEq.type = "bandpass";
	bandpassEq.frequency.value = frequency; 	// Modification fct d'une position
	bandpassEq.Q.value = Q;			// Modification fct d'une position
	peakingEq.type = "peaking";
	peakingEq.frequency.value = frequency;
	peakingEq.Q.value = Q;
	peakingEq.gain.value = 6;

	gainNode.gain.value = gain;
}

/**
 * editFilterEqByPosition: Modifie le filtre de fréquence en fonction de la position de la main
 * @param  {table} coord  [les coordonnés {x,y} de la main]
 * @return {nothing}
 */
function editFilterEqByPosition(coord){
	let y = coord.y;
	let yMax = window.innerHeight;

	let freq = y/yMax;
	if(freq<=0) freq=0.01;

	editFilterEq(freq,0.4);
}

export default {
	playSampleByFinger : playSampleByFinger,
	getSampleState : getSampleState,
	setSampleStateByFinger : setSampleStateByFinger,
	editFilterEqByPosition : editFilterEqByPosition,
	playSample : playSample,
	loadSet : loadSet,
};