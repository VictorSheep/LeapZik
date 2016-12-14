import soundManager from './soundManager';

export default function onGesTure(frame){

   frame.gestures.forEach((gesture)=>{
	    switch (gesture.type){
	        case "keyTap":
			    let handIds = gesture.handIds;
			    let fingersId = gesture.pointableIds;
			    let hand;
			    handIds.forEach((handId)=>{
			    	hand = frame.hand(handId);
			    });	    		
			    soundManager.playSampleByKeyTap(hand,hand.finger(fingersId));
	            break;
	        case "swipe":
	        	break;
	        case 'nearPalm':
	        	break;

	    }
    });
	
}    