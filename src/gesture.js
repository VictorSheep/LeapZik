import soundManager from './soundManager.js';
import menu from './presetMenu';
import guide from './guide';

export default function onGesTure(frame){

   frame.gestures.forEach((gesture)=>{
	    switch (gesture.type){
	        case 'nearPalm':
	        	menu.actived();
	        	if(guide.etat == 4){
	        		guide.etat++
	        		setTimeout(function() {guide.etat++}, 5000);
	        	};
	        	break;

	    }
    });
	
}    