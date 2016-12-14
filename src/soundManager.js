import BufferLoader from './BufferLoader.class';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();

let bufferLoader;
let sample = {
	right	: [],
	left	: []
};

window.onload = loadSet('aqua');

function loadSet(set){
	let samplesPathList = [];
	for (var i = 0; i < 8; i++) {
		samplesPathList[i] = 'assets/audio/'+set+''+i+'.wav';
	}
	bufferLoader = new BufferLoader(
		context,
		samplesPathList,
		finishedLoading
	);

	bufferLoader.load();
}

function finishedLoading(bufferList) {
	// Create multiple sources and play them both together.
	let source;
	for (let i = 0; i < bufferList.length; i++) {
		source = context.createBufferSource();
		source.buffer = bufferList[i];
		source.connect(context.destination);
		if (i<4) sample.left[i] = source;
		else sample.right[i-4] = source;
	}

	playSample('left',0);
}

function playSample(hand,finger){
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
	source.connect(context.destination);
	source.start(0);
}

function playSampleByKeyTap(handObj,fingerObj){
	let hand = handObj.type;
	let finger = fingerObj.type - 1;
	if(finger<0) console.log('Error: finger.type is too little');
	else playSample(hand,finger);
}

export default {
	playSampleByKeyTap : playSampleByKeyTap,
	playSample : playSample,
	loadSet : loadSet,
};