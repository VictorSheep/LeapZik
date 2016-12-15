import soundManager from './soundManager.js';
import menu from './presetMenu';

export default function onGesTure(frame){

   frame.gestures.forEach((gesture)=>{
	    switch (gesture.type){
	        case 'nearPalm':
	        	menu.actived();
	        	break;

	    }
    });
	
}    