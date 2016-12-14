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
	for (let i = bufferList.length - 1; i >= 0; i--) {
		source = context.createBufferSource();
		source.buffer = bufferList[i];
		source.connect(context.destination);
		if (i<3) sample.left[i] = source;
		else sample.right[i-4] = source;
	}

	playSample('left',0);
}

function playSample(hand,finger){
	switch(hand)
	{
		case 'left':
			sample.left[finger].start(0);
			break;
		case 'right':
			sample.right[finger].start(0);
			break;
	}
}

function playSampleByKeyTap(hand,finger){
	let handType = hand.type;
	let fingerType = finger.type;
}