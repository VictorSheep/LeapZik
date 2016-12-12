//import * as wavesurfermin from './wavesurfer.min';

console.log('Coucou');

var wavesurfer = WaveSurfer.create({
    container: '#waveform'
});
wavesurfer.load('../assets/audio/clap01.wav');

wavesurfer.on('ready', function(){
	//console.log('wavesurfer = '+ wavesurfer);
});