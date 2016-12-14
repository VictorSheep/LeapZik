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
			    console.log("keyTap",hand.type,hand.finger(fingersId).type);
	            break;
	        case "swipe":
	    		console.log('swipe');
	        	break;
	        case 'nearPalm':
	        	console.log('Near')
	        	break;

	    }
    });
	
}    