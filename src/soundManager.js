import BufferLoader from './BufferLoader.class';
//import * as audioCtx from './audioContext';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();

// creation du filtre
var analyser = context.createAnalyser();
var bandpassEq = context.createBiquadFilter();
var peakingEq = context.createBiquadFilter();
var gainNode = context.createGain();


let bufferLoader;
let sample = {
	right	: [],
	left	: []
};
let sampleState = {
	right	: [],
	left	: []
};

window.onload = function () {
	init();
	loadSet('aqua');
	editFilterEq(1,0);
}

function init(){
}

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

function setSampleState(hand,finger,state){

	switch(hand)
	{
		case 'left':
			sampleState.left[finger]=state;
			console.log(sampleState.left[finger]);
			break;
		case 'right':
			sampleState.right[finger]=state;
			console.log(sampleState.right[finger]);
			break;
	}
}

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

function playSampleByFinger(handObj,fingerObj){
	let hand = handObj.type;
	let finger = fingerObj.type - 1;
	if(finger<0){
		console.log('Error: finger.type is too little');
	}else{
		if(!getSampleState(hand,finger)) playSample(hand,finger);
	}
}

function setSampleStateByFinger(handObj,fingerObj,state){
	let hand = handObj.type;
	let finger = fingerObj.type - 1;
	if(finger<0){
		console.log('Error: finger.type is too little');
	}else{
		setSampleState(hand,finger,state);
	}
}

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

function editFilterEqByPosition(coord){
	let y = coord.y;
	let yMax = window.innerHeight;

	let freq = y/yMax;
	if(freq<=0) freq=0.01;

	editFilterEq(freq,0.4);
}

export default {
	playSampleByFinger : playSampleByFinger,
	setSampleStateByFinger : setSampleStateByFinger,
	editFilterEqByPosition : editFilterEqByPosition,
	playSample : playSample,
	loadSet : loadSet,
};