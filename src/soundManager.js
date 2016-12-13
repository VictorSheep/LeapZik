var kick = WaveSurfer.create({
    container: '#waveform',
	waveColor: 'red',
	progressColor: 'purple'
});

var snare = WaveSurfer.create({
    container: '#waveform',
	waveColor: 'red',
	progressColor: 'purple'
});

snare.load('assets/audio/snare01.wav');


export function playKick(){
	
kick.load('assets/audio/kick01.wav');

kick.on('ready', function(){
		if (kick.isPlaying()) kick.stop();
		kick.play();
});
}

/*snare.on('ready', function(){
let snare01 = document.getElementById('snare01');
	snare01.addEventListener('click',function(){
		if (snare.isPlaying()) snare.stop();
		snare.play();
	});
});*/
/*
wavesurfer.loadBlob('assets/audio');
var filter = wavesurfer.backend.ac.createBiquadFilter();
	filter.gain.value= 0;
	filter.Q.value = 2;
	//filter.frequency.value = 300;

wavesurfer.backend.setFilter(filter);

wavesurfer.on('ready', function(){
	let kick01 = document.getElementById('kick01');
	kick01.addEventListener('click',function(){
		wavesurfer.load('assets/audio/kick01.wav');
		wavesurfer.play();
		//filter.frequency.value -=400;
	});

	let snare01 = document.getElementById('snare01');
	snare01.addEventListener('click',function(){
		wavesurfer.load('assets/audio/snare01.wav');
		wavesurfer.play();
		//filter.frequency.value +=400;
	});
});
*/